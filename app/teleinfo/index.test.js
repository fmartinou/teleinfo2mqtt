const { SerialPortMock } = require('serialport');
const HistoryTicMode = require('./history/HistoryTicMode');
const StandardTicMode = require('./standard/StandardTicMode');
const teleinfo = require('.');

beforeEach(() => {
    SerialPortMock.binding.createPort('/dev/ttyUSB0');
});

test.each([
    { ticMode: 'history', instance: HistoryTicMode },
    { ticMode: 'standard', instance: StandardTicMode },
])(
    'connect should init $instance service when ticMode is $ticMode',
    async ({ ticMode, instance }) => {
        const service = await teleinfo.connect({ ticMode, SerialPortClass: SerialPortMock });
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
