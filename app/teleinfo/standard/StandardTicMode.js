const TicMode = require('../TicMode');

class StandardTicMode extends TicMode {
    static TIC_MODE = 'standard';

    labels = [
        'ADSC',
        'CCAIN',
        'CCAIN-1',
        'CCASN',
        'CCASN-1',
        'DATE',
        'DPM1',
        'DPM2',
        'DPM3',
        'EAIT',
        'EASD01',
        'EASD02',
        'EASD03',
        'EASD04',
        'EASF01',
        'EASF02',
        'EASF03',
        'EASF04',
        'EASF05',
        'EASF06',
        'EASF07',
        'EASF08',
        'EASF09',
        'EASF10',
        'EAST',
        'ERQ1',
        'ERQ2',
        'ERQ3',
        'ERQ4',
        'FPM1',
        'FPM2',
        'FPM3',
        'IRMS1',
        'IRMS2',
        'IRMS3',
        'LTARF',
        'MSG1',
        'MSG2',
        'NGTF',
        'NJOURF',
        'NJOURF+1',
        'NTARF',
        'PCOUP',
        'PJOURF+1',
        'PPOINTE',
        'PREF',
        'PRM',
        'RELAIS',
        'SINSTI',
        'SINSTS',
        'SINSTS1',
        'SINSTS2',
        'SINSTS3',
        'SMAXIN',
        'SMAXIN-1',
        'SMAXSN',
        'SMAXSN-1',
        'SMAXSN1',
        'SMAXSN1-1',
        'SMAXSN2',
        'SMAXSN2-1',
        'SMAXSN3',
        'SMAXSN3-1',
        'STGE',
        'UMOY1',
        'UMOY2',
        'UMOY3',
        'URMS1',
        'URMS2',
        'URMS3',
        'VTIC',
    ];

    /**
     * Does ticMode match standard?
     */
    static doesMatchMode(ticMode) {
        return ticMode && ticMode.toLowerCase() === StandardTicMode.TIC_MODE.toLowerCase();
    }

    /**
     * Get ticMode.
     */
    /* eslint-disable class-methods-use-this */
    getMode() {
        return StandardTicMode.TIC_MODE;
    }

    /**
     * Get baud rate.
     */
    /* eslint-disable class-methods-use-this */
    getBaudRate() {
        return 9600;
    }

    /**
     * Get the list of labels managed by this TicMode
     */
    getLabels() {
        return this.labels;
    }

    /**
     * Is the beginning of the frame?
     */
    /* eslint-disable class-methods-use-this */
    isFrameStart(label) {
        return label === 'ADSC';
    }

    /**
     * Is the end of the frame?
     */
    isFrameEnd(label) {
        return label === 'ADSC' && this.currentFrame.ADSC;
    }

    /**
     * Get the value of the label.
     * @param label
     * @param lineItems
     * @return {*}
     */
    getValue({ label, lineItems }) {
        switch (label) {
        case 'DATE':
            return '';
        case 'ADSC':
        case 'EAIT':
        case 'EASD01':
        case 'EASD02':
        case 'EASD03':
        case 'EASD04':
        case 'EASF01':
        case 'EASF02':
        case 'EASF03':
        case 'EASF04':
        case 'EASF05':
        case 'EASF06':
        case 'EASF07':
        case 'EASF08':
        case 'EASF09':
        case 'EASF10':
        case 'EAST':
        case 'ERQ1':
        case 'ERQ2':
        case 'ERQ3':
        case 'ERQ4':
        case 'IRMS1':
        case 'IRMS2':
        case 'IRMS3':
        case 'LTARF':
        case 'MSG1':
        case 'MSG2':
        case 'NGTF':
        case 'NJOURF':
        case 'NJOURF+1':
        case 'NTARF':
        case 'PJOURF+1':
        case 'PPOINTE':
        case 'PRM':
        case 'RELAIS':
        case 'SINSTI':
        case 'SINSTS':
        case 'SINSTS1':
        case 'SINSTS2':
        case 'SINSTS3':
        case 'STGE':
        case 'URMS1':
        case 'URMS2':
        case 'URMS3':
        case 'VTIC':
            return lineItems[1];
        case 'PCOUP':
        case 'PREF':
            return lineItems[1] ? `${lineItems[1]}000` : lineItems[1];
        case 'CCAIN':
        case 'CCAIN-1':
        case 'CCASN':
        case 'CCASN-1':
        case 'DPM1':
        case 'DPM2':
        case 'DPM3':
        case 'FPM1':
        case 'FPM2':
        case 'FPM3':
        case 'SMAXIN':
        case 'SMAXIN-1':
        case 'SMAXSN':
        case 'SMAXSN-1':
        case 'SMAXSN1':
        case 'SMAXSN1-1':
        case 'SMAXSN2':
        case 'SMAXSN2-1':
        case 'SMAXSN3':
        case 'SMAXSN3-1':
        case 'UMOY1':
        case 'UMOY2':
        case 'UMOY3':
            return lineItems[2];
        default:
            return super.getValue({ label, lineItems });
        }
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
        case 'DATE':
            return value.length === 0;
        case 'DPM1':
        case 'DPM2':
        case 'DPM3':
        case 'FPM1':
        case 'FPM2':
        case 'FPM3':
        case 'NJOURF':
        case 'NJOURF+1':
        case 'NTARF':
        case 'PCOUP':
        case 'PREF':
        case 'VTIC':
            return value.length === 2;
        case 'IRMS1':
        case 'IRMS2':
        case 'IRMS3':
        case 'RELAIS':
        case 'UMOY1':
        case 'UMOY2':
        case 'UMOY3':
        case 'URMS1':
        case 'URMS2':
        case 'URMS3':
            return value.length === 3;
        case 'CCAIN':
        case 'CCAIN-1':
        case 'CCASN':
        case 'CCASN-1':
        case 'SINSTI':
        case 'SINSTS':
        case 'SINSTS1':
        case 'SINSTS2':
        case 'SINSTS3':
        case 'SMAXIN':
        case 'SMAXIN-1':
        case 'SMAXSN':
        case 'SMAXSN-1':
        case 'SMAXSN1':
        case 'SMAXSN1-1':
        case 'SMAXSN2':
        case 'SMAXSN2-1':
        case 'SMAXSN3':
        case 'SMAXSN3-1':
            return value.length === 5;
        case 'STGE':
            return value.length === 8;
        case 'EAIT':
        case 'EASD01':
        case 'EASD02':
        case 'EASD03':
        case 'EASD04':
        case 'EASF01':
        case 'EASF02':
        case 'EASF03':
        case 'EASF04':
        case 'EASF05':
        case 'EASF06':
        case 'EASF07':
        case 'EASF08':
        case 'EASF09':
        case 'EASF10':
        case 'EAST':
        case 'ERQ1':
        case 'ERQ2':
        case 'ERQ3':
        case 'ERQ4':
            return value.length === 9 && (!previousValue || previousValue <= value);
        case 'ADSC':
            return value.length === 12;
        case 'PRM':
            return value.length <= 14;
        case 'MSG2':
        case 'NGTF':
        case 'LTARF':
            return value.length <= 16;
        case 'MSG1':
            return value.length <= 32;
        case 'PJOURF+1':
        case 'PPOINTE':
            return value.length === 98;
        default: return false;
        }
    }

    /**
     * Get timestamp associated to the label.
     * @param label
     * @param lineItems
     * @return {undefined}
     */
    getTimestamp({ label, lineItems }) {
        switch (label) {
        case 'CCAIN':
        case 'CCAIN-1':
        case 'CCASN':
        case 'CCASN-1':
        case 'DATE':
        case 'DPM1':
        case 'DPM2':
        case 'DPM3':
        case 'FPM1':
        case 'FPM2':
        case 'FPM3':
        case 'SMAXIN':
        case 'SMAXIN-1':
        case 'SMAXSN':
        case 'SMAXSN-1':
        case 'SMAXSN1':
        case 'SMAXSN1-1':
        case 'SMAXSN2':
        case 'SMAXSN2-1':
        case 'SMAXSN3':
        case 'SMAXSN3-1':
        case 'UMOY1':
        case 'UMOY2':
        case 'UMOY3':
            return lineItems[1];
        default:
            return undefined;
        }
    }

    /**
     * Get the id of the frame (ADSC).
     */
    getIdLabel() {
        return 'ADSC';
    }

    /**
     * Get the HA deviceClass.
     * @param label
     */
    getHADeviceClass(label) {
        switch (label) {
        case 'PREF':
        case 'PCOUP':
        case 'SINSTS':
        case 'SINSTS1':
        case 'SINSTS2':
        case 'SINSTS3':
        case 'SMAXSN':
        case 'SMAXSN1':
        case 'SMAXSN2':
        case 'SMAXSN3':
        case 'SMAXSN-1':
        case 'SMAXSN1-1':
        case 'SMAXSN2-1':
        case 'SMAXSN3-1':
        case 'SINSTI':
        case 'SMAXIN':
        case 'SMAXIN-1':
            return 'apparent_power';
        case 'IRMS1':
        case 'IRMS2':
        case 'IRMS3':
            return 'current';
        case 'EAST':
        case 'EASF01':
        case 'EASF02':
        case 'EASF03':
        case 'EASF04':
        case 'EASF05':
        case 'EASF06':
        case 'EASF07':
        case 'EASF08':
        case 'EASF09':
        case 'EASF10':
        case 'EASD01':
        case 'EASD02':
        case 'EASD03':
        case 'EASD04':
        case 'EAIT':
            return 'energy';
        case 'URMS1':
        case 'URMS2':
        case 'URMS3':
        case 'UMOY1':
        case 'UMOY2':
        case 'UMOY3':
            return 'voltage';
        case 'CCASN':
        case 'CCASN-1':
        case 'CCAIN':
        case 'CCAIN-1':
            return 'power';
        case 'ERQ1':
        case 'ERQ2':
        case 'ERQ3':
        case 'ERQ4':
            return 'reactive_energy';
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
        case 'EAST':
        case 'EASF01':
        case 'EASF02':
        case 'EASF03':
        case 'EASF04':
        case 'EASF05':
        case 'EASF06':
        case 'EASF07':
        case 'EASF08':
        case 'EASF09':
        case 'EASF10':
        case 'EASD01':
        case 'EASD02':
        case 'EASD03':
        case 'EASD04':
        case 'EAIT':
            return 'total_increasing';
        case 'IRMS1':
        case 'IRMS2':
        case 'IRMS3':
        case 'URMS1':
        case 'URMS2':
        case 'URMS3':
        case 'UMOY1':
        case 'UMOY2':
        case 'UMOY3':
        case 'SINSTS':
        case 'SINSTS1':
        case 'SINSTS2':
        case 'SINSTS3':
        case 'SINSTI':
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
        case 'IRMS1':
        case 'IRMS2':
        case 'IRMS3':
            return 'A';
        case 'EAST':
        case 'EASF01':
        case 'EASF02':
        case 'EASF03':
        case 'EASF04':
        case 'EASF05':
        case 'EASF06':
        case 'EASF07':
        case 'EASF08':
        case 'EASF09':
        case 'EASF10':
        case 'EASD01':
        case 'EASD02':
        case 'EASD03':
        case 'EASD04':
        case 'EAIT':
            return 'Wh';
        case 'URMS1':
        case 'URMS2':
        case 'URMS3':
        case 'UMOY1':
        case 'UMOY2':
        case 'UMOY3':
            return 'V';
        case 'PREF':
        case 'PCOUP':
        case 'SINSTS':
        case 'SINSTS1':
        case 'SINSTS2':
        case 'SINSTS3':
        case 'SMAXSN':
        case 'SMAXSN1':
        case 'SMAXSN2':
        case 'SMAXSN3':
        case 'SMAXSN-1':
        case 'SMAXSN1-1':
        case 'SMAXSN2-1':
        case 'SMAXSN3-1':
        case 'SINSTI':
        case 'SMAXIN':
        case 'SMAXIN-1':
            return 'VA';
        case 'CCASN':
        case 'CCASN-1':
        case 'CCAIN':
        case 'CCAIN-1':
            return 'W';
        case 'ERQ1':
        case 'ERQ2':
        case 'ERQ3':
        case 'ERQ4':
            return 'varh';
        default:
            return undefined;
        }
    }

    /**
     * Sanitize value & try to convert to number.
     * @param label
     * @param value
     */
    getValueCoerced({ label, value }) {
        switch (label) {
        case 'STGE':
            return value;
        default:
            return super.getValueCoerced({ label, value });
        }
    }

    /**
     * Get frame data delimiter (space, tab...)
     * @returns {RegExp}
     */
    getDataDelimiter() {
        return /\t+/;
    }
}

module.exports = StandardTicMode;
