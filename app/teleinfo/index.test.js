/* eslint no-underscore-dangle: ["error", { "allow": ["__get__", "__set__"] }] */

const rewire = require('rewire');

const moduleToTest = rewire('./index.js');

test('isSameFrame should return true when frame is same as previous one', () => {
    const isSameFrame = moduleToTest.__get__('isSameFrame');
    expect(isSameFrame(12, 12)).toBe(true);
});

test('isSameFrame should return t,rue when frame is same as previous one', () => {
    const isSameFrame = moduleToTest.__get__('isSameFrame');
    expect(isSameFrame({
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
    }, {
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
    })).toBe(true);
});

test('isSameFrame should return true when frame is same as previous one but keys shuffled', async () => {
    const isSameFrame = moduleToTest.__get__('isSameFrame');
    expect(isSameFrame({
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
    }, {
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
    })).toBe(true);
});

test('isSameFrame should return false when frame is different as previous one', async () => {
    const isSameFrame = moduleToTest.__get__('isSameFrame');
    expect(isSameFrame({
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
    }, {
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
    })).toBe(false);
});
