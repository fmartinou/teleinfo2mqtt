const Readline = require('@serialport/parser-readline');
const SerialPort = require('serialport');
const events = require('events');
const deepEqual = require('deep-equal');
const log = require('../log');
const { emitInterval, serial, ticMode } = require('../config');

let serialPort;
let previousFrame = {};
let currentFrame = {};
let lastEmitTime = Date.now();

function isSameFrame(frame1, frame2) {
    return deepEqual(frame1, frame2);
}

/**
 * Process data.
 * @param {*} data
 * @param {*} teleInfoEventEmitter
 */
function processData(data, teleInfoEventEmitter) {
    const dataStr = data.toString('utf-8');

    // Split line `${label} ${value} ${checksum}`
    const lineItems = dataStr.split(/\s+/);

    if (lineItems.length < 2) {
        log.error(`Corrupted data received [${dataStr}]`);
        return;
    }

    const label = lineItems[0];

    // Frame end? -> Dispatch frame event
    if ((ticMode === 'HISTORY' && label === 'MOTDETAT' && currentFrame.ADCO) || (ticMode === 'STANDARD' && label === 'PJOURF+1' && currentFrame.ADSC))
    {
        if (!isSameFrame(currentFrame, previousFrame)) 
        {
            // Don't emit a second frame in emit interval
            const currentTime = Date.now();
            if (currentTime - lastEmitTime > emitInterval * 1000) 
            {
                log.debug(`Dispatch frame ${JSON.stringify(currentFrame)}`);
                teleInfoEventEmitter.emit('frame', currentFrame);
                lastEmitTime = currentTime;
            } else 
            {
                log.debug(`Ignoring MQTT emission because of emit interval (Emit interval : ${emitInterval} - Last emit time : ${lastEmitTime} - Current time : ${currentTime}`);
            }
        } 
        else 
        {
            log.debug(`Ignoring identical frame ${JSON.stringify(currentFrame)}`);
        }
        return;
    }

    // Frame start? -> Reset frame object
    if ((ticMode === 'HISTORY' && label === 'ADCO') || (ticMode === 'STANDARD' && label === 'ADSC')) 
    {
        previousFrame = currentFrame;
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
        const baudRateVar = ticMode === 'STANDARD' ? 9600 : 1200;
        serialPort = new SerialPort(serial, {
            baudRate: baudRateVar,
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
