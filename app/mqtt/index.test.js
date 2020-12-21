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
    moduleToTest.publishFrame({ a: 'b' });
    expect(moduleToTest.__get__('client').publish).toHaveBeenCalledWith('teleinfo', JSON.stringify({ a: 'b' }));
});

test('publishConfigurationForDiscovery should be called as expected', () => {
    const moduleToTest = rewire('./index');
    moduleToTest.__set__('client', {
        publish: jest.fn(() => {}),
    });
    moduleToTest.publishConfigurationForDiscovery();
    expect(moduleToTest.__get__('client').publish).toHaveBeenCalledWith('homeassistant/sensor/teleinfo/default/config', JSON.stringify({
        unique_id: 'teleinfo',
        name: 'teleinfo',
        icon: 'mdi:speedometer',
        state_topic: 'teleinfo',
        json_attributes_topic: 'teleinfo',
        value_template: '{{ value_json.PAPP.value }}',
        unit_of_measurement: 'VA',
    }), { retain: true });
});
