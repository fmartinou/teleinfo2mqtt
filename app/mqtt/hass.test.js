const hass = require('./hass');
const HistoryTicMode = require('../teleinfo/history/HistoryTicMode');

test('publishConfigurationForDiscovery should be called as expected', async () => {
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

    expect(mqttClientMock.publish).toHaveBeenNthCalledWith(2, 'homeassistant/sensor/teleinfo/012345678912_adir1/config', JSON.stringify({
        unique_id: 'teleinfo_012345678912_ADIR1',
        name: 'Teleinfo 012345678912 ADIR1',
        state_topic: 'teleinfo/012345678912',
        device_class: 'current',
        value_template: '{% if \'ADIR1\' in value_json %}{{ value_json.ADIR1.value }}{% else %}\'\'{% endif %}',
        device: {
            identifiers: [
                '012345678912',
            ],
            manufacturer: 'Enedis',
            model: 'linky_012345678912',
            name: 'Linky 012345678912',
        },
    }), { retain: true });

    expect(mqttClientMock.publish).toHaveBeenNthCalledWith(3, 'homeassistant/sensor/teleinfo/012345678912_adir2/config', JSON.stringify({
        unique_id: 'teleinfo_012345678912_ADIR2',
        name: 'Teleinfo 012345678912 ADIR2',
        state_topic: 'teleinfo/012345678912',
        device_class: 'current',
        value_template: '{% if \'ADIR2\' in value_json %}{{ value_json.ADIR2.value }}{% else %}\'\'{% endif %}',
        device: {
            identifiers: [
                '012345678912',
            ],
            manufacturer: 'Enedis',
            model: 'linky_012345678912',
            name: 'Linky 012345678912',
        },
    }), { retain: true });

    expect(mqttClientMock.publish).toHaveBeenNthCalledWith(4, 'homeassistant/sensor/teleinfo/012345678912_adir3/config', JSON.stringify({
        unique_id: 'teleinfo_012345678912_ADIR3',
        name: 'Teleinfo 012345678912 ADIR3',
        state_topic: 'teleinfo/012345678912',
        device_class: 'current',
        value_template: '{% if \'ADIR3\' in value_json %}{{ value_json.ADIR3.value }}{% else %}\'\'{% endif %}',
        device: {
            identifiers: [
                '012345678912',
            ],
            manufacturer: 'Enedis',
            model: 'linky_012345678912',
            name: 'Linky 012345678912',
        },
    }), { retain: true });

    expect(mqttClientMock.publish).toHaveBeenNthCalledWith(5, 'homeassistant/sensor/teleinfo/012345678912_adps/config', JSON.stringify({
        unique_id: 'teleinfo_012345678912_ADPS',
        name: 'Teleinfo 012345678912 ADPS',
        state_topic: 'teleinfo/012345678912',
        device_class: 'current',
        value_template: '{% if \'ADPS\' in value_json %}{{ value_json.ADPS.value }}{% else %}\'\'{% endif %}',
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

    expect(mqttClientMock.publish).toHaveBeenNthCalledWith(6, 'homeassistant/sensor/teleinfo/012345678912_base/config', JSON.stringify({
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

    expect(mqttClientMock.publish).toHaveBeenNthCalledWith(7, 'homeassistant/sensor/teleinfo/012345678912_bbrhcjb/config', JSON.stringify({
        unique_id: 'teleinfo_012345678912_BBRHCJB',
        name: 'Teleinfo 012345678912 BBRHCJB',
        state_topic: 'teleinfo/012345678912',
        state_class: 'total_increasing',
        device_class: 'energy',
        value_template: '{% if \'BBRHCJB\' in value_json %}{{ value_json.BBRHCJB.value }}{% else %}\'\'{% endif %}',
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

    expect(mqttClientMock.publish).toHaveBeenNthCalledWith(8, 'homeassistant/sensor/teleinfo/012345678912_bbrhcjr/config', JSON.stringify({
        unique_id: 'teleinfo_012345678912_BBRHCJR',
        name: 'Teleinfo 012345678912 BBRHCJR',
        state_topic: 'teleinfo/012345678912',
        state_class: 'total_increasing',
        device_class: 'energy',
        value_template: '{% if \'BBRHCJR\' in value_json %}{{ value_json.BBRHCJR.value }}{% else %}\'\'{% endif %}',
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

    expect(mqttClientMock.publish).toHaveBeenNthCalledWith(9, 'homeassistant/sensor/teleinfo/012345678912_bbrhcjw/config', JSON.stringify({
        unique_id: 'teleinfo_012345678912_BBRHCJW',
        name: 'Teleinfo 012345678912 BBRHCJW',
        state_topic: 'teleinfo/012345678912',
        state_class: 'total_increasing',
        device_class: 'energy',
        value_template: '{% if \'BBRHCJW\' in value_json %}{{ value_json.BBRHCJW.value }}{% else %}\'\'{% endif %}',
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

    expect(mqttClientMock.publish).toHaveBeenNthCalledWith(10, 'homeassistant/sensor/teleinfo/012345678912_bbrhpjb/config', JSON.stringify({
        unique_id: 'teleinfo_012345678912_BBRHPJB',
        name: 'Teleinfo 012345678912 BBRHPJB',
        state_topic: 'teleinfo/012345678912',
        state_class: 'total_increasing',
        device_class: 'energy',
        value_template: '{% if \'BBRHPJB\' in value_json %}{{ value_json.BBRHPJB.value }}{% else %}\'\'{% endif %}',
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

    expect(mqttClientMock.publish).toHaveBeenNthCalledWith(11, 'homeassistant/sensor/teleinfo/012345678912_bbrhpjr/config', JSON.stringify({
        unique_id: 'teleinfo_012345678912_BBRHPJR',
        name: 'Teleinfo 012345678912 BBRHPJR',
        state_topic: 'teleinfo/012345678912',
        state_class: 'total_increasing',
        device_class: 'energy',
        value_template: '{% if \'BBRHPJR\' in value_json %}{{ value_json.BBRHPJR.value }}{% else %}\'\'{% endif %}',
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

    expect(mqttClientMock.publish).toHaveBeenNthCalledWith(12, 'homeassistant/sensor/teleinfo/012345678912_bbrhpjw/config', JSON.stringify({
        unique_id: 'teleinfo_012345678912_BBRHPJW',
        name: 'Teleinfo 012345678912 BBRHPJW',
        state_topic: 'teleinfo/012345678912',
        state_class: 'total_increasing',
        device_class: 'energy',
        value_template: '{% if \'BBRHPJW\' in value_json %}{{ value_json.BBRHPJW.value }}{% else %}\'\'{% endif %}',
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

    expect(mqttClientMock.publish).toHaveBeenNthCalledWith(13, 'homeassistant/sensor/teleinfo/012345678912_demain/config', JSON.stringify({
        unique_id: 'teleinfo_012345678912_DEMAIN',
        name: 'Teleinfo 012345678912 DEMAIN',
        state_topic: 'teleinfo/012345678912',
        value_template: '{% if \'DEMAIN\' in value_json %}{{ value_json.DEMAIN.value }}{% else %}\'\'{% endif %}',
        device: {
            identifiers: [
                '012345678912',
            ],
            manufacturer: 'Enedis',
            model: 'linky_012345678912',
            name: 'Linky 012345678912',
        },
    }), { retain: true });

    expect(mqttClientMock.publish).toHaveBeenNthCalledWith(14, 'homeassistant/sensor/teleinfo/012345678912_ejphn/config', JSON.stringify({
        unique_id: 'teleinfo_012345678912_EJPHN',
        name: 'Teleinfo 012345678912 EJPHN',
        state_topic: 'teleinfo/012345678912',
        state_class: 'total_increasing',
        device_class: 'energy',
        value_template: '{% if \'EJPHN\' in value_json %}{{ value_json.EJPHN.value }}{% else %}\'\'{% endif %}',
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

    expect(mqttClientMock.publish).toHaveBeenNthCalledWith(15, 'homeassistant/sensor/teleinfo/012345678912_ejphpm/config', JSON.stringify({
        unique_id: 'teleinfo_012345678912_EJPHPM',
        name: 'Teleinfo 012345678912 EJPHPM',
        state_topic: 'teleinfo/012345678912',
        state_class: 'total_increasing',
        device_class: 'energy',
        value_template: '{% if \'EJPHPM\' in value_json %}{{ value_json.EJPHPM.value }}{% else %}\'\'{% endif %}',
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

    expect(mqttClientMock.publish).toHaveBeenNthCalledWith(16, 'homeassistant/sensor/teleinfo/012345678912_hchc/config', JSON.stringify({
        unique_id: 'teleinfo_012345678912_HCHC',
        name: 'Teleinfo 012345678912 HCHC',
        state_topic: 'teleinfo/012345678912',
        state_class: 'total_increasing',
        device_class: 'energy',
        value_template: '{% if \'HCHC\' in value_json %}{{ value_json.HCHC.value }}{% else %}\'\'{% endif %}',
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

    expect(mqttClientMock.publish).toHaveBeenNthCalledWith(17, 'homeassistant/sensor/teleinfo/012345678912_hchp/config', JSON.stringify({
        unique_id: 'teleinfo_012345678912_HCHP',
        name: 'Teleinfo 012345678912 HCHP',
        state_topic: 'teleinfo/012345678912',
        state_class: 'total_increasing',
        device_class: 'energy',
        value_template: '{% if \'HCHP\' in value_json %}{{ value_json.HCHP.value }}{% else %}\'\'{% endif %}',
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

    expect(mqttClientMock.publish).toHaveBeenNthCalledWith(18, 'homeassistant/sensor/teleinfo/012345678912_hhphc/config', JSON.stringify({
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

    expect(mqttClientMock.publish).toHaveBeenNthCalledWith(19, 'homeassistant/sensor/teleinfo/012345678912_iinst/config', JSON.stringify({
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

    expect(mqttClientMock.publish).toHaveBeenNthCalledWith(20, 'homeassistant/sensor/teleinfo/012345678912_iinst1/config', JSON.stringify({
        unique_id: 'teleinfo_012345678912_IINST1',
        name: 'Teleinfo 012345678912 IINST1',
        state_topic: 'teleinfo/012345678912',
        state_class: 'measurement',
        device_class: 'current',
        value_template: '{% if \'IINST1\' in value_json %}{{ value_json.IINST1.value }}{% else %}\'\'{% endif %}',
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

    expect(mqttClientMock.publish).toHaveBeenNthCalledWith(21, 'homeassistant/sensor/teleinfo/012345678912_iinst2/config', JSON.stringify({
        unique_id: 'teleinfo_012345678912_IINST2',
        name: 'Teleinfo 012345678912 IINST2',
        state_topic: 'teleinfo/012345678912',
        state_class: 'measurement',
        device_class: 'current',
        value_template: '{% if \'IINST2\' in value_json %}{{ value_json.IINST2.value }}{% else %}\'\'{% endif %}',
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

    expect(mqttClientMock.publish).toHaveBeenNthCalledWith(22, 'homeassistant/sensor/teleinfo/012345678912_iinst3/config', JSON.stringify({
        unique_id: 'teleinfo_012345678912_IINST3',
        name: 'Teleinfo 012345678912 IINST3',
        state_topic: 'teleinfo/012345678912',
        state_class: 'measurement',
        device_class: 'current',
        value_template: '{% if \'IINST3\' in value_json %}{{ value_json.IINST3.value }}{% else %}\'\'{% endif %}',
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

    expect(mqttClientMock.publish).toHaveBeenNthCalledWith(23, 'homeassistant/sensor/teleinfo/012345678912_imax/config', JSON.stringify({
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

    expect(mqttClientMock.publish).toHaveBeenNthCalledWith(24, 'homeassistant/sensor/teleinfo/012345678912_imax1/config', JSON.stringify({
        unique_id: 'teleinfo_012345678912_IMAX1',
        name: 'Teleinfo 012345678912 IMAX1',
        state_topic: 'teleinfo/012345678912',
        device_class: 'current',
        value_template: '{% if \'IMAX1\' in value_json %}{{ value_json.IMAX1.value }}{% else %}\'\'{% endif %}',
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

    expect(mqttClientMock.publish).toHaveBeenNthCalledWith(25, 'homeassistant/sensor/teleinfo/012345678912_imax2/config', JSON.stringify({
        unique_id: 'teleinfo_012345678912_IMAX2',
        name: 'Teleinfo 012345678912 IMAX2',
        state_topic: 'teleinfo/012345678912',
        device_class: 'current',
        value_template: '{% if \'IMAX2\' in value_json %}{{ value_json.IMAX2.value }}{% else %}\'\'{% endif %}',
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

    expect(mqttClientMock.publish).toHaveBeenNthCalledWith(26, 'homeassistant/sensor/teleinfo/012345678912_imax3/config', JSON.stringify({
        unique_id: 'teleinfo_012345678912_IMAX3',
        name: 'Teleinfo 012345678912 IMAX3',
        state_topic: 'teleinfo/012345678912',
        device_class: 'current',
        value_template: '{% if \'IMAX3\' in value_json %}{{ value_json.IMAX3.value }}{% else %}\'\'{% endif %}',
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

    expect(mqttClientMock.publish).toHaveBeenNthCalledWith(27, 'homeassistant/sensor/teleinfo/012345678912_isousc/config', JSON.stringify({
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

    expect(mqttClientMock.publish).toHaveBeenNthCalledWith(28, 'homeassistant/sensor/teleinfo/012345678912_motdetat/config', JSON.stringify({
        unique_id: 'teleinfo_012345678912_MOTDETAT',
        name: 'Teleinfo 012345678912 MOTDETAT',
        state_topic: 'teleinfo/012345678912',
        value_template: '{% if \'MOTDETAT\' in value_json %}{{ value_json.MOTDETAT.value }}{% else %}\'\'{% endif %}',
        device: {
            identifiers: [
                '012345678912',
            ],
            manufacturer: 'Enedis',
            model: 'linky_012345678912',
            name: 'Linky 012345678912',
        },
    }), { retain: true });

    expect(mqttClientMock.publish).toHaveBeenNthCalledWith(29, 'homeassistant/sensor/teleinfo/012345678912_optarif/config', JSON.stringify({
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

    expect(mqttClientMock.publish).toHaveBeenNthCalledWith(30, 'homeassistant/sensor/teleinfo/012345678912_papp/config', JSON.stringify({
        unique_id: 'teleinfo_012345678912_PAPP',
        name: 'Teleinfo 012345678912 PAPP',
        state_topic: 'teleinfo/012345678912',
        state_class: 'measurement',
        device_class: 'apparent_power',
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

    expect(mqttClientMock.publish).toHaveBeenNthCalledWith(31, 'homeassistant/sensor/teleinfo/012345678912_pejp/config', JSON.stringify({
        unique_id: 'teleinfo_012345678912_PEJP',
        name: 'Teleinfo 012345678912 PEJP',
        state_topic: 'teleinfo/012345678912',
        value_template: '{% if \'PEJP\' in value_json %}{{ value_json.PEJP.value }}{% else %}\'\'{% endif %}',
        unit_of_measurement: 'min',
        device: {
            identifiers: [
                '012345678912',
            ],
            manufacturer: 'Enedis',
            model: 'linky_012345678912',
            name: 'Linky 012345678912',
        },
    }), { retain: true });

    expect(mqttClientMock.publish).toHaveBeenNthCalledWith(32, 'homeassistant/sensor/teleinfo/012345678912_pmax/config', JSON.stringify({
        unique_id: 'teleinfo_012345678912_PMAX',
        name: 'Teleinfo 012345678912 PMAX',
        state_topic: 'teleinfo/012345678912',
        device_class: 'power',
        value_template: '{% if \'PMAX\' in value_json %}{{ value_json.PMAX.value }}{% else %}\'\'{% endif %}',
        unit_of_measurement: 'W',
        device: {
            identifiers: [
                '012345678912',
            ],
            manufacturer: 'Enedis',
            model: 'linky_012345678912',
            name: 'Linky 012345678912',
        },
    }), { retain: true });

    expect(mqttClientMock.publish).toHaveBeenNthCalledWith(33, 'homeassistant/sensor/teleinfo/012345678912_ppot/config', JSON.stringify({
        unique_id: 'teleinfo_012345678912_PPOT',
        name: 'Teleinfo 012345678912 PPOT',
        state_topic: 'teleinfo/012345678912',
        value_template: '{% if \'PPOT\' in value_json %}{{ value_json.PPOT.value }}{% else %}\'\'{% endif %}',
        device: {
            identifiers: [
                '012345678912',
            ],
            manufacturer: 'Enedis',
            model: 'linky_012345678912',
            name: 'Linky 012345678912',
        },
    }), { retain: true });

    expect(mqttClientMock.publish).toHaveBeenNthCalledWith(34, 'homeassistant/sensor/teleinfo/012345678912_ptec/config', JSON.stringify({
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
});
