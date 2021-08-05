/* eslint no-underscore-dangle: ["error", { "allow": ["__get__", "__set__"] }] */

const rewire = require('rewire');
const mqttAsync = require('async-mqtt');

mqttAsync.connectAsync = jest.fn(() => {});
const mqtt = require('./index');

test('connect should be called as expected', async () => {
    const moduleToTest = rewire('./index');
    moduleToTest.__set__('client', {
        publish: jest.fn(() => {}),
    });
    await mqtt.connect();
    expect(mqttAsync.connectAsync).toHaveBeenCalledWith('mqtt://localhost:1883', {});
});

test('disconnect should be called as expected', async () => {
    const moduleToTest = rewire('./index');
    moduleToTest.__set__('client', {
        end: jest.fn(() => {}),
    });
    await moduleToTest.disconnect();
    expect(moduleToTest.__get__('client').end).toHaveBeenCalledTimes(1);
});

test('publishFrame should be called as expected', () => {
    const moduleToTest = rewire('./index');
    moduleToTest.__set__('client', {
        publish: jest.fn(() => {}),
    });
    moduleToTest.__set__('discoveryConfigurationPublished', true);
    const frame = { ADCO: { raw: '123456789' } };
    moduleToTest.publishFrame(frame);
    expect(moduleToTest.__get__('client').publish).toHaveBeenCalledWith('teleinfo/123456789', JSON.stringify(frame));
});

test('publishConfigurationForDiscovery should be called as expected', () => {
    const moduleToTest = rewire('./index');
    moduleToTest.__set__('client', {
        publish: jest.fn(() => {}),
    });
    moduleToTest.publishConfigurationForDiscovery('123456789');
    expect(moduleToTest.__get__('client').publish).toHaveBeenCalledWith('homeassistant/sensor/teleinfo/123456789/config', JSON.stringify({
        unique_id: 'teleinfo_123456789',
        name: 'Teleinfo 123456789',
        icon: 'mdi:speedometer',
        state_topic: 'teleinfo/123456789',
        json_attributes_topic: 'teleinfo/123456789',
        value_template: '{{ value_json.PAPP.value }}',
        unit_of_measurement: 'VA',
        device: {
            identifiers: ['teleinfo-mqtt'],
            manufacturer: 'fmartinou',
            model: 'teleinfo-mqtt',
            name: 'Teleinfo-mqtt',
        },
    }), { retain: true });
});
