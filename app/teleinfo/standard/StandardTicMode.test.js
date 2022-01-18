const StandardTicMode = require('./StandardTicMode');

test('doesMatchMode should return true when standard', () => {
    expect(StandardTicMode.doesMatchMode('standard')).toBeTruthy();
    expect(StandardTicMode.doesMatchMode('standard')).toBeTruthy();
    expect(StandardTicMode.doesMatchMode('history')).toBeFalsy();
});

test('getMode should return standard', () => {
    expect(new StandardTicMode().getMode()).toEqual('standard');
});

test('getBaudRate should return 9600', () => {
    expect(new StandardTicMode().getBaudRate()).toEqual(9600);
});

test('isFrameStart should return true when label is ADSC', () => {
    expect(new StandardTicMode().isFrameStart('ADSC')).toBeTruthy();
    expect(new StandardTicMode().isFrameStart('OTHER')).toBeFalsy();
});

test('isFrameEnd should return true when label is ADSC', () => {
    const historyTicMode = new StandardTicMode();
    historyTicMode.currentFrame = { ADSC: {} };
    expect(historyTicMode.isFrameEnd('ADSC')).toBeTruthy();
    expect(historyTicMode.isFrameEnd('OTHER')).toBeFalsy();
});

test.each([
    { label: 'PJOURF+1', value: '00008001' },
    { label: 'ADSC', value: '031961805785' },
    { label: 'VTIC', value: '02' },
    { label: 'DATE', value: 'H220222202817' },
    { label: 'NGTF', value: 'PRODUCTEUR' },
    { label: 'LTARF', value: 'INDEX NON CONSO' },
    { label: 'EAST', value: '000000000' },
    { label: 'EASF01', value: '000000000' },
    { label: 'EASF02', value: '000000000' },
    { label: 'EASF03', value: '000000000' },
    { label: 'EASF04', value: '000000000' },
    { label: 'EASF05', value: '000000000' },
    { label: 'EASF06', value: '000000000' },
    { label: 'EASF07', value: '000000000' },
    { label: 'EASF08', value: '000000000' },
    { label: 'EASF09', value: '000000000' },
    { label: 'EASF10', value: '000000000' },
    { label: 'EASD01', value: '000000000' },
    { label: 'EASD02', value: '000000000' },
    { label: 'EASD03', value: '000000000' },
    { label: 'EASD04', value: '000000000' },
    { label: 'EAIT', value: '005245004' },
    { label: 'ERQ1', value: '000000000' },
    { label: 'ERQ2', value: '000000000' },
    { label: 'ERQ3', value: '003097421' },
    { label: 'ERQ4', value: '000000198' },
    { label: 'IRMS1', value: '000' },
    { label: 'URMS1', value: '236' },
    { label: 'PREF', value: '02' },
    { label: 'PCOUP', value: '02' },
    { label: 'SINSTS', value: '00063' },
    { label: 'SMAXSN', value: '00071' },
    { label: 'SMAXSN-1', value: '00078' },
    { label: 'SINSTI', value: '00000' },
    { label: 'SMAXIN', value: '01563' },
    { label: 'SMAXIN-1', value: '01476' },
    { label: 'CCAIN', value: '00000' },
    { label: 'CCAIN-1', value: '00000' },
    { label: 'UMOY1', value: '234' },
    { label: 'STGE', value: '003A0101' },
    { label: 'MSG1', value: 'PAS DE          MESSAGE' },
    { label: 'PRM', value: '19412590366786' },
    { label: 'RELAIS', value: '000' },
    { label: 'NTARF', value: '01' },
    { label: 'NJOURF', value: '00' },
    { label: 'NJOURF+1', value: '00' },
    { label: 'PJOURF+1', value: '00008001' },
])(
    'checkValue should return true when label is $label and value is $value',
    ({ label, value }) => {
        expect(new StandardTicMode().checkValue({ label, value })).toBeTruthy();
    },
);
