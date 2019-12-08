const Readline = require('@serialport/parser-readline');
const SerialPort = require('serialport');
const events = require('events');
const log = require('../log');
const { serial } = require('../config');

let serialPort;

async function connect() {
    log.info(`Connecting teleinfo to port [${serial}]`);
    const teleInfoEventEmitter = new events.EventEmitter();
    let currentFrame = {};

    serialPort = new SerialPort(serial, {
        baudRate: 1200,
        dataBits: 7,
        parity: 'even',
        stopBits: 1,
    });

    const parser = serialPort.pipe(new Readline());

    parser.on('data', (data) => {
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

        // Frame start? -> Reset frame accumulator object
        if (label === 'ADCO') {
            currentFrame = {};
        }

        // Try to convert value to number
        const valueNumber = Number.parseInt(lineItems[1], 10);
        const value = !Number.isNaN(valueNumber) ? valueNumber : lineItems[1];

        currentFrame[label] = value;
    });

    parser.on('error', (e) => {
        log.error('Error on reading data');
        log.error(e);
    });

    return teleInfoEventEmitter;
}

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
