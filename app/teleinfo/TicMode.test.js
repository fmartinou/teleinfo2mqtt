const { EventEmitter } = require('events');
const SerialPort = require('@serialport/stream');
const SerialPortMockBinding = require('@serialport/binding-mock');
const TicMode = require('./TicMode');

beforeEach(() => {
    SerialPort.Binding = SerialPortMockBinding;
    SerialPortMockBinding.createPort('/dev/ttyUSB0');
});

test('TicMode should initialize with appropriate default values when constructor is called', () => {
    const ticMode = new TicMode();
    expect(ticMode.currentFrame).toEqual({});
    expect(ticMode.previousFrame).toEqual({});
    expect(ticMode.eventEmitter).toMatchObject(new EventEmitter());
    expect(Date.now() - ticMode.lastEmitTime < 1000).toBeTruthy();
});

test('TicMode should disconnect when SIGTERM or SIGKILL are emitted', () => {
    const ticMode = new TicMode();
    jest.spyOn(ticMode, 'disconnect').mockImplementation(() => {});
    process.emit('SIGTERM');
    process.emit('SIGINT');
    expect(ticMode.disconnect).toHaveBeenCalledTimes(2);
});

test.each([
    'getMode',
    'getBaudRate',
    'checkValue',
    'isFrameStart',
    'isFrameEnd',
    'getIdLabel',
    'getHADeviceClass',
    'getHAStateClass',
    'getHAUnit',
])('TicMode should throw an error when function %p is not overridden', (fn) => {
    try {
        new TicMode()[fn]({});
    } catch (e) {
        expect(e.message).toEqual(`${fn} must be overridden`);
    }
});

test('TicMode should throw error when static function doesMatchMode is not overridden', () => {
    try {
        TicMode.doesMatchMode('test');
    } catch (e) {
        expect(e.message).toEqual('doesMatchMode must be overridden');
    }
});

test('connect should connect to serial port when called', async () => {
    const ticMode = new TicMode();
    jest.spyOn(ticMode, 'getMode').mockImplementation(() => 'test');
    jest.spyOn(ticMode, 'getBaudRate').mockImplementation(() => 999);
    await ticMode.connect(SerialPort);
    jest.spyOn(ticMode.serialPort, 'close').mockImplementation(() => {});
    await ticMode.disconnect();
    expect(ticMode.serialPort.close).toHaveBeenCalled();
});

test('disconnect should dicconnect from serial port when called', async () => {
    const ticMode = new TicMode();
    jest.spyOn(ticMode, 'getMode').mockImplementation(() => 'test');
    jest.spyOn(ticMode, 'getBaudRate').mockImplementation(() => 999);
    await ticMode.connect(SerialPort);
    ticMode.disconnect();
});

test('processData should parse frame lines without timestamp when called', async () => {
    const ticMode = new TicMode();
    jest.spyOn(ticMode, 'checkValue').mockImplementation(() => true);
    jest.spyOn(ticMode, 'isFrameStart').mockImplementation(() => false);
    jest.spyOn(ticMode, 'isFrameEnd').mockImplementation(() => false);
    ticMode.processData('LABEL VALUE CHECKSUM');
    expect(ticMode.currentFrame.LABEL).toEqual({
        raw: 'VALUE',
        value: 'VALUE',
        timestamp: undefined,
    });
});

test('processData should parse frame lines with timestamp when called', async () => {
    const ticMode = new TicMode();
    jest.spyOn(ticMode, 'checkValue').mockImplementation(() => true);
    jest.spyOn(ticMode, 'isFrameStart').mockImplementation(() => false);
    jest.spyOn(ticMode, 'isFrameEnd').mockImplementation(() => false);
    jest.spyOn(ticMode, 'getValue').mockImplementation(({ lineItems }) => lineItems[2]);
    jest.spyOn(ticMode, 'getTimestamp').mockImplementation(({ lineItems }) => lineItems[1]);
    ticMode.processData('LABEL H081225223518 VALUE CHECKSUM');
    expect(ticMode.currentFrame.LABEL).toEqual({
        raw: 'VALUE',
        value: 'VALUE',
        timestamp: {
            dst: 'winter',
            date: '2008-12-25T22:35:18.000Z',
        },
    });
});

test('processData should not process the frame line shorter than expected', async () => {
    const ticMode = new TicMode();
    ticMode.processData('LABEL VALUE');
    expect(ticMode.currentFrame.LABEL).toBeUndefined();
});

test('processData should not process the frame line when value is invalid', async () => {
    const ticMode = new TicMode();
    jest.spyOn(ticMode, 'checkValue').mockImplementation(() => false);
    jest.spyOn(ticMode, 'getValue').mockImplementation(({ lineItems }) => lineItems[1]);
    ticMode.processData('LABEL VALUE CHECKSUM');
    expect(ticMode.currentFrame.LABEL).toBeUndefined();
});

test('processData should not process the frame line when timestamp is invalid', async () => {
    const ticMode = new TicMode();
    jest.spyOn(ticMode, 'getValue').mockImplementation(({ lineItems }) => lineItems[2]);
    jest.spyOn(ticMode, 'getTimestamp').mockImplementation(({ lineItems }) => lineItems[1]);
    jest.spyOn(ticMode, 'checkValue').mockImplementation(() => true);
    jest.spyOn(ticMode, 'isFrameStart').mockImplementation(() => false);
    jest.spyOn(ticMode, 'isFrameEnd').mockImplementation(() => false);
    ticMode.processData('LABEL TIMESTAMP_INVALID VALUE CHECKSUM');
    expect(ticMode.currentFrame.LABEL).toBeUndefined();
});

test('processData should publish event when frame ends', async () => {
    const ticMode = new TicMode();
    jest.spyOn(ticMode.eventEmitter, 'emit').mockImplementation(() => {});
    ticMode.previousFrame = {
        PREVIOUS: 'PREVIOUS',
    };
    ticMode.currentFrame = {
        CURRENT: 'CURRENT',
    };
    ticMode.lastEmitTime = Date.parse('2020-12-31');
    jest.spyOn(ticMode, 'getValue').mockImplementation(({ lineItems }) => lineItems[1]);
    jest.spyOn(ticMode, 'checkValue').mockImplementation(() => true);
    jest.spyOn(ticMode, 'isFrameStart').mockImplementation(() => false);
    jest.spyOn(ticMode, 'isFrameEnd').mockImplementation(() => true);
    ticMode.processData('LABEL VALUE CHECKSUM');
    expect(ticMode.eventEmitter.emit).toHaveBeenCalledWith('frame', { CURRENT: 'CURRENT' });
});

test('processData should not publish event when frame date is under emit interval', async () => {
    const ticMode = new TicMode();
    jest.spyOn(ticMode.eventEmitter, 'emit').mockImplementation(() => {});
    ticMode.previousFrame = {
        PREVIOUS: 'PREVIOUS',
    };
    ticMode.currentFrame = {
        CURRENT: 'CURRENT',
    };
    jest.spyOn(ticMode, 'getValue').mockImplementation(({ lineItems }) => lineItems[1]);
    jest.spyOn(ticMode, 'checkValue').mockImplementation(() => true);
    jest.spyOn(ticMode, 'isFrameStart').mockImplementation(() => false);
    jest.spyOn(ticMode, 'isFrameEnd').mockImplementation(() => true);
    ticMode.processData('LABEL VALUE CHECKSUM');
    expect(ticMode.eventEmitter.emit).not.toHaveBeenCalled();
});

test('processData should not publish event when frame is identical', async () => {
    const ticMode = new TicMode();
    jest.spyOn(ticMode.eventEmitter, 'emit').mockImplementation(() => {});
    ticMode.previousFrame = {
        IDENTICAL: 'IDENTICAL',
    };
    ticMode.currentFrame = {
        IDENTICAL: 'IDENTICAL',
    };
    ticMode.lastEmitTime = Date.parse('2020-12-31');
    jest.spyOn(ticMode, 'getValue').mockImplementation(({ lineItems }) => lineItems[1]);
    jest.spyOn(ticMode, 'checkValue').mockImplementation(() => true);
    jest.spyOn(ticMode, 'isFrameStart').mockImplementation(() => false);
    jest.spyOn(ticMode, 'isFrameEnd').mockImplementation(() => true);
    ticMode.processData('LABEL VALUE CHECKSUM');
    expect(ticMode.eventEmitter.emit).not.toHaveBeenCalled();
});

test('processData should reset frame when frame starts', async () => {
    const ticMode = new TicMode();
    ticMode.previousFrame = {
        PREVIOUS: 'PREVIOUS',
    };
    ticMode.currentFrame = {
        CURRENT: 'CURRENT',
    };
    jest.spyOn(ticMode, 'getValue').mockImplementation(({ lineItems }) => lineItems[1]);
    jest.spyOn(ticMode, 'checkValue').mockImplementation(() => true);
    jest.spyOn(ticMode, 'isFrameStart').mockImplementation(() => true);
    jest.spyOn(ticMode, 'isFrameEnd').mockImplementation(() => false);
    ticMode.processData('LABEL VALUE CHECKSUM');
    expect(ticMode.previousFrame).toStrictEqual({ CURRENT: 'CURRENT' });
    expect(ticMode.currentFrame).toStrictEqual({
        LABEL: {
            raw: 'VALUE',
            timestamp: undefined,
            value: 'VALUE',
        },
    });
});

test('isSameFrame should return true when frame is same as previous one', () => {
    const ticMode = new TicMode();
    ticMode.previousFrame = {
        ADCO: {
            raw: '12345678901',
            value: 12345678901,
        },
        OPTARIF: {
            raw: 'HC..',
            value: 'HC',
        },
        ISOUSC: {
            raw: '45',
            value: 45,
        },
        HCHC: {
            raw: '9058688',
            value: 9058688,
        },
        HCHP: {
            raw: '9752846',
            value: 9752846,
        },
        PTEC: {
            raw: 'HP..',
            value: 'HP',
        },
        IINST: {
            raw: '22',
            value: 22,
        },
        IMAX: {
            raw: '90',
            value: 90,
        },
        PAPP: {
            raw: 'A',
            value: 'A',
        },
    };
    ticMode.currentFrame = {
        ADCO: {
            raw: '12345678901',
            value: 12345678901,
        },
        OPTARIF: {
            raw: 'HC..',
            value: 'HC',
        },
        ISOUSC: {
            raw: '45',
            value: 45,
        },
        HCHC: {
            raw: '9058688',
            value: 9058688,
        },
        HCHP: {
            raw: '9752846',
            value: 9752846,
        },
        PTEC: {
            raw: 'HP..',
            value: 'HP',
        },
        IINST: {
            raw: '22',
            value: 22,
        },
        IMAX: {
            raw: '90',
            value: 90,
        },
        PAPP: {
            raw: 'A',
            value: 'A',
        },
    };
    expect(ticMode.isSameFrame()).toBeTruthy();
});

test('isSameFrame should return true when frame is same as previous one but keys shuffled', async () => {
    const ticMode = new TicMode();
    ticMode.previousFrame = {
        OPTARIF: {
            raw: 'HC..',
            value: 'HC',
        },
        ADCO: {
            raw: '12345678901',
            value: 12345678901,
        },
        ISOUSC: {
            raw: '45',
            value: 45,
        },
        HCHP: {
            raw: '9752846',
            value: 9752846,
        },
        HCHC: {
            raw: '9058688',
            value: 9058688,
        },
        PTEC: {
            raw: 'HP..',
            value: 'HP',
        },
        IMAX: {
            raw: '90',
            value: 90,
        },
        IINST: {
            raw: '22',
            value: 22,
        },
        PAPP: {
            raw: 'A',
            value: 'A',
        },
    };
    ticMode.currentFrame = {
        ADCO: {
            raw: '12345678901',
            value: 12345678901,
        },
        OPTARIF: {
            raw: 'HC..',
            value: 'HC',
        },
        ISOUSC: {
            raw: '45',
            value: 45,
        },
        HCHC: {
            raw: '9058688',
            value: 9058688,
        },
        HCHP: {
            raw: '9752846',
            value: 9752846,
        },
        PTEC: {
            raw: 'HP..',
            value: 'HP',
        },
        IINST: {
            raw: '22',
            value: 22,
        },
        IMAX: {
            raw: '90',
            value: 90,
        },
        PAPP: {
            raw: 'A',
            value: 'A',
        },
    };
    expect(ticMode.isSameFrame()).toBeTruthy();
});

test('isSameFrame should return false when frame is different as previous one', async () => {
    const ticMode = new TicMode();
    ticMode.previousFrame = {
        ADCO: {
            raw: '12345678901',
            value: 12345678901,
        },
        OPTARIF: {
            raw: 'HC..',
            value: 'HC',
        },
        ISOUSC: {
            raw: '45',
            value: 45,
        },
        HCHC: {
            raw: '9058688',
            value: 9058688,
        },
        HCHP: {
            raw: '9752847',
            value: 9752847,
        },
        PTEC: {
            raw: 'HP..',
            value: 'HP',
        },
        IINST: {
            raw: '22',
            value: 22,
        },
        IMAX: {
            raw: '90',
            value: 90,
        },
        PAPP: {
            raw: 'A',
            value: 'A',
        },
    };
    ticMode.currentFrame = {
        ADCO: {
            raw: '12345678901',
            value: 12345678901,
        },
        OPTARIF: {
            raw: 'HC..',
            value: 'HC',
        },
        ISOUSC: {
            raw: '45',
            value: 45,
        },
        HCHC: {
            raw: '9058688',
            value: 9058688,
        },
        HCHP: {
            raw: '9752846',
            value: 9752846,
        },
        PTEC: {
            raw: 'HP..',
            value: 'HP',
        },
        IINST: {
            raw: '22',
            value: 22,
        },
        IMAX: {
            raw: '90',
            value: 90,
        },
        PAPP: {
            raw: 'A',
            value: 'A',
        },
    };
    expect(ticMode.isSameFrame()).toBeFalsy();
});
