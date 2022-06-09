const SerialPort = require('serialport');
const HistoryTicMode = require('./history/HistoryTicMode');
const StandardTicMode = require('./standard/StandardTicMode');
const { ticMode: ticModeFromConfig } = require('../config');

/**
 * Connect to the serial port.
 * @return {Promise<unknown>}
 */
async function connect({ ticMode, SerialPortClass = SerialPort }) {
    const ticModeResolved = ticMode || ticModeFromConfig;
    let ticModeService;
    if (HistoryTicMode.doesMatchMode(ticModeResolved)) {
        ticModeService = new HistoryTicMode();
    } else if (StandardTicMode.doesMatchMode(ticModeResolved)) {
        ticModeService = new StandardTicMode();
    } else {
        throw new Error(`Unsupported TIC_MODE [${ticModeResolved}]`);
    }
    return ticModeService.connect(SerialPortClass);
}

module.exports = {
    connect,
};
