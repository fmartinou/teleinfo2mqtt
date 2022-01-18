const TicMode = require('../TicMode');

class HistoryTicMode extends TicMode {
    // eslint-disable-next-line
    static TIC_MODE = 'history';

    /**
     * Does ticMode match history?
     */
    /* eslint-disable class-methods-use-this */
    static doesMatchMode(ticMode) {
        return ticMode && ticMode.toLowerCase() === HistoryTicMode.TIC_MODE.toLowerCase();
    }

    /**
     * Get ticMode.
     */
    /* eslint-disable class-methods-use-this */
    getMode() {
        return HistoryTicMode.TIC_MODE;
    }

    /**
     * Get baud rate.
     */
    /* eslint-disable class-methods-use-this */
    getBaudRate() {
        return 1200;
    }

    /**
     * Is the beginning of the frame?
     */
    /* eslint-disable class-methods-use-this */
    isFrameStart(label) {
        return label === 'ADCO';
    }

    /**
     * Is the end of the frame?
     * @param label
     * @return {boolean|{raw: string, value: number}|{raw: string, value: number}|*}
     */
    isFrameEnd(label) {
        return label === 'MOTDETAT' && this.currentFrame.ADCO;
    }

    /**
     * Check the value.
     * @param label
     * @param value
     * @return {boolean}
     */
    checkValue({ label, value }) {
        switch (label) {
        case 'HHPHC':
            return value.length === 1;
        case 'ISOUSC':
        case 'PEJP':
            return value.length === 2;
        case 'IINST':
        case 'ADPS':
        case 'IMAX':
            return value.length === 3;
        case 'PTEC':
            return value.length === 4;
        case 'OPTARIF':
        case 'DEMAIN':
            return value.length <= 4;
        case 'PAPP':
            return value.length === 5;
        case 'MOTDETAT':
            return value.length === 6;
        case 'BASE':
        case 'HCHC':
        case 'HCHP':
        case 'EJPHN':
        case 'EJPHPM':
        case 'BBRHCJB':
        case 'BBRHPJB':
        case 'BBRHCJW':
        case 'BBRHPJW':
        case 'BBRHCJR':
        case 'BBRHPJR':
            return value.length === 9;
        case 'ADCO':
            return value.length === 12;
        default: return false;
        }
    }

    /**
     * Get the id of the frame (ADCO).
     */
    getIdLabel() {
        return 'ADCO';
    }

    /**
     * Get the HA deviceClass.
     * @param label
     */
    getHADeviceClass(label) {
        switch (label) {
        case 'ADPS':
        case 'IINST':
        case 'IMAX':
        case 'ISOUSC':
            return 'current';
        case 'BASE':
        case 'BBRHCJB':
        case 'BBRHCJR':
        case 'BBRHCJW':
        case 'BBRHPJB':
        case 'BBRHPJR':
        case 'BBRHPJW':
        case 'EJPHN':
        case 'EJPHPM':
        case 'HCHC':
        case 'HCHP':
            return 'energy';
        case 'PAPP':
            return 'power';
        default:
            return undefined;
        }
    }

    /**
     * Get the HA state Class.
     * @param label
     */
    getHAStateClass(label) {
        switch (label) {
        case 'BASE':
        case 'BBRHCJB':
        case 'BBRHCJR':
        case 'BBRHCJW':
        case 'BBRHPJB':
        case 'BBRHPJR':
        case 'BBRHPJW':
        case 'EJPHN':
        case 'EJPHPM':
        case 'HCHC':
        case 'HCHP':
            return 'total_increasing';
        default:
            return undefined;
        }
    }

    /**
     * Get the HA unit.
     * @param label
     */
    getHAUnit(label) {
        switch (label) {
        case 'ADPS':
        case 'IINST':
        case 'IMAX':
        case 'ISOUSC':
            return 'A';
        case 'BASE':
        case 'BBRHCJB':
        case 'BBRHCJR':
        case 'BBRHCJW':
        case 'BBRHPJB':
        case 'BBRHPJR':
        case 'BBRHPJW':
        case 'EJPHN':
        case 'EJPHPM':
        case 'HCHC':
        case 'HCHP':
            return 'Wh';
        case 'PAPP':
            return 'VA';
        case 'PEJP':
            return 'min';
        default:
            return undefined;
        }
    }
}

module.exports = HistoryTicMode;
