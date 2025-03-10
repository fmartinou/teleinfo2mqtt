const HistoryTicMode = require('./HistoryTicMode');

test('doesMatchMode should return true when history', () => {
    expect(HistoryTicMode.doesMatchMode('history')).toBeTruthy();
    expect(HistoryTicMode.doesMatchMode('history')).toBeTruthy();
    expect(HistoryTicMode.doesMatchMode('standard')).toBeFalsy();
});

test('getMode should return history', () => {
    expect(new HistoryTicMode().getMode()).toEqual('history');
});

test('getBaudRate should return 1200', () => {
    expect(new HistoryTicMode().getBaudRate()).toEqual(1200);
});

test('isFrameStart should return true when label is ADCO', () => {
    expect(new HistoryTicMode().isFrameStart('ADCO')).toBeTruthy();
    expect(new HistoryTicMode().isFrameStart('OTHER')).toBeFalsy();
});

test('isFrameEnd should return true when label is MOTDETAT', () => {
    const historyTicMode = new HistoryTicMode();
    historyTicMode.currentFrame = { ADCO: {} };
    expect(historyTicMode.isFrameEnd('MOTDETAT')).toBeTruthy();
    expect(historyTicMode.isFrameEnd('OTHER')).toBeFalsy();
});

test.each([
    { label: 'HHPHC', value: 'X' },
    { label: 'ISOUSC', value: 'XX' },
    { label: 'PEJP', value: 'XX' },
    { label: 'IINST', value: 'XXX' },
    { label: 'ADPS', value: 'XXX' },
    { label: 'IMAX', value: 'XXX' },
    { label: 'PTEC', value: 'XXXX' },
    { label: 'OPTARIF', value: 'XXXX' },
    { label: 'DEMAIN', value: 'XXXX' },
    { label: 'PAPP', value: 'XXXXX' },
    { label: 'MOTDETAT', value: 'XXXXXX' },
    { label: 'BASE', value: 'XXXXXXXXX' },
    { label: 'HCHC', value: 'XXXXXXXXX' },
    { label: 'HCHP', value: 'XXXXXXXXX' },
    { label: 'EJPHN', value: 'XXXXXXXXX' },
    { label: 'EJPHPM', value: 'XXXXXXXXX' },
    { label: 'BBRHCJB', value: 'XXXXXXXXX' },
    { label: 'BBRHPJB', value: 'XXXXXXXXX' },
    { label: 'BBRHCJW', value: 'XXXXXXXXX' },
    { label: 'BBRHPJW', value: 'XXXXXXXXX' },
    { label: 'BBRHCJR', value: 'XXXXXXXXX' },
    { label: 'BBRHPJR', value: 'XXXXXXXXX' },
    { label: 'ADCO', value: '123456789012' },
])(
    'checkValue should return true when label is $label and value is $value',
    ({ label, value }) => {
        expect(new HistoryTicMode().checkValue({ label, value })).toBeTruthy();
    },
);
