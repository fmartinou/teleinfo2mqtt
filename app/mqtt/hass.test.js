const hass = require('./hass');
const HistoryTicMode = require('../teleinfo/history/HistoryTicMode');
const StandardTicMode = require('../teleinfo/standard/StandardTicMode');

test('publishConfigurationForDiscovery should be called as expected for history mode', async () => {
    const mqttClientMock = {
        publish: jest.fn(() => {
        }),
    };
    await hass.publishConfigurationForHassDiscovery({
        client: mqttClientMock,
        id: '012345678912',
        teleinfoService: new HistoryTicMode(),
    });
    expect(mqttClientMock.publish).toHaveBeenCalledTimes(34);

    expect(mqttClientMock.publish).toHaveBeenNthCalledWith(1, 'homeassistant/sensor/teleinfo/012345678912_adco/config', JSON.stringify({
        unique_id: 'ADCO',
        name: 'ADCO',
        state_topic: 'teleinfo/012345678912',
        value_template: '{% if \'ADCO\' in value_json %}{{ value_json.ADCO.raw }}{% endif %}',
        device: {
            identifiers: [
                '012345678912',
            ],
            manufacturer: 'Enedis',
            model: 'teleinfo_012345678912',
            name: 'Teleinfo 012345678912',
        },
    }), { retain: true });

    expect(mqttClientMock.publish).toHaveBeenNthCalledWith(2, 'homeassistant/sensor/teleinfo/012345678912_adir1/config', JSON.stringify({
        unique_id: 'ADIR1',
        name: 'ADIR1',
        state_topic: 'teleinfo/012345678912',
        device_class: 'current',
        value_template: '{% if \'ADIR1\' in value_json %}{{ value_json.ADIR1.value }}{% endif %}',
        device: {
            identifiers: [
                '012345678912',
            ],
            manufacturer: 'Enedis',
            model: 'teleinfo_012345678912',
            name: 'Teleinfo 012345678912',
        },
    }), { retain: true });

    expect(mqttClientMock.publish).toHaveBeenNthCalledWith(3, 'homeassistant/sensor/teleinfo/012345678912_adir2/config', JSON.stringify({
        unique_id: 'ADIR2',
        name: 'ADIR2',
        state_topic: 'teleinfo/012345678912',
        device_class: 'current',
        value_template: '{% if \'ADIR2\' in value_json %}{{ value_json.ADIR2.value }}{% endif %}',
        device: {
            identifiers: [
                '012345678912',
            ],
            manufacturer: 'Enedis',
            model: 'teleinfo_012345678912',
            name: 'Teleinfo 012345678912',
        },
    }), { retain: true });

    expect(mqttClientMock.publish).toHaveBeenNthCalledWith(4, 'homeassistant/sensor/teleinfo/012345678912_adir3/config', JSON.stringify({
        unique_id: 'ADIR3',
        name: 'ADIR3',
        state_topic: 'teleinfo/012345678912',
        device_class: 'current',
        value_template: '{% if \'ADIR3\' in value_json %}{{ value_json.ADIR3.value }}{% endif %}',
        device: {
            identifiers: [
                '012345678912',
            ],
            manufacturer: 'Enedis',
            model: 'teleinfo_012345678912',
            name: 'Teleinfo 012345678912',
        },
    }), { retain: true });

    expect(mqttClientMock.publish).toHaveBeenNthCalledWith(5, 'homeassistant/sensor/teleinfo/012345678912_adps/config', JSON.stringify({
        unique_id: 'ADPS',
        name: 'ADPS',
        state_topic: 'teleinfo/012345678912',
        device_class: 'current',
        value_template: '{% if \'ADPS\' in value_json %}{{ value_json.ADPS.value }}{% endif %}',
        unit_of_measurement: 'A',
        device: {
            identifiers: [
                '012345678912',
            ],
            manufacturer: 'Enedis',
            model: 'teleinfo_012345678912',
            name: 'Teleinfo 012345678912',
        },
    }), { retain: true });

    expect(mqttClientMock.publish).toHaveBeenNthCalledWith(6, 'homeassistant/sensor/teleinfo/012345678912_base/config', JSON.stringify({
        unique_id: 'BASE',
        name: 'BASE',
        state_topic: 'teleinfo/012345678912',
        state_class: 'total_increasing',
        device_class: 'energy',
        value_template: '{% if \'BASE\' in value_json %}{{ value_json.BASE.value }}{% endif %}',
        unit_of_measurement: 'Wh',
        device: {
            identifiers: [
                '012345678912',
            ],
            manufacturer: 'Enedis',
            model: 'teleinfo_012345678912',
            name: 'Teleinfo 012345678912',
        },
    }), { retain: true });

    expect(mqttClientMock.publish).toHaveBeenNthCalledWith(7, 'homeassistant/sensor/teleinfo/012345678912_bbrhcjb/config', JSON.stringify({
        unique_id: 'BBRHCJB',
        name: 'BBRHCJB',
        state_topic: 'teleinfo/012345678912',
        state_class: 'total_increasing',
        device_class: 'energy',
        value_template: '{% if \'BBRHCJB\' in value_json %}{{ value_json.BBRHCJB.value }}{% endif %}',
        unit_of_measurement: 'Wh',
        device: {
            identifiers: [
                '012345678912',
            ],
            manufacturer: 'Enedis',
            model: 'teleinfo_012345678912',
            name: 'Teleinfo 012345678912',
        },
    }), { retain: true });

    expect(mqttClientMock.publish).toHaveBeenNthCalledWith(8, 'homeassistant/sensor/teleinfo/012345678912_bbrhcjr/config', JSON.stringify({
        unique_id: 'BBRHCJR',
        name: 'BBRHCJR',
        state_topic: 'teleinfo/012345678912',
        state_class: 'total_increasing',
        device_class: 'energy',
        value_template: '{% if \'BBRHCJR\' in value_json %}{{ value_json.BBRHCJR.value }}{% endif %}',
        unit_of_measurement: 'Wh',
        device: {
            identifiers: [
                '012345678912',
            ],
            manufacturer: 'Enedis',
            model: 'teleinfo_012345678912',
            name: 'Teleinfo 012345678912',
        },
    }), { retain: true });

    expect(mqttClientMock.publish).toHaveBeenNthCalledWith(9, 'homeassistant/sensor/teleinfo/012345678912_bbrhcjw/config', JSON.stringify({
        unique_id: 'BBRHCJW',
        name: 'BBRHCJW',
        state_topic: 'teleinfo/012345678912',
        state_class: 'total_increasing',
        device_class: 'energy',
        value_template: '{% if \'BBRHCJW\' in value_json %}{{ value_json.BBRHCJW.value }}{% endif %}',
        unit_of_measurement: 'Wh',
        device: {
            identifiers: [
                '012345678912',
            ],
            manufacturer: 'Enedis',
            model: 'teleinfo_012345678912',
            name: 'Teleinfo 012345678912',
        },
    }), { retain: true });

    expect(mqttClientMock.publish).toHaveBeenNthCalledWith(10, 'homeassistant/sensor/teleinfo/012345678912_bbrhpjb/config', JSON.stringify({
        unique_id: 'BBRHPJB',
        name: 'BBRHPJB',
        state_topic: 'teleinfo/012345678912',
        state_class: 'total_increasing',
        device_class: 'energy',
        value_template: '{% if \'BBRHPJB\' in value_json %}{{ value_json.BBRHPJB.value }}{% endif %}',
        unit_of_measurement: 'Wh',
        device: {
            identifiers: [
                '012345678912',
            ],
            manufacturer: 'Enedis',
            model: 'teleinfo_012345678912',
            name: 'Teleinfo 012345678912',
        },
    }), { retain: true });

    expect(mqttClientMock.publish).toHaveBeenNthCalledWith(11, 'homeassistant/sensor/teleinfo/012345678912_bbrhpjr/config', JSON.stringify({
        unique_id: 'BBRHPJR',
        name: 'BBRHPJR',
        state_topic: 'teleinfo/012345678912',
        state_class: 'total_increasing',
        device_class: 'energy',
        value_template: '{% if \'BBRHPJR\' in value_json %}{{ value_json.BBRHPJR.value }}{% endif %}',
        unit_of_measurement: 'Wh',
        device: {
            identifiers: [
                '012345678912',
            ],
            manufacturer: 'Enedis',
            model: 'teleinfo_012345678912',
            name: 'Teleinfo 012345678912',
        },
    }), { retain: true });

    expect(mqttClientMock.publish).toHaveBeenNthCalledWith(12, 'homeassistant/sensor/teleinfo/012345678912_bbrhpjw/config', JSON.stringify({
        unique_id: 'BBRHPJW',
        name: 'BBRHPJW',
        state_topic: 'teleinfo/012345678912',
        state_class: 'total_increasing',
        device_class: 'energy',
        value_template: '{% if \'BBRHPJW\' in value_json %}{{ value_json.BBRHPJW.value }}{% endif %}',
        unit_of_measurement: 'Wh',
        device: {
            identifiers: [
                '012345678912',
            ],
            manufacturer: 'Enedis',
            model: 'teleinfo_012345678912',
            name: 'Teleinfo 012345678912',
        },
    }), { retain: true });

    expect(mqttClientMock.publish).toHaveBeenNthCalledWith(13, 'homeassistant/sensor/teleinfo/012345678912_demain/config', JSON.stringify({
        unique_id: 'DEMAIN',
        name: 'DEMAIN',
        state_topic: 'teleinfo/012345678912',
        value_template: '{% if \'DEMAIN\' in value_json %}{{ value_json.DEMAIN.value }}{% endif %}',
        device: {
            identifiers: [
                '012345678912',
            ],
            manufacturer: 'Enedis',
            model: 'teleinfo_012345678912',
            name: 'Teleinfo 012345678912',
        },
    }), { retain: true });

    expect(mqttClientMock.publish).toHaveBeenNthCalledWith(14, 'homeassistant/sensor/teleinfo/012345678912_ejphn/config', JSON.stringify({
        unique_id: 'EJPHN',
        name: 'EJPHN',
        state_topic: 'teleinfo/012345678912',
        state_class: 'total_increasing',
        device_class: 'energy',
        value_template: '{% if \'EJPHN\' in value_json %}{{ value_json.EJPHN.value }}{% endif %}',
        unit_of_measurement: 'Wh',
        device: {
            identifiers: [
                '012345678912',
            ],
            manufacturer: 'Enedis',
            model: 'teleinfo_012345678912',
            name: 'Teleinfo 012345678912',
        },
    }), { retain: true });

    expect(mqttClientMock.publish).toHaveBeenNthCalledWith(15, 'homeassistant/sensor/teleinfo/012345678912_ejphpm/config', JSON.stringify({
        unique_id: 'EJPHPM',
        name: 'EJPHPM',
        state_topic: 'teleinfo/012345678912',
        state_class: 'total_increasing',
        device_class: 'energy',
        value_template: '{% if \'EJPHPM\' in value_json %}{{ value_json.EJPHPM.value }}{% endif %}',
        unit_of_measurement: 'Wh',
        device: {
            identifiers: [
                '012345678912',
            ],
            manufacturer: 'Enedis',
            model: 'teleinfo_012345678912',
            name: 'Teleinfo 012345678912',
        },
    }), { retain: true });

    expect(mqttClientMock.publish).toHaveBeenNthCalledWith(16, 'homeassistant/sensor/teleinfo/012345678912_hchc/config', JSON.stringify({
        unique_id: 'HCHC',
        name: 'HCHC',
        state_topic: 'teleinfo/012345678912',
        state_class: 'total_increasing',
        device_class: 'energy',
        value_template: '{% if \'HCHC\' in value_json %}{{ value_json.HCHC.value }}{% endif %}',
        unit_of_measurement: 'Wh',
        device: {
            identifiers: [
                '012345678912',
            ],
            manufacturer: 'Enedis',
            model: 'teleinfo_012345678912',
            name: 'Teleinfo 012345678912',
        },
    }), { retain: true });

    expect(mqttClientMock.publish).toHaveBeenNthCalledWith(17, 'homeassistant/sensor/teleinfo/012345678912_hchp/config', JSON.stringify({
        unique_id: 'HCHP',
        name: 'HCHP',
        state_topic: 'teleinfo/012345678912',
        state_class: 'total_increasing',
        device_class: 'energy',
        value_template: '{% if \'HCHP\' in value_json %}{{ value_json.HCHP.value }}{% endif %}',
        unit_of_measurement: 'Wh',
        device: {
            identifiers: [
                '012345678912',
            ],
            manufacturer: 'Enedis',
            model: 'teleinfo_012345678912',
            name: 'Teleinfo 012345678912',
        },
    }), { retain: true });

    expect(mqttClientMock.publish).toHaveBeenNthCalledWith(18, 'homeassistant/sensor/teleinfo/012345678912_hhphc/config', JSON.stringify({
        unique_id: 'HHPHC',
        name: 'HHPHC',
        state_topic: 'teleinfo/012345678912',
        value_template: '{% if \'HHPHC\' in value_json %}{{ value_json.HHPHC.value }}{% endif %}',
        device: {
            identifiers: [
                '012345678912',
            ],
            manufacturer: 'Enedis',
            model: 'teleinfo_012345678912',
            name: 'Teleinfo 012345678912',
        },
    }), { retain: true });

    expect(mqttClientMock.publish).toHaveBeenNthCalledWith(19, 'homeassistant/sensor/teleinfo/012345678912_iinst/config', JSON.stringify({
        unique_id: 'IINST',
        name: 'IINST',
        state_topic: 'teleinfo/012345678912',
        state_class: 'measurement',
        device_class: 'current',
        value_template: '{% if \'IINST\' in value_json %}{{ value_json.IINST.value }}{% endif %}',
        unit_of_measurement: 'A',
        device: {
            identifiers: [
                '012345678912',
            ],
            manufacturer: 'Enedis',
            model: 'teleinfo_012345678912',
            name: 'Teleinfo 012345678912',
        },
    }), { retain: true });

    expect(mqttClientMock.publish).toHaveBeenNthCalledWith(20, 'homeassistant/sensor/teleinfo/012345678912_iinst1/config', JSON.stringify({
        unique_id: 'IINST1',
        name: 'IINST1',
        state_topic: 'teleinfo/012345678912',
        state_class: 'measurement',
        device_class: 'current',
        value_template: '{% if \'IINST1\' in value_json %}{{ value_json.IINST1.value }}{% endif %}',
        unit_of_measurement: 'A',
        device: {
            identifiers: [
                '012345678912',
            ],
            manufacturer: 'Enedis',
            model: 'teleinfo_012345678912',
            name: 'Teleinfo 012345678912',
        },
    }), { retain: true });

    expect(mqttClientMock.publish).toHaveBeenNthCalledWith(21, 'homeassistant/sensor/teleinfo/012345678912_iinst2/config', JSON.stringify({
        unique_id: 'IINST2',
        name: 'IINST2',
        state_topic: 'teleinfo/012345678912',
        state_class: 'measurement',
        device_class: 'current',
        value_template: '{% if \'IINST2\' in value_json %}{{ value_json.IINST2.value }}{% endif %}',
        unit_of_measurement: 'A',
        device: {
            identifiers: [
                '012345678912',
            ],
            manufacturer: 'Enedis',
            model: 'teleinfo_012345678912',
            name: 'Teleinfo 012345678912',
        },
    }), { retain: true });

    expect(mqttClientMock.publish).toHaveBeenNthCalledWith(22, 'homeassistant/sensor/teleinfo/012345678912_iinst3/config', JSON.stringify({
        unique_id: 'IINST3',
        name: 'IINST3',
        state_topic: 'teleinfo/012345678912',
        state_class: 'measurement',
        device_class: 'current',
        value_template: '{% if \'IINST3\' in value_json %}{{ value_json.IINST3.value }}{% endif %}',
        unit_of_measurement: 'A',
        device: {
            identifiers: [
                '012345678912',
            ],
            manufacturer: 'Enedis',
            model: 'teleinfo_012345678912',
            name: 'Teleinfo 012345678912',
        },
    }), { retain: true });

    expect(mqttClientMock.publish).toHaveBeenNthCalledWith(23, 'homeassistant/sensor/teleinfo/012345678912_imax/config', JSON.stringify({
        unique_id: 'IMAX',
        name: 'IMAX',
        state_topic: 'teleinfo/012345678912',
        device_class: 'current',
        value_template: '{% if \'IMAX\' in value_json %}{{ value_json.IMAX.value }}{% endif %}',
        unit_of_measurement: 'A',
        device: {
            identifiers: [
                '012345678912',
            ],
            manufacturer: 'Enedis',
            model: 'teleinfo_012345678912',
            name: 'Teleinfo 012345678912',
        },
    }), { retain: true });

    expect(mqttClientMock.publish).toHaveBeenNthCalledWith(24, 'homeassistant/sensor/teleinfo/012345678912_imax1/config', JSON.stringify({
        unique_id: 'IMAX1',
        name: 'IMAX1',
        state_topic: 'teleinfo/012345678912',
        device_class: 'current',
        value_template: '{% if \'IMAX1\' in value_json %}{{ value_json.IMAX1.value }}{% endif %}',
        unit_of_measurement: 'A',
        device: {
            identifiers: [
                '012345678912',
            ],
            manufacturer: 'Enedis',
            model: 'teleinfo_012345678912',
            name: 'Teleinfo 012345678912',
        },
    }), { retain: true });

    expect(mqttClientMock.publish).toHaveBeenNthCalledWith(25, 'homeassistant/sensor/teleinfo/012345678912_imax2/config', JSON.stringify({
        unique_id: 'IMAX2',
        name: 'IMAX2',
        state_topic: 'teleinfo/012345678912',
        device_class: 'current',
        value_template: '{% if \'IMAX2\' in value_json %}{{ value_json.IMAX2.value }}{% endif %}',
        unit_of_measurement: 'A',
        device: {
            identifiers: [
                '012345678912',
            ],
            manufacturer: 'Enedis',
            model: 'teleinfo_012345678912',
            name: 'Teleinfo 012345678912',
        },
    }), { retain: true });

    expect(mqttClientMock.publish).toHaveBeenNthCalledWith(26, 'homeassistant/sensor/teleinfo/012345678912_imax3/config', JSON.stringify({
        unique_id: 'IMAX3',
        name: 'IMAX3',
        state_topic: 'teleinfo/012345678912',
        device_class: 'current',
        value_template: '{% if \'IMAX3\' in value_json %}{{ value_json.IMAX3.value }}{% endif %}',
        unit_of_measurement: 'A',
        device: {
            identifiers: [
                '012345678912',
            ],
            manufacturer: 'Enedis',
            model: 'teleinfo_012345678912',
            name: 'Teleinfo 012345678912',
        },
    }), { retain: true });

    expect(mqttClientMock.publish).toHaveBeenNthCalledWith(27, 'homeassistant/sensor/teleinfo/012345678912_isousc/config', JSON.stringify({
        unique_id: 'ISOUSC',
        name: 'ISOUSC',
        state_topic: 'teleinfo/012345678912',
        device_class: 'current',
        value_template: '{% if \'ISOUSC\' in value_json %}{{ value_json.ISOUSC.value }}{% endif %}',
        unit_of_measurement: 'A',
        device: {
            identifiers: [
                '012345678912',
            ],
            manufacturer: 'Enedis',
            model: 'teleinfo_012345678912',
            name: 'Teleinfo 012345678912',
        },
    }), { retain: true });

    expect(mqttClientMock.publish).toHaveBeenNthCalledWith(28, 'homeassistant/sensor/teleinfo/012345678912_motdetat/config', JSON.stringify({
        unique_id: 'MOTDETAT',
        name: 'MOTDETAT',
        state_topic: 'teleinfo/012345678912',
        value_template: '{% if \'MOTDETAT\' in value_json %}{{ value_json.MOTDETAT.value }}{% endif %}',
        device: {
            identifiers: [
                '012345678912',
            ],
            manufacturer: 'Enedis',
            model: 'teleinfo_012345678912',
            name: 'Teleinfo 012345678912',
        },
    }), { retain: true });

    expect(mqttClientMock.publish).toHaveBeenNthCalledWith(29, 'homeassistant/sensor/teleinfo/012345678912_optarif/config', JSON.stringify({
        unique_id: 'OPTARIF',
        name: 'OPTARIF',
        state_topic: 'teleinfo/012345678912',
        value_template: '{% if \'OPTARIF\' in value_json %}{{ value_json.OPTARIF.value }}{% endif %}',
        device: {
            identifiers: [
                '012345678912',
            ],
            manufacturer: 'Enedis',
            model: 'teleinfo_012345678912',
            name: 'Teleinfo 012345678912',
        },
    }), { retain: true });

    expect(mqttClientMock.publish).toHaveBeenNthCalledWith(30, 'homeassistant/sensor/teleinfo/012345678912_papp/config', JSON.stringify({
        unique_id: 'PAPP',
        name: 'PAPP',
        state_topic: 'teleinfo/012345678912',
        state_class: 'measurement',
        device_class: 'apparent_power',
        value_template: '{% if \'PAPP\' in value_json %}{{ value_json.PAPP.value }}{% endif %}',
        unit_of_measurement: 'VA',
        device: {
            identifiers: [
                '012345678912',
            ],
            manufacturer: 'Enedis',
            model: 'teleinfo_012345678912',
            name: 'Teleinfo 012345678912',
        },
    }), { retain: true });

    expect(mqttClientMock.publish).toHaveBeenNthCalledWith(31, 'homeassistant/sensor/teleinfo/012345678912_pejp/config', JSON.stringify({
        unique_id: 'PEJP',
        name: 'PEJP',
        state_topic: 'teleinfo/012345678912',
        value_template: '{% if \'PEJP\' in value_json %}{{ value_json.PEJP.value }}{% endif %}',
        unit_of_measurement: 'min',
        device: {
            identifiers: [
                '012345678912',
            ],
            manufacturer: 'Enedis',
            model: 'teleinfo_012345678912',
            name: 'Teleinfo 012345678912',
        },
    }), { retain: true });

    expect(mqttClientMock.publish).toHaveBeenNthCalledWith(32, 'homeassistant/sensor/teleinfo/012345678912_pmax/config', JSON.stringify({
        unique_id: 'PMAX',
        name: 'PMAX',
        state_topic: 'teleinfo/012345678912',
        device_class: 'power',
        value_template: '{% if \'PMAX\' in value_json %}{{ value_json.PMAX.value }}{% endif %}',
        unit_of_measurement: 'W',
        device: {
            identifiers: [
                '012345678912',
            ],
            manufacturer: 'Enedis',
            model: 'teleinfo_012345678912',
            name: 'Teleinfo 012345678912',
        },
    }), { retain: true });

    expect(mqttClientMock.publish).toHaveBeenNthCalledWith(33, 'homeassistant/sensor/teleinfo/012345678912_ppot/config', JSON.stringify({
        unique_id: 'PPOT',
        name: 'PPOT',
        state_topic: 'teleinfo/012345678912',
        value_template: '{% if \'PPOT\' in value_json %}{{ value_json.PPOT.value }}{% endif %}',
        device: {
            identifiers: [
                '012345678912',
            ],
            manufacturer: 'Enedis',
            model: 'teleinfo_012345678912',
            name: 'Teleinfo 012345678912',
        },
    }), { retain: true });

    expect(mqttClientMock.publish).toHaveBeenNthCalledWith(34, 'homeassistant/sensor/teleinfo/012345678912_ptec/config', JSON.stringify({
        unique_id: 'PTEC',
        name: 'PTEC',
        state_topic: 'teleinfo/012345678912',
        value_template: '{% if \'PTEC\' in value_json %}{{ value_json.PTEC.value }}{% endif %}',
        device: {
            identifiers: [
                '012345678912',
            ],
            manufacturer: 'Enedis',
            model: 'teleinfo_012345678912',
            name: 'Teleinfo 012345678912',
        },
    }), { retain: true });
});
test('publishConfigurationForDiscovery should be called as expected for standard mode', async () => {
    const mqttClientMock = {
        publish: jest.fn(() => {
        }),
    };
    await hass.publishConfigurationForHassDiscovery({
        client: mqttClientMock,
        id: '012345678912',
        teleinfoService: new StandardTicMode(),
    });
    expect(mqttClientMock.publish).toHaveBeenCalledTimes(71);

    expect(mqttClientMock.publish).toHaveBeenNthCalledWith(1, 'homeassistant/sensor/teleinfo/012345678912_adsc/config', JSON.stringify({
        unique_id: 'ADSC',
        name: 'ADSC',
        state_topic: 'teleinfo/012345678912',
        value_template: '{% if \'ADSC\' in value_json %}{{ value_json.ADSC.raw }}{% endif %}',
        device: {
            identifiers: [
                '012345678912',
            ],
            manufacturer: 'Enedis',
            model: 'teleinfo_012345678912',
            name: 'Teleinfo 012345678912',
        },
    }), { retain: true });

    expect(mqttClientMock.publish).toHaveBeenNthCalledWith(2, 'homeassistant/sensor/teleinfo/012345678912_ccain/config', JSON.stringify({
        unique_id: 'CCAIN',
        name: 'CCAIN',
        state_topic: 'teleinfo/012345678912',
        device_class: 'power',
        value_template: '{% if \'CCAIN\' in value_json %}{{ value_json.CCAIN.value }}{% endif %}',
        unit_of_measurement: 'W',
        device: {
            identifiers: [
                '012345678912',
            ],
            manufacturer: 'Enedis',
            model: 'teleinfo_012345678912',
            name: 'Teleinfo 012345678912',
        },
    }), { retain: true });

    expect(mqttClientMock.publish).toHaveBeenNthCalledWith(3, 'homeassistant/sensor/teleinfo/012345678912_ccain_minus_1/config', JSON.stringify({
        unique_id: 'CCAIN-1',
        name: 'CCAIN-1',
        state_topic: 'teleinfo/012345678912',
        device_class: 'power',
        value_template: '{% if \'CCAIN-1\' in value_json %}{{ value_json.CCAIN-1.value }}{% endif %}',
        unit_of_measurement: 'W',
        device: {
            identifiers: [
                '012345678912',
            ],
            manufacturer: 'Enedis',
            model: 'teleinfo_012345678912',
            name: 'Teleinfo 012345678912',
        },
    }), { retain: true });

    expect(mqttClientMock.publish).toHaveBeenNthCalledWith(4, 'homeassistant/sensor/teleinfo/012345678912_ccasn/config', JSON.stringify({
        unique_id: 'CCASN',
        name: 'CCASN',
        state_topic: 'teleinfo/012345678912',
        device_class: 'power',
        value_template: '{% if \'CCASN\' in value_json %}{{ value_json.CCASN.value }}{% endif %}',
        unit_of_measurement: 'W',
        device: {
            identifiers: [
                '012345678912',
            ],
            manufacturer: 'Enedis',
            model: 'teleinfo_012345678912',
            name: 'Teleinfo 012345678912',
        },
    }), { retain: true });

    expect(mqttClientMock.publish).toHaveBeenNthCalledWith(5, 'homeassistant/sensor/teleinfo/012345678912_ccasn_minus_1/config', JSON.stringify({
        unique_id: 'CCASN-1',
        name: 'CCASN-1',
        state_topic: 'teleinfo/012345678912',
        device_class: 'power',
        value_template: '{% if \'CCASN-1\' in value_json %}{{ value_json.CCASN-1.value }}{% endif %}',
        unit_of_measurement: 'W',
        device: {
            identifiers: [
                '012345678912',
            ],
            manufacturer: 'Enedis',
            model: 'teleinfo_012345678912',
            name: 'Teleinfo 012345678912',
        },
    }), { retain: true });

    expect(mqttClientMock.publish).toHaveBeenNthCalledWith(6, 'homeassistant/sensor/teleinfo/012345678912_date/config', JSON.stringify({
        unique_id: 'DATE',
        name: 'DATE',
        state_topic: 'teleinfo/012345678912',
        value_template: '{% if \'DATE\' in value_json %}{{ value_json.DATE.value }}{% endif %}',
        device: {
            identifiers: [
                '012345678912',
            ],
            manufacturer: 'Enedis',
            model: 'teleinfo_012345678912',
            name: 'Teleinfo 012345678912',
        },
    }), { retain: true });

    expect(mqttClientMock.publish).toHaveBeenNthCalledWith(7, 'homeassistant/sensor/teleinfo/012345678912_dpm1/config', JSON.stringify({
        unique_id: 'DPM1',
        name: 'DPM1',
        state_topic: 'teleinfo/012345678912',
        value_template: '{% if \'DPM1\' in value_json %}{{ value_json.DPM1.value }}{% endif %}',
        device: {
            identifiers: [
                '012345678912',
            ],
            manufacturer: 'Enedis',
            model: 'teleinfo_012345678912',
            name: 'Teleinfo 012345678912',
        },
    }), { retain: true });

    expect(mqttClientMock.publish).toHaveBeenNthCalledWith(8, 'homeassistant/sensor/teleinfo/012345678912_dpm2/config', JSON.stringify({
        unique_id: 'DPM2',
        name: 'DPM2',
        state_topic: 'teleinfo/012345678912',
        value_template: '{% if \'DPM2\' in value_json %}{{ value_json.DPM2.value }}{% endif %}',
        device: {
            identifiers: [
                '012345678912',
            ],
            manufacturer: 'Enedis',
            model: 'teleinfo_012345678912',
            name: 'Teleinfo 012345678912',
        },
    }), { retain: true });

    expect(mqttClientMock.publish).toHaveBeenNthCalledWith(9, 'homeassistant/sensor/teleinfo/012345678912_dpm3/config', JSON.stringify({
        unique_id: 'DPM3',
        name: 'DPM3',
        state_topic: 'teleinfo/012345678912',
        value_template: '{% if \'DPM3\' in value_json %}{{ value_json.DPM3.value }}{% endif %}',
        device: {
            identifiers: [
                '012345678912',
            ],
            manufacturer: 'Enedis',
            model: 'teleinfo_012345678912',
            name: 'Teleinfo 012345678912',
        },
    }), { retain: true });

    expect(mqttClientMock.publish).toHaveBeenNthCalledWith(10, 'homeassistant/sensor/teleinfo/012345678912_eait/config', JSON.stringify({
        unique_id: 'EAIT',
        name: 'EAIT',
        state_topic: 'teleinfo/012345678912',
        state_class: 'total_increasing',
        device_class: 'energy',
        value_template: '{% if \'EAIT\' in value_json %}{{ value_json.EAIT.value }}{% endif %}',
        unit_of_measurement: 'Wh',
        device: {
            identifiers: [
                '012345678912',
            ],
            manufacturer: 'Enedis',
            model: 'teleinfo_012345678912',
            name: 'Teleinfo 012345678912',
        },
    }), { retain: true });

    expect(mqttClientMock.publish).toHaveBeenNthCalledWith(11, 'homeassistant/sensor/teleinfo/012345678912_easd01/config', JSON.stringify({
        unique_id: 'EASD01',
        name: 'EASD01',
        state_topic: 'teleinfo/012345678912',
        state_class: 'total_increasing',
        device_class: 'energy',
        value_template: '{% if \'EASD01\' in value_json %}{{ value_json.EASD01.value }}{% endif %}',
        unit_of_measurement: 'Wh',
        device: {
            identifiers: [
                '012345678912',
            ],
            manufacturer: 'Enedis',
            model: 'teleinfo_012345678912',
            name: 'Teleinfo 012345678912',
        },
    }), { retain: true });

    expect(mqttClientMock.publish).toHaveBeenNthCalledWith(12, 'homeassistant/sensor/teleinfo/012345678912_easd02/config', JSON.stringify({
        unique_id: 'EASD02',
        name: 'EASD02',
        state_topic: 'teleinfo/012345678912',
        state_class: 'total_increasing',
        device_class: 'energy',
        value_template: '{% if \'EASD02\' in value_json %}{{ value_json.EASD02.value }}{% endif %}',
        unit_of_measurement: 'Wh',
        device: {
            identifiers: [
                '012345678912',
            ],
            manufacturer: 'Enedis',
            model: 'teleinfo_012345678912',
            name: 'Teleinfo 012345678912',
        },
    }), { retain: true });

    expect(mqttClientMock.publish).toHaveBeenNthCalledWith(13, 'homeassistant/sensor/teleinfo/012345678912_easd03/config', JSON.stringify({
        unique_id: 'EASD03',
        name: 'EASD03',
        state_topic: 'teleinfo/012345678912',
        state_class: 'total_increasing',
        device_class: 'energy',
        value_template: '{% if \'EASD03\' in value_json %}{{ value_json.EASD03.value }}{% endif %}',
        unit_of_measurement: 'Wh',
        device: {
            identifiers: [
                '012345678912',
            ],
            manufacturer: 'Enedis',
            model: 'teleinfo_012345678912',
            name: 'Teleinfo 012345678912',
        },
    }), { retain: true });

    expect(mqttClientMock.publish).toHaveBeenNthCalledWith(14, 'homeassistant/sensor/teleinfo/012345678912_easd04/config', JSON.stringify({
        unique_id: 'EASD04',
        name: 'EASD04',
        state_topic: 'teleinfo/012345678912',
        state_class: 'total_increasing',
        device_class: 'energy',
        value_template: '{% if \'EASD04\' in value_json %}{{ value_json.EASD04.value }}{% endif %}',
        unit_of_measurement: 'Wh',
        device: {
            identifiers: [
                '012345678912',
            ],
            manufacturer: 'Enedis',
            model: 'teleinfo_012345678912',
            name: 'Teleinfo 012345678912',
        },
    }), { retain: true });

    expect(mqttClientMock.publish).toHaveBeenNthCalledWith(15, 'homeassistant/sensor/teleinfo/012345678912_easf01/config', JSON.stringify({
        unique_id: 'EASF01',
        name: 'EASF01',
        state_topic: 'teleinfo/012345678912',
        state_class: 'total_increasing',
        device_class: 'energy',
        value_template: '{% if \'EASF01\' in value_json %}{{ value_json.EASF01.value }}{% endif %}',
        unit_of_measurement: 'Wh',
        device: {
            identifiers: [
                '012345678912',
            ],
            manufacturer: 'Enedis',
            model: 'teleinfo_012345678912',
            name: 'Teleinfo 012345678912',
        },
    }), { retain: true });

    expect(mqttClientMock.publish).toHaveBeenNthCalledWith(16, 'homeassistant/sensor/teleinfo/012345678912_easf02/config', JSON.stringify({
        unique_id: 'EASF02',
        name: 'EASF02',
        state_topic: 'teleinfo/012345678912',
        state_class: 'total_increasing',
        device_class: 'energy',
        value_template: '{% if \'EASF02\' in value_json %}{{ value_json.EASF02.value }}{% endif %}',
        unit_of_measurement: 'Wh',
        device: {
            identifiers: [
                '012345678912',
            ],
            manufacturer: 'Enedis',
            model: 'teleinfo_012345678912',
            name: 'Teleinfo 012345678912',
        },
    }), { retain: true });

    expect(mqttClientMock.publish).toHaveBeenNthCalledWith(17, 'homeassistant/sensor/teleinfo/012345678912_easf03/config', JSON.stringify({
        unique_id: 'EASF03',
        name: 'EASF03',
        state_topic: 'teleinfo/012345678912',
        state_class: 'total_increasing',
        device_class: 'energy',
        value_template: '{% if \'EASF03\' in value_json %}{{ value_json.EASF03.value }}{% endif %}',
        unit_of_measurement: 'Wh',
        device: {
            identifiers: [
                '012345678912',
            ],
            manufacturer: 'Enedis',
            model: 'teleinfo_012345678912',
            name: 'Teleinfo 012345678912',
        },
    }), { retain: true });

    expect(mqttClientMock.publish).toHaveBeenNthCalledWith(18, 'homeassistant/sensor/teleinfo/012345678912_easf04/config', JSON.stringify({
        unique_id: 'EASF04',
        name: 'EASF04',
        state_topic: 'teleinfo/012345678912',
        state_class: 'total_increasing',
        device_class: 'energy',
        value_template: '{% if \'EASF04\' in value_json %}{{ value_json.EASF04.value }}{% endif %}',
        unit_of_measurement: 'Wh',
        device: {
            identifiers: [
                '012345678912',
            ],
            manufacturer: 'Enedis',
            model: 'teleinfo_012345678912',
            name: 'Teleinfo 012345678912',
        },
    }), { retain: true });

    expect(mqttClientMock.publish).toHaveBeenNthCalledWith(19, 'homeassistant/sensor/teleinfo/012345678912_easf05/config', JSON.stringify({
        unique_id: 'EASF05',
        name: 'EASF05',
        state_topic: 'teleinfo/012345678912',
        state_class: 'total_increasing',
        device_class: 'energy',
        value_template: '{% if \'EASF05\' in value_json %}{{ value_json.EASF05.value }}{% endif %}',
        unit_of_measurement: 'Wh',
        device: {
            identifiers: [
                '012345678912',
            ],
            manufacturer: 'Enedis',
            model: 'teleinfo_012345678912',
            name: 'Teleinfo 012345678912',
        },
    }), { retain: true });

    expect(mqttClientMock.publish).toHaveBeenNthCalledWith(20, 'homeassistant/sensor/teleinfo/012345678912_easf06/config', JSON.stringify({
        unique_id: 'EASF06',
        name: 'EASF06',
        state_topic: 'teleinfo/012345678912',
        state_class: 'total_increasing',
        device_class: 'energy',
        value_template: '{% if \'EASF06\' in value_json %}{{ value_json.EASF06.value }}{% endif %}',
        unit_of_measurement: 'Wh',
        device: {
            identifiers: [
                '012345678912',
            ],
            manufacturer: 'Enedis',
            model: 'teleinfo_012345678912',
            name: 'Teleinfo 012345678912',
        },
    }), { retain: true });

    expect(mqttClientMock.publish).toHaveBeenNthCalledWith(21, 'homeassistant/sensor/teleinfo/012345678912_easf07/config', JSON.stringify({
        unique_id: 'EASF07',
        name: 'EASF07',
        state_topic: 'teleinfo/012345678912',
        state_class: 'total_increasing',
        device_class: 'energy',
        value_template: '{% if \'EASF07\' in value_json %}{{ value_json.EASF07.value }}{% endif %}',
        unit_of_measurement: 'Wh',
        device: {
            identifiers: [
                '012345678912',
            ],
            manufacturer: 'Enedis',
            model: 'teleinfo_012345678912',
            name: 'Teleinfo 012345678912',
        },
    }), { retain: true });

    expect(mqttClientMock.publish).toHaveBeenNthCalledWith(22, 'homeassistant/sensor/teleinfo/012345678912_easf08/config', JSON.stringify({
        unique_id: 'EASF08',
        name: 'EASF08',
        state_topic: 'teleinfo/012345678912',
        state_class: 'total_increasing',
        device_class: 'energy',
        value_template: '{% if \'EASF08\' in value_json %}{{ value_json.EASF08.value }}{% endif %}',
        unit_of_measurement: 'Wh',
        device: {
            identifiers: [
                '012345678912',
            ],
            manufacturer: 'Enedis',
            model: 'teleinfo_012345678912',
            name: 'Teleinfo 012345678912',
        },
    }), { retain: true });

    expect(mqttClientMock.publish).toHaveBeenNthCalledWith(23, 'homeassistant/sensor/teleinfo/012345678912_easf09/config', JSON.stringify({
        unique_id: 'EASF09',
        name: 'EASF09',
        state_topic: 'teleinfo/012345678912',
        state_class: 'total_increasing',
        device_class: 'energy',
        value_template: '{% if \'EASF09\' in value_json %}{{ value_json.EASF09.value }}{% endif %}',
        unit_of_measurement: 'Wh',
        device: {
            identifiers: [
                '012345678912',
            ],
            manufacturer: 'Enedis',
            model: 'teleinfo_012345678912',
            name: 'Teleinfo 012345678912',
        },
    }), { retain: true });

    expect(mqttClientMock.publish).toHaveBeenNthCalledWith(24, 'homeassistant/sensor/teleinfo/012345678912_easf10/config', JSON.stringify({
        unique_id: 'EASF10',
        name: 'EASF10',
        state_topic: 'teleinfo/012345678912',
        state_class: 'total_increasing',
        device_class: 'energy',
        value_template: '{% if \'EASF10\' in value_json %}{{ value_json.EASF10.value }}{% endif %}',
        unit_of_measurement: 'Wh',
        device: {
            identifiers: [
                '012345678912',
            ],
            manufacturer: 'Enedis',
            model: 'teleinfo_012345678912',
            name: 'Teleinfo 012345678912',
        },
    }), { retain: true });

    expect(mqttClientMock.publish).toHaveBeenNthCalledWith(25, 'homeassistant/sensor/teleinfo/012345678912_east/config', JSON.stringify({
        unique_id: 'EAST',
        name: 'EAST',
        state_topic: 'teleinfo/012345678912',
        state_class: 'total_increasing',
        device_class: 'energy',
        value_template: '{% if \'EAST\' in value_json %}{{ value_json.EAST.value }}{% endif %}',
        unit_of_measurement: 'Wh',
        device: {
            identifiers: [
                '012345678912',
            ],
            manufacturer: 'Enedis',
            model: 'teleinfo_012345678912',
            name: 'Teleinfo 012345678912',
        },
    }), { retain: true });

    expect(mqttClientMock.publish).toHaveBeenNthCalledWith(26, 'homeassistant/sensor/teleinfo/012345678912_erq1/config', JSON.stringify({
        unique_id: 'ERQ1',
        name: 'ERQ1',
        state_topic: 'teleinfo/012345678912',
        device_class: 'reactive_energy',
        value_template: '{% if \'ERQ1\' in value_json %}{{ value_json.ERQ1.value }}{% endif %}',
        unit_of_measurement: 'varh',
        device: {
            identifiers: [
                '012345678912',
            ],
            manufacturer: 'Enedis',
            model: 'teleinfo_012345678912',
            name: 'Teleinfo 012345678912',
        },
    }), { retain: true });

    expect(mqttClientMock.publish).toHaveBeenNthCalledWith(27, 'homeassistant/sensor/teleinfo/012345678912_erq2/config', JSON.stringify({
        unique_id: 'ERQ2',
        name: 'ERQ2',
        state_topic: 'teleinfo/012345678912',
        device_class: 'reactive_energy',
        value_template: '{% if \'ERQ2\' in value_json %}{{ value_json.ERQ2.value }}{% endif %}',
        unit_of_measurement: 'varh',
        device: {
            identifiers: [
                '012345678912',
            ],
            manufacturer: 'Enedis',
            model: 'teleinfo_012345678912',
            name: 'Teleinfo 012345678912',
        },
    }), { retain: true });

    expect(mqttClientMock.publish).toHaveBeenNthCalledWith(28, 'homeassistant/sensor/teleinfo/012345678912_erq3/config', JSON.stringify({
        unique_id: 'ERQ3',
        name: 'ERQ3',
        state_topic: 'teleinfo/012345678912',
        device_class: 'reactive_energy',
        value_template: '{% if \'ERQ3\' in value_json %}{{ value_json.ERQ3.value }}{% endif %}',
        unit_of_measurement: 'varh',
        device: {
            identifiers: [
                '012345678912',
            ],
            manufacturer: 'Enedis',
            model: 'teleinfo_012345678912',
            name: 'Teleinfo 012345678912',
        },
    }), { retain: true });

    expect(mqttClientMock.publish).toHaveBeenNthCalledWith(29, 'homeassistant/sensor/teleinfo/012345678912_erq4/config', JSON.stringify({
        unique_id: 'ERQ4',
        name: 'ERQ4',
        state_topic: 'teleinfo/012345678912',
        device_class: 'reactive_energy',
        value_template: '{% if \'ERQ4\' in value_json %}{{ value_json.ERQ4.value }}{% endif %}',
        unit_of_measurement: 'varh',
        device: {
            identifiers: [
                '012345678912',
            ],
            manufacturer: 'Enedis',
            model: 'teleinfo_012345678912',
            name: 'Teleinfo 012345678912',
        },
    }), { retain: true });

    expect(mqttClientMock.publish).toHaveBeenNthCalledWith(30, 'homeassistant/sensor/teleinfo/012345678912_fpm1/config', JSON.stringify({
        unique_id: 'FPM1',
        name: 'FPM1',
        state_topic: 'teleinfo/012345678912',
        value_template: '{% if \'FPM1\' in value_json %}{{ value_json.FPM1.value }}{% endif %}',
        device: {
            identifiers: [
                '012345678912',
            ],
            manufacturer: 'Enedis',
            model: 'teleinfo_012345678912',
            name: 'Teleinfo 012345678912',
        },
    }), { retain: true });

    expect(mqttClientMock.publish).toHaveBeenNthCalledWith(31, 'homeassistant/sensor/teleinfo/012345678912_fpm2/config', JSON.stringify({
        unique_id: 'FPM2',
        name: 'FPM2',
        state_topic: 'teleinfo/012345678912',
        value_template: '{% if \'FPM2\' in value_json %}{{ value_json.FPM2.value }}{% endif %}',
        device: {
            identifiers: [
                '012345678912',
            ],
            manufacturer: 'Enedis',
            model: 'teleinfo_012345678912',
            name: 'Teleinfo 012345678912',
        },
    }), { retain: true });

    expect(mqttClientMock.publish).toHaveBeenNthCalledWith(32, 'homeassistant/sensor/teleinfo/012345678912_fpm3/config', JSON.stringify({
        unique_id: 'FPM3',
        name: 'FPM3',
        state_topic: 'teleinfo/012345678912',
        value_template: '{% if \'FPM3\' in value_json %}{{ value_json.FPM3.value }}{% endif %}',
        device: {
            identifiers: [
                '012345678912',
            ],
            manufacturer: 'Enedis',
            model: 'teleinfo_012345678912',
            name: 'Teleinfo 012345678912',
        },
    }), { retain: true });

    expect(mqttClientMock.publish).toHaveBeenNthCalledWith(33, 'homeassistant/sensor/teleinfo/012345678912_irms1/config', JSON.stringify({
        unique_id: 'IRMS1',
        name: 'IRMS1',
        state_topic: 'teleinfo/012345678912',
        state_class: 'measurement',
        device_class: 'current',
        value_template: '{% if \'IRMS1\' in value_json %}{{ value_json.IRMS1.value }}{% endif %}',
        unit_of_measurement: 'A',
        device: {
            identifiers: [
                '012345678912',
            ],
            manufacturer: 'Enedis',
            model: 'teleinfo_012345678912',
            name: 'Teleinfo 012345678912',
        },
    }), { retain: true });

    expect(mqttClientMock.publish).toHaveBeenNthCalledWith(34, 'homeassistant/sensor/teleinfo/012345678912_irms2/config', JSON.stringify({
        unique_id: 'IRMS2',
        name: 'IRMS2',
        state_topic: 'teleinfo/012345678912',
        state_class: 'measurement',
        device_class: 'current',
        value_template: '{% if \'IRMS2\' in value_json %}{{ value_json.IRMS2.value }}{% endif %}',
        unit_of_measurement: 'A',
        device: {
            identifiers: [
                '012345678912',
            ],
            manufacturer: 'Enedis',
            model: 'teleinfo_012345678912',
            name: 'Teleinfo 012345678912',
        },
    }), { retain: true });

    expect(mqttClientMock.publish).toHaveBeenNthCalledWith(35, 'homeassistant/sensor/teleinfo/012345678912_irms3/config', JSON.stringify({
        unique_id: 'IRMS3',
        name: 'IRMS3',
        state_topic: 'teleinfo/012345678912',
        state_class: 'measurement',
        device_class: 'current',
        value_template: '{% if \'IRMS3\' in value_json %}{{ value_json.IRMS3.value }}{% endif %}',
        unit_of_measurement: 'A',
        device: {
            identifiers: [
                '012345678912',
            ],
            manufacturer: 'Enedis',
            model: 'teleinfo_012345678912',
            name: 'Teleinfo 012345678912',
        },
    }), { retain: true });

    expect(mqttClientMock.publish).toHaveBeenNthCalledWith(36, 'homeassistant/sensor/teleinfo/012345678912_ltarf/config', JSON.stringify({
        unique_id: 'LTARF',
        name: 'LTARF',
        state_topic: 'teleinfo/012345678912',
        value_template: '{% if \'LTARF\' in value_json %}{{ value_json.LTARF.value }}{% endif %}',
        device: {
            identifiers: [
                '012345678912',
            ],
            manufacturer: 'Enedis',
            model: 'teleinfo_012345678912',
            name: 'Teleinfo 012345678912',
        },
    }), { retain: true });

    expect(mqttClientMock.publish).toHaveBeenNthCalledWith(37, 'homeassistant/sensor/teleinfo/012345678912_msg1/config', JSON.stringify({
        unique_id: 'MSG1',
        name: 'MSG1',
        state_topic: 'teleinfo/012345678912',
        value_template: '{% if \'MSG1\' in value_json %}{{ value_json.MSG1.value }}{% endif %}',
        device: {
            identifiers: [
                '012345678912',
            ],
            manufacturer: 'Enedis',
            model: 'teleinfo_012345678912',
            name: 'Teleinfo 012345678912',
        },
    }), { retain: true });

    expect(mqttClientMock.publish).toHaveBeenNthCalledWith(38, 'homeassistant/sensor/teleinfo/012345678912_msg2/config', JSON.stringify({
        unique_id: 'MSG2',
        name: 'MSG2',
        state_topic: 'teleinfo/012345678912',
        value_template: '{% if \'MSG2\' in value_json %}{{ value_json.MSG2.value }}{% endif %}',
        device: {
            identifiers: [
                '012345678912',
            ],
            manufacturer: 'Enedis',
            model: 'teleinfo_012345678912',
            name: 'Teleinfo 012345678912',
        },
    }), { retain: true });

    expect(mqttClientMock.publish).toHaveBeenNthCalledWith(39, 'homeassistant/sensor/teleinfo/012345678912_ngtf/config', JSON.stringify({
        unique_id: 'NGTF',
        name: 'NGTF',
        state_topic: 'teleinfo/012345678912',
        value_template: '{% if \'NGTF\' in value_json %}{{ value_json.NGTF.value }}{% endif %}',
        device: {
            identifiers: [
                '012345678912',
            ],
            manufacturer: 'Enedis',
            model: 'teleinfo_012345678912',
            name: 'Teleinfo 012345678912',
        },
    }), { retain: true });

    expect(mqttClientMock.publish).toHaveBeenNthCalledWith(40, 'homeassistant/sensor/teleinfo/012345678912_njourf/config', JSON.stringify({
        unique_id: 'NJOURF',
        name: 'NJOURF',
        state_topic: 'teleinfo/012345678912',
        value_template: '{% if \'NJOURF\' in value_json %}{{ value_json.NJOURF.value }}{% endif %}',
        device: {
            identifiers: [
                '012345678912',
            ],
            manufacturer: 'Enedis',
            model: 'teleinfo_012345678912',
            name: 'Teleinfo 012345678912',
        },
    }), { retain: true });

    expect(mqttClientMock.publish).toHaveBeenNthCalledWith(41, 'homeassistant/sensor/teleinfo/012345678912_njourf_plus_1/config', JSON.stringify({
        unique_id: 'NJOURF+1',
        name: 'NJOURF+1',
        state_topic: 'teleinfo/012345678912',
        value_template: '{% if \'NJOURF+1\' in value_json %}{{ value_json.NJOURF+1.value }}{% endif %}',
        device: {
            identifiers: [
                '012345678912',
            ],
            manufacturer: 'Enedis',
            model: 'teleinfo_012345678912',
            name: 'Teleinfo 012345678912',
        },
    }), { retain: true });

    expect(mqttClientMock.publish).toHaveBeenNthCalledWith(42, 'homeassistant/sensor/teleinfo/012345678912_ntarf/config', JSON.stringify({
        unique_id: 'NTARF',
        name: 'NTARF',
        state_topic: 'teleinfo/012345678912',
        value_template: '{% if \'NTARF\' in value_json %}{{ value_json.NTARF.value }}{% endif %}',
        device: {
            identifiers: [
                '012345678912',
            ],
            manufacturer: 'Enedis',
            model: 'teleinfo_012345678912',
            name: 'Teleinfo 012345678912',
        },
    }), { retain: true });

    expect(mqttClientMock.publish).toHaveBeenNthCalledWith(43, 'homeassistant/sensor/teleinfo/012345678912_pcoup/config', JSON.stringify({
        unique_id: 'PCOUP',
        name: 'PCOUP',
        state_topic: 'teleinfo/012345678912',
        device_class: 'apparent_power',
        value_template: '{% if \'PCOUP\' in value_json %}{{ value_json.PCOUP.value }}{% endif %}',
        unit_of_measurement: 'VA',
        device: {
            identifiers: [
                '012345678912',
            ],
            manufacturer: 'Enedis',
            model: 'teleinfo_012345678912',
            name: 'Teleinfo 012345678912',
        },
    }), { retain: true });

    expect(mqttClientMock.publish).toHaveBeenNthCalledWith(44, 'homeassistant/sensor/teleinfo/012345678912_pjourf_plus_1/config', JSON.stringify({
        unique_id: 'PJOURF+1',
        name: 'PJOURF+1',
        state_topic: 'teleinfo/012345678912',
        value_template: '{% if \'PJOURF+1\' in value_json %}{{ value_json.PJOURF+1.value }}{% endif %}',
        device: {
            identifiers: [
                '012345678912',
            ],
            manufacturer: 'Enedis',
            model: 'teleinfo_012345678912',
            name: 'Teleinfo 012345678912',
        },
    }), { retain: true });

    expect(mqttClientMock.publish).toHaveBeenNthCalledWith(45, 'homeassistant/sensor/teleinfo/012345678912_ppointe/config', JSON.stringify({
        unique_id: 'PPOINTE',
        name: 'PPOINTE',
        state_topic: 'teleinfo/012345678912',
        value_template: '{% if \'PPOINTE\' in value_json %}{{ value_json.PPOINTE.value }}{% endif %}',
        device: {
            identifiers: [
                '012345678912',
            ],
            manufacturer: 'Enedis',
            model: 'teleinfo_012345678912',
            name: 'Teleinfo 012345678912',
        },
    }), { retain: true });

    expect(mqttClientMock.publish).toHaveBeenNthCalledWith(46, 'homeassistant/sensor/teleinfo/012345678912_pref/config', JSON.stringify({
        unique_id: 'PREF',
        name: 'PREF',
        state_topic: 'teleinfo/012345678912',
        device_class: 'apparent_power',
        value_template: '{% if \'PREF\' in value_json %}{{ value_json.PREF.value }}{% endif %}',
        unit_of_measurement: 'VA',
        device: {
            identifiers: [
                '012345678912',
            ],
            manufacturer: 'Enedis',
            model: 'teleinfo_012345678912',
            name: 'Teleinfo 012345678912',
        },
    }), { retain: true });

    expect(mqttClientMock.publish).toHaveBeenNthCalledWith(47, 'homeassistant/sensor/teleinfo/012345678912_prm/config', JSON.stringify({
        unique_id: 'PRM',
        name: 'PRM',
        state_topic: 'teleinfo/012345678912',
        value_template: '{% if \'PRM\' in value_json %}{{ value_json.PRM.value }}{% endif %}',
        device: {
            identifiers: [
                '012345678912',
            ],
            manufacturer: 'Enedis',
            model: 'teleinfo_012345678912',
            name: 'Teleinfo 012345678912',
        },
    }), { retain: true });

    expect(mqttClientMock.publish).toHaveBeenNthCalledWith(48, 'homeassistant/sensor/teleinfo/012345678912_relais/config', JSON.stringify({
        unique_id: 'RELAIS',
        name: 'RELAIS',
        state_topic: 'teleinfo/012345678912',
        value_template: '{% if \'RELAIS\' in value_json %}{{ value_json.RELAIS.value }}{% endif %}',
        device: {
            identifiers: [
                '012345678912',
            ],
            manufacturer: 'Enedis',
            model: 'teleinfo_012345678912',
            name: 'Teleinfo 012345678912',
        },
    }), { retain: true });

    expect(mqttClientMock.publish).toHaveBeenNthCalledWith(49, 'homeassistant/sensor/teleinfo/012345678912_sinsti/config', JSON.stringify({
        unique_id: 'SINSTI',
        name: 'SINSTI',
        state_topic: 'teleinfo/012345678912',
        state_class: 'measurement',
        device_class: 'apparent_power',
        value_template: '{% if \'SINSTI\' in value_json %}{{ value_json.SINSTI.value }}{% endif %}',
        unit_of_measurement: 'VA',
        device: {
            identifiers: [
                '012345678912',
            ],
            manufacturer: 'Enedis',
            model: 'teleinfo_012345678912',
            name: 'Teleinfo 012345678912',
        },
    }), { retain: true });

    expect(mqttClientMock.publish).toHaveBeenNthCalledWith(50, 'homeassistant/sensor/teleinfo/012345678912_sinsts/config', JSON.stringify({
        unique_id: 'SINSTS',
        name: 'SINSTS',
        state_topic: 'teleinfo/012345678912',
        state_class: 'measurement',
        device_class: 'apparent_power',
        value_template: '{% if \'SINSTS\' in value_json %}{{ value_json.SINSTS.value }}{% endif %}',
        unit_of_measurement: 'VA',
        device: {
            identifiers: [
                '012345678912',
            ],
            manufacturer: 'Enedis',
            model: 'teleinfo_012345678912',
            name: 'Teleinfo 012345678912',
        },
    }), { retain: true });

    expect(mqttClientMock.publish).toHaveBeenNthCalledWith(51, 'homeassistant/sensor/teleinfo/012345678912_sinsts1/config', JSON.stringify({
        unique_id: 'SINSTS1',
        name: 'SINSTS1',
        state_topic: 'teleinfo/012345678912',
        state_class: 'measurement',
        device_class: 'apparent_power',
        value_template: '{% if \'SINSTS1\' in value_json %}{{ value_json.SINSTS1.value }}{% endif %}',
        unit_of_measurement: 'VA',
        device: {
            identifiers: [
                '012345678912',
            ],
            manufacturer: 'Enedis',
            model: 'teleinfo_012345678912',
            name: 'Teleinfo 012345678912',
        },
    }), { retain: true });

    expect(mqttClientMock.publish).toHaveBeenNthCalledWith(52, 'homeassistant/sensor/teleinfo/012345678912_sinsts2/config', JSON.stringify({
        unique_id: 'SINSTS2',
        name: 'SINSTS2',
        state_topic: 'teleinfo/012345678912',
        state_class: 'measurement',
        device_class: 'apparent_power',
        value_template: '{% if \'SINSTS2\' in value_json %}{{ value_json.SINSTS2.value }}{% endif %}',
        unit_of_measurement: 'VA',
        device: {
            identifiers: [
                '012345678912',
            ],
            manufacturer: 'Enedis',
            model: 'teleinfo_012345678912',
            name: 'Teleinfo 012345678912',
        },
    }), { retain: true });

    expect(mqttClientMock.publish).toHaveBeenNthCalledWith(53, 'homeassistant/sensor/teleinfo/012345678912_sinsts3/config', JSON.stringify({
        unique_id: 'SINSTS3',
        name: 'SINSTS3',
        state_topic: 'teleinfo/012345678912',
        state_class: 'measurement',
        device_class: 'apparent_power',
        value_template: '{% if \'SINSTS3\' in value_json %}{{ value_json.SINSTS3.value }}{% endif %}',
        unit_of_measurement: 'VA',
        device: {
            identifiers: [
                '012345678912',
            ],
            manufacturer: 'Enedis',
            model: 'teleinfo_012345678912',
            name: 'Teleinfo 012345678912',
        },
    }), { retain: true });

    expect(mqttClientMock.publish).toHaveBeenNthCalledWith(54, 'homeassistant/sensor/teleinfo/012345678912_smaxin/config', JSON.stringify({
        unique_id: 'SMAXIN',
        name: 'SMAXIN',
        state_topic: 'teleinfo/012345678912',
        device_class: 'apparent_power',
        value_template: '{% if \'SMAXIN\' in value_json %}{{ value_json.SMAXIN.value }}{% endif %}',
        unit_of_measurement: 'VA',
        device: {
            identifiers: [
                '012345678912',
            ],
            manufacturer: 'Enedis',
            model: 'teleinfo_012345678912',
            name: 'Teleinfo 012345678912',
        },
    }), { retain: true });

    expect(mqttClientMock.publish).toHaveBeenNthCalledWith(55, 'homeassistant/sensor/teleinfo/012345678912_smaxin_minus_1/config', JSON.stringify({
        unique_id: 'SMAXIN-1',
        name: 'SMAXIN-1',
        state_topic: 'teleinfo/012345678912',
        device_class: 'apparent_power',
        value_template: '{% if \'SMAXIN-1\' in value_json %}{{ value_json.SMAXIN-1.value }}{% endif %}',
        unit_of_measurement: 'VA',
        device: {
            identifiers: [
                '012345678912',
            ],
            manufacturer: 'Enedis',
            model: 'teleinfo_012345678912',
            name: 'Teleinfo 012345678912',
        },
    }), { retain: true });

    expect(mqttClientMock.publish).toHaveBeenNthCalledWith(56, 'homeassistant/sensor/teleinfo/012345678912_smaxsn/config', JSON.stringify({
        unique_id: 'SMAXSN',
        name: 'SMAXSN',
        state_topic: 'teleinfo/012345678912',
        device_class: 'apparent_power',
        value_template: '{% if \'SMAXSN\' in value_json %}{{ value_json.SMAXSN.value }}{% endif %}',
        unit_of_measurement: 'VA',
        device: {
            identifiers: [
                '012345678912',
            ],
            manufacturer: 'Enedis',
            model: 'teleinfo_012345678912',
            name: 'Teleinfo 012345678912',
        },
    }), { retain: true });

    expect(mqttClientMock.publish).toHaveBeenNthCalledWith(57, 'homeassistant/sensor/teleinfo/012345678912_smaxsn_minus_1/config', JSON.stringify({
        unique_id: 'SMAXSN-1',
        name: 'SMAXSN-1',
        state_topic: 'teleinfo/012345678912',
        device_class: 'apparent_power',
        value_template: '{% if \'SMAXSN-1\' in value_json %}{{ value_json.SMAXSN-1.value }}{% endif %}',
        unit_of_measurement: 'VA',
        device: {
            identifiers: [
                '012345678912',
            ],
            manufacturer: 'Enedis',
            model: 'teleinfo_012345678912',
            name: 'Teleinfo 012345678912',
        },
    }), { retain: true });

    expect(mqttClientMock.publish).toHaveBeenNthCalledWith(58, 'homeassistant/sensor/teleinfo/012345678912_smaxsn1/config', JSON.stringify({
        unique_id: 'SMAXSN1',
        name: 'SMAXSN1',
        state_topic: 'teleinfo/012345678912',
        device_class: 'apparent_power',
        value_template: '{% if \'SMAXSN1\' in value_json %}{{ value_json.SMAXSN1.value }}{% endif %}',
        unit_of_measurement: 'VA',
        device: {
            identifiers: [
                '012345678912',
            ],
            manufacturer: 'Enedis',
            model: 'teleinfo_012345678912',
            name: 'Teleinfo 012345678912',
        },
    }), { retain: true });

    expect(mqttClientMock.publish).toHaveBeenNthCalledWith(59, 'homeassistant/sensor/teleinfo/012345678912_smaxsn1_minus_1/config', JSON.stringify({
        unique_id: 'SMAXSN1-1',
        name: 'SMAXSN1-1',
        state_topic: 'teleinfo/012345678912',
        device_class: 'apparent_power',
        value_template: '{% if \'SMAXSN1-1\' in value_json %}{{ value_json.SMAXSN1-1.value }}{% endif %}',
        unit_of_measurement: 'VA',
        device: {
            identifiers: [
                '012345678912',
            ],
            manufacturer: 'Enedis',
            model: 'teleinfo_012345678912',
            name: 'Teleinfo 012345678912',
        },
    }), { retain: true });

    expect(mqttClientMock.publish).toHaveBeenNthCalledWith(60, 'homeassistant/sensor/teleinfo/012345678912_smaxsn2/config', JSON.stringify({
        unique_id: 'SMAXSN2',
        name: 'SMAXSN2',
        state_topic: 'teleinfo/012345678912',
        device_class: 'apparent_power',
        value_template: '{% if \'SMAXSN2\' in value_json %}{{ value_json.SMAXSN2.value }}{% endif %}',
        unit_of_measurement: 'VA',
        device: {
            identifiers: [
                '012345678912',
            ],
            manufacturer: 'Enedis',
            model: 'teleinfo_012345678912',
            name: 'Teleinfo 012345678912',
        },
    }), { retain: true });

    expect(mqttClientMock.publish).toHaveBeenNthCalledWith(61, 'homeassistant/sensor/teleinfo/012345678912_smaxsn2_minus_1/config', JSON.stringify({
        unique_id: 'SMAXSN2-1',
        name: 'SMAXSN2-1',
        state_topic: 'teleinfo/012345678912',
        device_class: 'apparent_power',
        value_template: '{% if \'SMAXSN2-1\' in value_json %}{{ value_json.SMAXSN2-1.value }}{% endif %}',
        unit_of_measurement: 'VA',
        device: {
            identifiers: [
                '012345678912',
            ],
            manufacturer: 'Enedis',
            model: 'teleinfo_012345678912',
            name: 'Teleinfo 012345678912',
        },
    }), { retain: true });

    expect(mqttClientMock.publish).toHaveBeenNthCalledWith(62, 'homeassistant/sensor/teleinfo/012345678912_smaxsn3/config', JSON.stringify({
        unique_id: 'SMAXSN3',
        name: 'SMAXSN3',
        state_topic: 'teleinfo/012345678912',
        device_class: 'apparent_power',
        value_template: '{% if \'SMAXSN3\' in value_json %}{{ value_json.SMAXSN3.value }}{% endif %}',
        unit_of_measurement: 'VA',
        device: {
            identifiers: [
                '012345678912',
            ],
            manufacturer: 'Enedis',
            model: 'teleinfo_012345678912',
            name: 'Teleinfo 012345678912',
        },
    }), { retain: true });

    expect(mqttClientMock.publish).toHaveBeenNthCalledWith(63, 'homeassistant/sensor/teleinfo/012345678912_smaxsn3_minus_1/config', JSON.stringify({
        unique_id: 'SMAXSN3-1',
        name: 'SMAXSN3-1',
        state_topic: 'teleinfo/012345678912',
        device_class: 'apparent_power',
        value_template: '{% if \'SMAXSN3-1\' in value_json %}{{ value_json.SMAXSN3-1.value }}{% endif %}',
        unit_of_measurement: 'VA',
        device: {
            identifiers: [
                '012345678912',
            ],
            manufacturer: 'Enedis',
            model: 'teleinfo_012345678912',
            name: 'Teleinfo 012345678912',
        },
    }), { retain: true });

    expect(mqttClientMock.publish).toHaveBeenNthCalledWith(64, 'homeassistant/sensor/teleinfo/012345678912_stge/config', JSON.stringify({
        unique_id: 'STGE',
        name: 'STGE',
        state_topic: 'teleinfo/012345678912',
        value_template: '{% if \'STGE\' in value_json %}{{ value_json.STGE.value }}{% endif %}',
        device: {
            identifiers: [
                '012345678912',
            ],
            manufacturer: 'Enedis',
            model: 'teleinfo_012345678912',
            name: 'Teleinfo 012345678912',
        },
        json_attributes_topic: 'teleinfo/012345678912',
        json_attributes_template: '{%- if \'STGE\' in value_json -%}\n    {%- set stge = int(value_json.STGE.value, base=16) -%}\n    {%- set tempo_today = (stge // (2**24)) | bitwise_and(3) -%}\n    {%- set tempo_tomorrow = (stge // (2**26)) | bitwise_and(3) -%}\n    {{ {\n        \'contact_sec\': ("on" if (((stge // (2**0)) | bitwise_and(1)) == 0) else "off"),\n        \'organe_de_coupure\': ((stge // (2**1)) | bitwise_and(0b111)) == 0,\n        \'etat_cache_borne_distributeur_closed\': (stge | bitwise_and(0b10000)) == 0,\n        \'overvoltage\': (stge | bitwise_and(0b1000000)) != 0,\n        \'overload\': (stge | bitwise_and(0b10000000)) != 0,\n        \'consuming\': (stge | bitwise_and(0b100000000)) == 0,\n        \'producing\': (stge | bitwise_and(0b100000000)) != 0,\n        \'active_energy_positive\': (stge | bitwise_and(0b1000000000)) == 0,\n        \'idx_tarif_fournisseur\': stge | bitwise_and(0x00003C00)//(2**10),\n        \'idx_tarif_distributeur\': stge | bitwise_and(0x0000C000)//(2**14),\n        \'clock_ok\': (stge | bitwise_and(2**16)) == 0,\n        \'teleinfo_mode\': "historique" if (( stge // (2**17)) | bitwise_and(1) == 0) else "standard",\n        \'euridis_com_enabled\': (stge // (2**19)) | bitwise_and(1) == 1,\n        \'euridis_com_secured\': (stge // (2**20)) | bitwise_and(1) == 1,\n        \'tempo_today\': "bleu" if tempo_today == 0b01 else ("blanc" if tempo_today == 0b10 else ("rouge" if tempo_today == 0b11 else "inconnu")),\n        \'tempo_tomorrow\': "bleu" if tempo_tomorrow == 0b01 else ("blanc" if tempo_tomorrow == 0b10 else ("rouge" if tempo_tomorrow == 0b11 else "inconnu"))\n    } | tojson }}\n    {%- endif -%}',
    }), { retain: true });

    expect(mqttClientMock.publish).toHaveBeenNthCalledWith(65, 'homeassistant/sensor/teleinfo/012345678912_umoy1/config', JSON.stringify({
        unique_id: 'UMOY1',
        name: 'UMOY1',
        state_topic: 'teleinfo/012345678912',
        state_class: 'measurement',
        device_class: 'voltage',
        value_template: '{% if \'UMOY1\' in value_json %}{{ value_json.UMOY1.value }}{% endif %}',
        unit_of_measurement: 'V',
        device: {
            identifiers: [
                '012345678912',
            ],
            manufacturer: 'Enedis',
            model: 'teleinfo_012345678912',
            name: 'Teleinfo 012345678912',
        },
    }), { retain: true });

    expect(mqttClientMock.publish).toHaveBeenNthCalledWith(66, 'homeassistant/sensor/teleinfo/012345678912_umoy2/config', JSON.stringify({
        unique_id: 'UMOY2',
        name: 'UMOY2',
        state_topic: 'teleinfo/012345678912',
        state_class: 'measurement',
        device_class: 'voltage',
        value_template: '{% if \'UMOY2\' in value_json %}{{ value_json.UMOY2.value }}{% endif %}',
        unit_of_measurement: 'V',
        device: {
            identifiers: [
                '012345678912',
            ],
            manufacturer: 'Enedis',
            model: 'teleinfo_012345678912',
            name: 'Teleinfo 012345678912',
        },
    }), { retain: true });

    expect(mqttClientMock.publish).toHaveBeenNthCalledWith(67, 'homeassistant/sensor/teleinfo/012345678912_umoy3/config', JSON.stringify({
        unique_id: 'UMOY3',
        name: 'UMOY3',
        state_topic: 'teleinfo/012345678912',
        state_class: 'measurement',
        device_class: 'voltage',
        value_template: '{% if \'UMOY3\' in value_json %}{{ value_json.UMOY3.value }}{% endif %}',
        unit_of_measurement: 'V',
        device: {
            identifiers: [
                '012345678912',
            ],
            manufacturer: 'Enedis',
            model: 'teleinfo_012345678912',
            name: 'Teleinfo 012345678912',
        },
    }), { retain: true });

    expect(mqttClientMock.publish).toHaveBeenNthCalledWith(68, 'homeassistant/sensor/teleinfo/012345678912_urms1/config', JSON.stringify({
        unique_id: 'URMS1',
        name: 'URMS1',
        state_topic: 'teleinfo/012345678912',
        state_class: 'measurement',
        device_class: 'voltage',
        value_template: '{% if \'URMS1\' in value_json %}{{ value_json.URMS1.value }}{% endif %}',
        unit_of_measurement: 'V',
        device: {
            identifiers: [
                '012345678912',
            ],
            manufacturer: 'Enedis',
            model: 'teleinfo_012345678912',
            name: 'Teleinfo 012345678912',
        },
    }), { retain: true });

    expect(mqttClientMock.publish).toHaveBeenNthCalledWith(69, 'homeassistant/sensor/teleinfo/012345678912_urms2/config', JSON.stringify({
        unique_id: 'URMS2',
        name: 'URMS2',
        state_topic: 'teleinfo/012345678912',
        state_class: 'measurement',
        device_class: 'voltage',
        value_template: '{% if \'URMS2\' in value_json %}{{ value_json.URMS2.value }}{% endif %}',
        unit_of_measurement: 'V',
        device: {
            identifiers: [
                '012345678912',
            ],
            manufacturer: 'Enedis',
            model: 'teleinfo_012345678912',
            name: 'Teleinfo 012345678912',
        },
    }), { retain: true });

    expect(mqttClientMock.publish).toHaveBeenNthCalledWith(70, 'homeassistant/sensor/teleinfo/012345678912_urms3/config', JSON.stringify({
        unique_id: 'URMS3',
        name: 'URMS3',
        state_topic: 'teleinfo/012345678912',
        state_class: 'measurement',
        device_class: 'voltage',
        value_template: '{% if \'URMS3\' in value_json %}{{ value_json.URMS3.value }}{% endif %}',
        unit_of_measurement: 'V',
        device: {
            identifiers: [
                '012345678912',
            ],
            manufacturer: 'Enedis',
            model: 'teleinfo_012345678912',
            name: 'Teleinfo 012345678912',
        },
    }), { retain: true });

    expect(mqttClientMock.publish).toHaveBeenNthCalledWith(71, 'homeassistant/sensor/teleinfo/012345678912_vtic/config', JSON.stringify({
        unique_id: 'VTIC',
        name: 'VTIC',
        state_topic: 'teleinfo/012345678912',
        value_template: '{% if \'VTIC\' in value_json %}{{ value_json.VTIC.value }}{% endif %}',
        device: {
            identifiers: [
                '012345678912',
            ],
            manufacturer: 'Enedis',
            model: 'teleinfo_012345678912',
            name: 'Teleinfo 012345678912',
        },
    }), { retain: true });
});
