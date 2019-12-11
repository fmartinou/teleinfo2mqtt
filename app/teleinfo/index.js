const Readline = require('@serialport/parser-readline');
const SerialPort = require('serialport');
const events = require('events');
const log = require('../log');
const { serial } = require('../config');

let serialPort;
let currentFrame = {};

/**
 * Process data.
 * @param {*} data
 * @param {*} teleInfoEventEmitter
 */
function processData(data, teleInfoEventEmitter) {
    const dataStr = data.toString('utf-8');

    // Split line `${label} ${value} ${checksum}`
    const lineItems = dataStr.split(' ');

    if (lineItems.length < 2) {
        log.error(`Corrupted data received [${dataStr}]`);
        return;
    }

    const label = lineItems[0];

    // Frame end? -> Dispatch frame event
    if (label === 'MOTDETAT' && currentFrame.ADCO) {
        log.debug(`Dispatch frame ${JSON.stringify(currentFrame)}`);
        teleInfoEventEmitter.emit('frame', currentFrame);
        return;
    }

    // Frame start? -> Reset frame object
    if (label === 'ADCO') {
        currentFrame = {};
    }

    // Sanitize value & try to convert to number
    const valueSanitized = lineItems[1].replace(/\.\./g, '');
    const valueNumber = Number.parseInt(valueSanitized, 10);
    const value = !Number.isNaN(valueNumber) ? valueNumber : valueSanitized;

    currentFrame[label] = {
        raw: lineItems[1],
        value,
    };
}

/**
 * Process errors.
 * @param {*} error
 */
function processError(error) {
    log.error('Error on reading data');
    log.error(error);
}

/**
 * Connect so serial port & start reading.
 */
async function connect() {
    return new Promise((resolve, reject) => {
        log.info(`Connecting to port [${serial}]`);
        serialPort = new SerialPort(serial, {
            baudRate: 1200,
            dataBits: 7,
            parity: 'even',
            stopBits: 1,
        }, (error) => {
            if (error) {
                log.error(`Error when connecting to serial port [${error.message}]`);
                reject(error);
            } else {
                const parser = serialPort.pipe(new Readline());

                const teleInfoEventEmitter = new events.EventEmitter();

                log.info(`Connected to port [${serial}]`);

                // Process data
                parser.on('data', (data) => processData(data, teleInfoEventEmitter));

                // Process error
                parser.on('error', processError);

                resolve(teleInfoEventEmitter);
            }
        });
    });
}

/**
 * Disconnect from serial port.
 */
async function disconnect() {
    log.info(`Disconnecting teleinfo from port [${serial}]`);
    return new Promise((resolve, reject) => {
        serialPort.close((e) => {
            if (e) {
                log.error(`Error on disconnecting teleinfo from port [${serial}]`);
                reject(e);
            } else {
                log.info(`Disconnected teleinfo from port [${serial}]`);
                resolve();
            }
        });
    });
}

module.exports = {
    connect,
    disconnect,
};
