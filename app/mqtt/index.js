const mqtt = require('async-mqtt');
const log = require('../log');

const {
    mqttUrl,
    mqttUser,
    mqttPassword,
    hassIdentifier,
    hassDiscoveryPrefix,
} = require('../config');

// Topic for teleinfo frames
let frameTopic = 'teleinfo';
if (hassIdentifier) {
    frameTopic += `/${hassIdentifier}`;
}

// Topic for discovery (home-assistant)
const discoveryTopic = `${hassDiscoveryPrefix}/sensor/teleinfo/${hassIdentifier || 'default'}/config`;

// Unique id for home-assistant
let uniqueId = 'teleinfo';
if (hassIdentifier) {
    uniqueId += `_${hassIdentifier}`;
}

let client;

/**
 * Publish Configuration for home-assistant discovery.
 */
function publishConfigurationForDiscovery() {
    log.debug(`Publish configuration for discovery to topic [${discoveryTopic}]`);
    client.publish(discoveryTopic, JSON.stringify({
        unique_id: uniqueId,
        name: uniqueId,
        icon: 'mdi:speedometer',
        state_topic: frameTopic,
        json_attributes_topic: frameTopic,
        value_template: '{{ value_json.PAPP.value }}',
        unit_of_measurement: 'VA',
    }), {
        retain: true,
    });
}

/**
 * Connect to MQTT broker.
 */
async function connect() {
    const options = {};
    if (mqttUser) {
        options.username = mqttUser;
    }
    if (mqttPassword) {
        options.password = mqttPassword;
    }
    log.info(`Connecting to MQTT broker [${mqttUrl}]`);
    try {
        client = await mqtt.connectAsync(mqttUrl, options);
        log.info(`Connected to MQTT broker [${mqttUrl}]`);
    } catch (e) {
        log.error(`MQTT connection error [${e.message}]`);
        throw e;
    }
    try {
        if (client) {
            publishConfigurationForDiscovery();
            client.on('connect', () => {
                // Workaround to avoid reconnect issue (see https://github.com/mqttjs/MQTT.js/issues/1213)
                // eslint-disable-next-line no-underscore-dangle
                client._client.options.properties = {};
            });
            client.on('reconnect', () => {
                log.info('Reconnecting to the MQTT broker...');
            });
            client.on('error', (err) => {
                log.warn(`Error when publishing to the mqtt broker (${err.message})`);
            });
        }
    } catch (e) {
        log.error(`MQTT connection error [${e.message}]`);
        throw e;
    }
}

/**
 * Disconnect from MQTT broker.
 */
async function disconnect() {
    log.info(`Disconnecting from MQTT broker [${mqttUrl}]`);
    try {
        await client.end();
        log.info(`Disconnected from MQTT broker [${mqttUrl}]`);
    } catch (e) {
        log.error(`Error on disconnecting from MQTT broker [${mqttUrl}]`);
        throw e;
    }
}

/**
 * Publish teleinfo frame to MQTT broker.
 * @param {*} frame
 */
function publishFrame(frame) {
    log.debug(`Publish frame to topic [${frameTopic}]`);
    client.publish(frameTopic, JSON.stringify(frame));
}

module.exports = {
    connect,
    disconnect,
    publishFrame,
    publishConfigurationForDiscovery,
};
