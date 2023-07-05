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
     * @param previousValue
     * @param value
     * @return {boolean}
     */
    checkValue({ label, previousValue, value }) {
        switch (label) {
        case 'HHPHC':
            return value.length === 1;
        case 'ISOUSC':
        case 'PEJP':
        case 'PPOT':
            return value.length === 2;
        case 'ADIR1':
        case 'ADIR2':
        case 'ADIR3':
        case 'ADPS':
        case 'IINST':
        case 'IINST1':
        case 'IINST2':
        case 'IINST3':
        case 'IMAX':
        case 'IMAX1':
        case 'IMAX2':
        case 'IMAX3':
            return value.length === 3;
        case 'DEMAIN':
        case 'OPTARIF':
        case 'PTEC':
            return value.length === 4;
        case 'PAPP':
        case 'PMAX':
            return value.length === 5;
        case 'MOTDETAT':
            return value.length === 6;
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
            return value.length === 9 && (!previousValue || previousValue <= value);
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
        case 'ADIR1':
        case 'ADIR2':
        case 'ADIR3':
        case 'ADPS':
        case 'IINST':
        case 'IINST1':
        case 'IINST2':
        case 'IINST3':
        case 'IMAX':
        case 'IMAX1':
        case 'IMAX2':
        case 'IMAX3':
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
        case 'PMAX':
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
        case 'IINST':
        case 'IINST1':
        case 'IINST2':
        case 'IINST3':
        case 'PAPP':
            return 'measurement';
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
        case 'IINST1':
        case 'IINST2':
        case 'IINST3':
        case 'IMAX':
        case 'IMAX1':
        case 'IMAX2':
        case 'IMAX3':
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
        case 'PMAX':
            return 'W';
        case 'PEJP':
            return 'min';
        default:
            return undefined;
        }
    }
}

module.exports = HistoryTicMode;
