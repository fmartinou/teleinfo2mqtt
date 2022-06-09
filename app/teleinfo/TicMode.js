const SerialPort = require('serialport');
const ReadlineParser = require('@serialport/parser-readline');
const { EventEmitter } = require('events');
const deepEqual = require('deep-equal');
const { emitInterval, serial } = require('../config');
const log = require('../log');

const CENTURY = '20';
const TIMESTAMP_REGEX = /(?<dst>H|E)(?<year>\d{2})(?<month>\d{2})(?<day>\d{2})(?<hour>\d{2})(?<min>\d{2})(?<second>\d{2})/;

/**
 * Abstract TicMode service class.
 */
class TicMode {
    /**
     * Build a new TicMode service.
     */
    constructor() {
        this.serialPort = undefined;
        this.previousFrame = {};
        this.currentFrame = {};
        this.eventEmitter = new EventEmitter();
        this.lastEmitTime = Date.now();

        // Graceful exit
        process.on('SIGTERM', () => this.disconnect());
        process.on('SIGINT', () => this.disconnect());
    }

    /**
     * Which mode is it? history or standard?
     */
    /* eslint-disable no-unused-vars */
    static doesMatchMode(ticMode) {
        throw new Error('doesMatchMode must be overridden');
    }

    /**
     * Connect to the serial port.
     * @param SerialPortClass
     * @return {Promise<unknown>}
     */
    connect(SerialPortClass = SerialPort) {
        log.info(`Connecting to port [${serial}] with ${this.getMode()} TIC mode`);
        return new Promise((resolve, reject) => {
            this.serialPort = new SerialPortClass(serial, {
                baudRate: this.getBaudRate(),
                dataBits: 7,
                parity: 'even',
                stopBits: 1,
            }, (error) => this.onConnection(error, resolve, reject));
        });
    }

    /**
     * On serial port connection event.
     * @param connectionError
     * @param resolve
     * @param reject
     */
    onConnection(connectionError, resolve, reject) {
        if (connectionError) {
            log.error(`Error when connecting to serial port [${connectionError.message}]`);
            reject(connectionError);
        } else {
            log.info(`Connected to port [${serial}]`);
            const parser = this.serialPort.pipe(new ReadlineParser());

            // Process data and errors
            parser.on('data', (data) => this.processData(data));
            parser.on('error', (error) => this.processError(error));
            resolve(this);
        }
    }

    /**
     * Process serial data.
     * @param data
     */
    processData(data) {
        const dataStr = data.toString('utf-8');

        // Split line `${label} ${timestamp?} ${value} ${checksum}
        const lineItems = dataStr.split(/\s+/);

        if (lineItems.length < 3) {
            log.warn(`Corrupted line received [${dataStr}]`);
            return;
        }

        const label = lineItems[0];
        const value = this.getValue({ label, lineItems });

        // Is the value valid?
        if (!this.checkValue({ label, value })) {
            log.warn(`Corrupted data received [${dataStr}]`);
            return;
        }

        // Does the line contain a timestamp?
        const timestampStr = this.getTimestamp({ label, lineItems });

        // Compute a clean frame item
        let frameItem;
        try {
            frameItem = this.parseFrameItem({ value, timestampStr });
        } catch (e) {
            log.warn(`Error on parsing the line [${dataStr}] error [${e.message}]`);
            return;
        }

        // Frame end? -> Dispatch frame event
        if (this.isFrameEnd(label)) {
            if (!this.isSameFrame()) {
                // Don't emit a second frame in emit interval
                const currentTime = Date.now();
                if (currentTime - this.lastEmitTime > emitInterval * 1000) {
                    log.debug(`Dispatch frame ${JSON.stringify(this.currentFrame)}`);
                    this.eventEmitter.emit('frame', this.currentFrame);
                    this.lastEmitTime = currentTime;
                } else {
                    log.debug(`Ignoring MQTT emission because of emit interval (Emit interval : ${emitInterval} - Last emit time : ${this.lastEmitTime} - Current time : ${currentTime}`);
                }
            } else {
                log.debug(`Ignoring identical frame ${JSON.stringify(this.currentFrame)}`);
            }
            return;
        }

        // Frame start? -> Reset frame object
        if (this.isFrameStart(label)) {
            this.previousFrame = this.currentFrame;
            this.currentFrame = {};
        }

        // Add the new item to the current frame
        this.currentFrame[label] = frameItem;
    }

    /**
     * Process serial errors.
     * @param error
     */
    /* eslint-disable class-methods-use-this */
    processError(error) {
        log.error('Error on reading data');
        log.error(error);
    }

    /**
     * Disconnect from serial port.
     */
    disconnect() {
        if (this.serialPort) {
            log.info(`Disconnecting teleinfo from port [${serial}]`);
            this.serialPort.close((e) => {
                if (e) {
                    log.error(`Error on disconnecting teleinfo from port [${serial}]`);
                } else {
                    log.info(`Disconnected teleinfo from port [${serial}]`);
                }
            });
        }
    }

    /**
     * Check data integrity.
     */
    /* eslint-disable class-methods-use-this */
    /* eslint-disable no-unused-vars */
    parseFrameItem({ value, timestampStr }) {
        let timestamp;
        if (timestampStr) {
            const timestampMatched = timestampStr.match(TIMESTAMP_REGEX);
            if (!timestampMatched) {
                throw new Error(`Invalid timestamp (${timestampStr}`);
            }
            timestamp = {
                dst: timestampMatched.groups.dst === 'H' ? 'winter' : 'summer',
                date: new Date(Date.UTC(
                    `${CENTURY}${timestampMatched.groups.year}`,
                    Number.parseInt(timestampMatched.groups.month - 1, 10),
                    timestampMatched.groups.day,
                    timestampMatched.groups.hour,
                    timestampMatched.groups.min,
                    timestampMatched.groups.second,
                )).toISOString(),
            };
        }

        // Sanitize value & try to convert to number
        const valueSanitized = value.replace(/\.\./g, '');
        const valueNumber = Number.parseInt(valueSanitized, 10);
        const valueCoerced = !Number.isNaN(valueNumber) ? valueNumber : valueSanitized;

        return {
            raw: value,
            value: valueCoerced,
            timestamp,
        };
    }

    /**
     * Register on-frame handler.
     * @param handler
     */
    onFrame(handler) {
        this.eventEmitter.on('frame', (frame) => handler(frame));
    }

    /**
     * Get value associated to the label.
     * @param label
     * @param lineItems
     * @return {*}
     */
    getValue({ label, lineItems }) {
        return lineItems[1];
    }

    /**
     * Get timestamp associated to the label.
     * @param label
     * @param lineItems
     * @return {undefined}
     */
    getTimestamp({ label, lineItems }) {
        return undefined;
    }

    /**
     * Are previous & current frames equal?
     * @return {*|boolean}
     */
    isSameFrame() {
        return deepEqual(this.currentFrame, this.previousFrame);
    }

    /**
     * Get TIC mode.
     */
    /* eslint-disable class-methods-use-this */
    getMode() {
        throw new Error('getMode must be overridden');
    }

    /**
     * Get baud rate.
     */
    /* eslint-disable class-methods-use-this */
    getBaudRate() {
        throw new Error('getBaudRate must be overridden');
    }

    /**
     * Check data value
     */
    /* eslint-disable class-methods-use-this */
    /* eslint-disable no-unused-vars */
    checkValue({ label, value }) {
        throw new Error('checkValue must be overridden');
    }

    /**
     * Is it the end of the frame?
     * @param label
     */
    /* eslint-disable class-methods-use-this */
    /* eslint-disable no-unused-vars */
    isFrameStart(label) {
        throw new Error('isFrameStart must be overridden');
    }

    /**
     * Is it the end of the frame?
     */
    /* eslint-disable class-methods-use-this */
    /* eslint-disable no-unused-vars */
    isFrameEnd(label) {
        throw new Error('isFrameEnd must be overridden');
    }

    /**
     * Get the id label of the frame (ADCO, ADSC...).
     */
    getIdLabel() {
        throw new Error('getIdLabel must be overridden');
    }

    /**
     * Get the HA device Class.
     * @param label
     */
    getHADeviceClass(label) {
        throw new Error('getHADeviceClass must be overridden');
    }

    /**
     * Get the HA state Class.
     * @param label
     */
    getHAStateClass(label) {
        throw new Error('getHAStateClass must be overridden');
    }

    /**
     * Get the HA unit.
     * @param label
     */
    getHAUnit(label) {
        throw new Error('getHAUnit must be overridden');
    }
}

module.exports = TicMode;
