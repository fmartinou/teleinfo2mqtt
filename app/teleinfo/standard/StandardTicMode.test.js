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
    { label: 'PJOURF+1', lineItems: ['PJOURF+1', '02216XXXXXXX', 'x'], value: '02216XXXXXXX' },
    { label: 'CCASN', lineItems: ['CCASN', 'E220526143000', '00504', 'x'], value: '00504' },
    { label: 'CCASN-1', lineItems: ['CCASN-1', 'E220526143000', '00534', 'x'], value: '00534' },
    { label: 'DATE', lineItems: ['DATE', 'E220615092559', '', 'L'], value: '' },
    { label: 'EASD01', lineItems: ['EASD01', '003416027', 'x'], value: '003416027' },
    { label: 'EASD02', lineItems: ['EASD02', '003416027', 'x'], value: '003416027' },
    { label: 'EASD03', lineItems: ['EASD03', '003416027', 'x'], value: '003416027' },
    { label: 'EASD04', lineItems: ['EASD04', '003416027', 'x'], value: '003416027' },
    { label: 'EASF01', lineItems: ['EASF01', '002084472', 'x'], value: '002084472' },
    { label: 'EASF02', lineItems: ['EASF02', '002084472', 'x'], value: '002084472' },
    { label: 'EASF03', lineItems: ['EASF03', '002084472', 'x'], value: '002084472' },
    { label: 'EASF04', lineItems: ['EASF04', '002084472', 'x'], value: '002084472' },
    { label: 'EASF05', lineItems: ['EASF05', '002084472', 'x'], value: '002084472' },
    { label: 'EASF06', lineItems: ['EASF06', '002084472', 'x'], value: '002084472' },
    { label: 'EASF07', lineItems: ['EASF07', '002084472', 'x'], value: '002084472' },
    { label: 'EASF08', lineItems: ['EASF08', '002084472', 'x'], value: '002084472' },
    { label: 'EASF09', lineItems: ['EASF09', '002084472', 'x'], value: '002084472' },
    { label: 'EASF10', lineItems: ['EASF10', '002084472', 'x'], value: '002084472' },
    { label: 'EAST', lineItems: ['EAST', '004552492', 'x'], value: '004552492' },
    { label: 'FPM1', lineItems: ['FPM1', ' 230214060000', '00', 'x'], value: '00' },
    { label: 'IRMS1', lineItems: ['IRMS1', '003', 'x'], value: '003' },
    { label: 'LTARF', lineItems: ['LTARF', 'HC WEEK END', 'x'], value: 'HC WEEK END' },
    { label: 'MSG1', lineItems: ['MSG1', 'PAS DE MESSAGE', 'x'], value: 'PAS DE MESSAGE' },
    { label: 'NGTF', lineItems: ['NGTF', 'HC SEM WE MERCR', 'x'], value: 'HC SEM WE MERCR' },
    { label: 'NJOURF', lineItems: ['NJOURF', '02', 'x'], value: '02' },
    { label: 'NJOURF+1', lineItems: ['NJOURF+1', '02', 'x'], value: '02' },
    { label: 'NTARF', lineItems: ['NTARF', '03', 'x'], value: '03' },
    { label: 'PCOUP', lineItems: ['PCOUP', '09', 'x'], value: '09000' },
    { label: 'PPOINTE', lineItems: ['PPOINTE', '00008002 0300C001 08008002 0C1EC001 0F1E8002', 'x'], value: '00008002 0300C001 08008002 0C1EC001 0F1E8002' },
    { label: 'PJOURF+1', lineItems: ['PJOURF+1', '00008002 0300C001 08008002 0C1EC001 0F1E8002', 'x'], value: '00008002 0300C001 08008002 0C1EC001 0F1E8002' },
    { label: 'PREF', lineItems: ['PREF', '06', 'x'], value: '06000' },
    { label: 'PRM', lineItems: ['PRM', '12462373340635', 'x'], value: '12462373340635' },
    { label: 'RELAIS', lineItems: ['RELAIS', '001', 'x'], value: '001' },
    { label: 'SINSTS', lineItems: ['SINSTS', '02510', 'x'], value: '02510' },
    { label: 'SMAXSN', lineItems: ['SMAXSN', 'E220526121217', '02940', 'x'], value: '02940' },
    { label: 'SMAXSN-1', lineItems: ['SMAXSN', 'E220525132326', '04550', 'x'], value: '04550' },
    { label: 'STGE', lineItems: ['STGE', '003A0800', 'x'], value: '003A0800' },
    { label: 'UMOY1', lineItems: ['UMOY1', 'E220526145000', '234', 'x'], value: '234' },
    { label: 'URMS1', lineItems: ['URMS1', '228', 'x'], value: '228' },
    { label: 'VTIC', lineItems: ['VTIC', '02', 'x'], value: '02' },
])(
    'getValue should return $value when label is $label',
    ({ label, lineItems, value }) => {
        expect(new StandardTicMode().getValue({ label, lineItems })).toEqual(value);
    },
);

test.each([
    { label: 'ADSC', value: '031961805785' },
    { label: 'VTIC', value: '02' },
    { label: 'DATE', value: '' },
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
    { label: 'PJOURF+1', value: '00008002 0050C001 06508002 1220C001 14208002 NONUTILE NONUTILE NONUTILE NONUTILE NONUTILE NONUTILE' },
])(
    'checkValue should return true when label is $label and value is $value',
    ({ label, value }) => {
        expect(new StandardTicMode().checkValue({ label, value })).toBeTruthy();
    },
);

test.each([
    { label: 'CCASN', lineItems: ['CCASN', 'E220526143000', '00504', 'x'], date: 'E220526143000' },
    { label: 'CCASN-1', lineItems: ['CCASN-1', 'E220526143000', '00534', 'x'], date: 'E220526143000' },
    { label: 'SMAXSN', lineItems: ['SMAXSN', 'E220526121217', '02940', 'x'], date: 'E220526121217' },
    { label: 'SMAXSN-1', lineItems: ['SMAXSN', 'E220525132326', '04550', 'x'], date: 'E220525132326' },
    { label: 'UMOY1', lineItems: ['UMOY1', 'E220526145000', '234', 'x'], date: 'E220526145000' },
    { label: 'DATE', lineItems: ['DATE', 'E220526145000', '', 'x'], date: 'E220526145000' },
])(
    'getTimestamp should return $date when label is $label',
    ({ label, lineItems, date }) => {
        expect(new StandardTicMode().getTimestamp({ label, lineItems })).toEqual(date);
    },
);

test.each([
    { value: '02216XXXXXXX', parsedFrame: { raw: '02216XXXXXXX', value: 2216, timestamp: undefined } },
    { value: '00504', timestampStr: 'E220526143000', parsedFrame: { raw: '00504', value: 504, timestamp: { date: '2022-05-26T14:30:00.000Z', dst: 'summer' } } },
])(
    'parseFrameItem should parse and sanitize frame for label $label',
    ({ value, timestampStr, parsedFrame }) => {
        expect(new StandardTicMode().parseFrameItem({ value, timestampStr })).toEqual(parsedFrame);
    },
);

test.each([
    { data: 'EASF06\t000000000\tx', parsedFrame: { EASF06: { raw: '000000000', value: 0 } } },
    { data: 'NGTF\tH PLEINE/CREUSE\tx', parsedFrame: { NGTF: { raw: 'H PLEINE/CREUSE', value: 'H PLEINE/CREUSE' } } },
    { data: 'SMAXSN\tE220609060531\t02740\t9', parsedFrame: { SMAXSN: { raw: '02740', value: 2740, timestamp: { date: '2022-06-09T06:05:31.000Z', dst: 'summer' } } } },
    { data: 'DATE\tE220609060531\t\tL', parsedFrame: { DATE: { raw: '', value: '', timestamp: { date: '2022-06-09T06:05:31.000Z', dst: 'summer' } } } },
])(
    'processData should process frame as expected',
    ({ data, parsedFrame }) => {
        const ticMode = new StandardTicMode();
        ticMode.processData(data);
        expect(ticMode.currentFrame).toEqual(parsedFrame);
    },
);
