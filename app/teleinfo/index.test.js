const SerialPort = require('@serialport/stream');
const SerialPortMockBinding = require('@serialport/binding-mock');
const HistoryTicMode = require('./history/HistoryTicMode');
const StandardTicMode = require('./standard/StandardTicMode');
const teleinfo = require('.');

beforeEach(() => {
    SerialPort.Binding = SerialPortMockBinding;
    SerialPortMockBinding.createPort('/dev/ttyUSB0');
});

test.each([
    { ticMode: 'history', instance: HistoryTicMode },
    { ticMode: 'standard', instance: StandardTicMode },
])(
    'connect should init $instance service when ticMode is $ticMode',
    async ({ ticMode, instance }) => {
        const service = await teleinfo.connect({ ticMode, SerialPortClass: SerialPort });
        expect(service).toBeInstanceOf(instance);
    },
);

test('connect should fail when ticMode is neither history nor standard', async () => {
    try {
        await teleinfo.connect({ ticMode: 'UNKNOWN' });
    } catch (e) {
        expect(e.message).toEqual('Unsupported TIC_MODE [UNKNOWN]');
    }
});
