const hass = require('./hass');
const HistoryTicMode = require('../teleinfo/history/HistoryTicMode');

const sample = {
    ADCO: { raw: '012345678912', value: 12345678912 },
    OPTARIF: { raw: 'BASE', value: 'BASE' },
    ISOUSC: { raw: '45', value: 45 },
    BASE: { raw: '022304568', value: 22304568 },
    PTEC: { raw: 'TH..', value: 'TH' },
    IINST: { raw: '003', value: 3 },
    IMAX: { raw: '090', value: 90 },
    PAPP: { raw: '00720', value: 720 },
    HHPHC: { raw: 'A', value: 'A' },
};

test('publishConfigurationForDiscovery should be called as expected', async () => {
    const mqttClientMock = {
        publish: jest.fn(() => {
        }),
    };
    await hass.publishConfigurationForHassDiscovery({
        client: mqttClientMock,
        id: '012345678912',
        frame: sample,
        teleinfoService: new HistoryTicMode(),
    });
    expect(mqttClientMock.publish).toHaveBeenCalledTimes(9);
    expect(mqttClientMock.publish).toHaveBeenNthCalledWith(1, 'homeassistant/sensor/teleinfo/012345678912_adco/config', JSON.stringify({
        unique_id: 'teleinfo_012345678912_ADCO',
        name: 'Teleinfo 012345678912 ADCO',
        state_topic: 'teleinfo/012345678912',
        value_template: '{% if \'ADCO\' in value_json %}{{ value_json.ADCO.raw }}{% else %}\'\'{% endif %}',
        device: {
            identifiers: [
                '012345678912',
            ],
            manufacturer: 'Enedis',
            model: 'linky_012345678912',
            name: 'Linky 012345678912',
        },
    }), { retain: true });
    expect(mqttClientMock.publish).toHaveBeenNthCalledWith(2, 'homeassistant/sensor/teleinfo/012345678912_optarif/config', JSON.stringify({
        unique_id: 'teleinfo_012345678912_OPTARIF',
        name: 'Teleinfo 012345678912 OPTARIF',
        state_topic: 'teleinfo/012345678912',
        value_template: '{% if \'OPTARIF\' in value_json %}{{ value_json.OPTARIF.value }}{% else %}\'\'{% endif %}',
        device: {
            identifiers: [
                '012345678912',
            ],
            manufacturer: 'Enedis',
            model: 'linky_012345678912',
            name: 'Linky 012345678912',
        },
    }), { retain: true });
    expect(mqttClientMock.publish).toHaveBeenNthCalledWith(3, 'homeassistant/sensor/teleinfo/012345678912_isousc/config', JSON.stringify({
        unique_id: 'teleinfo_012345678912_ISOUSC',
        name: 'Teleinfo 012345678912 ISOUSC',
        state_topic: 'teleinfo/012345678912',
        device_class: 'current',
        value_template: '{% if \'ISOUSC\' in value_json %}{{ value_json.ISOUSC.value }}{% else %}\'\'{% endif %}',
        unit_of_measurement: 'A',
        device: {
            identifiers: [
                '012345678912',
            ],
            manufacturer: 'Enedis',
            model: 'linky_012345678912',
            name: 'Linky 012345678912',
        },
    }), { retain: true });
    expect(mqttClientMock.publish).toHaveBeenNthCalledWith(4, 'homeassistant/sensor/teleinfo/012345678912_base/config', JSON.stringify({
        unique_id: 'teleinfo_012345678912_BASE',
        name: 'Teleinfo 012345678912 BASE',
        state_topic: 'teleinfo/012345678912',
        state_class: 'total_increasing',
        device_class: 'energy',
        value_template: '{% if \'BASE\' in value_json %}{{ value_json.BASE.value }}{% else %}\'\'{% endif %}',
        unit_of_measurement: 'Wh',
        device: {
            identifiers: [
                '012345678912',
            ],
            manufacturer: 'Enedis',
            model: 'linky_012345678912',
            name: 'Linky 012345678912',
        },
    }), { retain: true });
    expect(mqttClientMock.publish).toHaveBeenNthCalledWith(5, 'homeassistant/sensor/teleinfo/012345678912_ptec/config', JSON.stringify({
        unique_id: 'teleinfo_012345678912_PTEC',
        name: 'Teleinfo 012345678912 PTEC',
        state_topic: 'teleinfo/012345678912',
        value_template: '{% if \'PTEC\' in value_json %}{{ value_json.PTEC.value }}{% else %}\'\'{% endif %}',
        device: {
            identifiers: [
                '012345678912',
            ],
            manufacturer: 'Enedis',
            model: 'linky_012345678912',
            name: 'Linky 012345678912',
        },
    }), { retain: true });
    expect(mqttClientMock.publish).toHaveBeenNthCalledWith(6, 'homeassistant/sensor/teleinfo/012345678912_iinst/config', JSON.stringify({
        unique_id: 'teleinfo_012345678912_IINST',
        name: 'Teleinfo 012345678912 IINST',
        state_topic: 'teleinfo/012345678912',
        state_class: 'measurement',
        device_class: 'current',
        value_template: '{% if \'IINST\' in value_json %}{{ value_json.IINST.value }}{% else %}\'\'{% endif %}',
        unit_of_measurement: 'A',
        device: {
            identifiers: [
                '012345678912',
            ],
            manufacturer: 'Enedis',
            model: 'linky_012345678912',
            name: 'Linky 012345678912',
        },
    }), { retain: true });
    expect(mqttClientMock.publish).toHaveBeenNthCalledWith(7, 'homeassistant/sensor/teleinfo/012345678912_imax/config', JSON.stringify({
        unique_id: 'teleinfo_012345678912_IMAX',
        name: 'Teleinfo 012345678912 IMAX',
        state_topic: 'teleinfo/012345678912',
        device_class: 'current',
        value_template: '{% if \'IMAX\' in value_json %}{{ value_json.IMAX.value }}{% else %}\'\'{% endif %}',
        unit_of_measurement: 'A',
        device: {
            identifiers: [
                '012345678912',
            ],
            manufacturer: 'Enedis',
            model: 'linky_012345678912',
            name: 'Linky 012345678912',
        },
    }), { retain: true });
    expect(mqttClientMock.publish).toHaveBeenNthCalledWith(8, 'homeassistant/sensor/teleinfo/012345678912_papp/config', JSON.stringify({
        unique_id: 'teleinfo_012345678912_PAPP',
        name: 'Teleinfo 012345678912 PAPP',
        state_topic: 'teleinfo/012345678912',
        state_class: 'measurement',
        device_class: 'power',
        value_template: '{% if \'PAPP\' in value_json %}{{ value_json.PAPP.value }}{% else %}\'\'{% endif %}',
        unit_of_measurement: 'VA',
        device: {
            identifiers: [
                '012345678912',
            ],
            manufacturer: 'Enedis',
            model: 'linky_012345678912',
            name: 'Linky 012345678912',
        },
    }), { retain: true });
    expect(mqttClientMock.publish).toHaveBeenNthCalledWith(9, 'homeassistant/sensor/teleinfo/012345678912_hhphc/config', JSON.stringify({
        unique_id: 'teleinfo_012345678912_HHPHC',
        name: 'Teleinfo 012345678912 HHPHC',
        state_topic: 'teleinfo/012345678912',
        value_template: '{% if \'HHPHC\' in value_json %}{{ value_json.HHPHC.value }}{% else %}\'\'{% endif %}',
        device: {
            identifiers: [
                '012345678912',
            ],
            manufacturer: 'Enedis',
            model: 'linky_012345678912',
            name: 'Linky 012345678912',
        },
    }), { retain: true });
});
