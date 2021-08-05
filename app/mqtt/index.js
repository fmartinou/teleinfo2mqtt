const mqtt = require('async-mqtt');
const log = require('../log');

const {
    mqttUrl,
    mqttUser,
    mqttPassword,
    mqttBaseTopic,
    hassDiscoveryPrefix,
} = require('../config');

const hassDeviceId = 'teleinfo-mqtt';
const hassDeviceName = 'Teleinfo-mqtt';
const hassManufacturer = 'Fmartinou';
const hassEntityIcon = 'mdi:speedometer';
const hassEntityValueTemplate = '{{ value_json.PAPP.value }}';

/**
 * True when hass discovery configuration has been published.
 * @type {boolean}
 */
let discoveryConfigurationPublished = false;

/**
 * MQT Client.
 */
let client;

/**
 * Get frame topic.
 * @param adco
 * @returns {string}
 */
function getFrameTopic(adco) {
    return `${mqttBaseTopic}/${adco}`;
}

/**
 * Publish Configuration for home-assistant discovery.
 * @param adco
 */
async function publishConfigurationForDiscovery(adco) {
    const discoveryTopic = `${hassDiscoveryPrefix}/sensor/${mqttBaseTopic}/${adco}/config`;

    log.debug(`Publish configuration for discovery to topic [${discoveryTopic}]`);
    try {
        await client.publish(discoveryTopic, JSON.stringify({
            unique_id: `teleinfo_${adco}`,
            name: `Teleinfo ${adco}`,
            icon: hassEntityIcon,
            state_topic: getFrameTopic(adco),
            json_attributes_topic: getFrameTopic(adco),
            value_template: hassEntityValueTemplate,
            unit_of_measurement: 'VA',
            device: {
                identifiers: [hassDeviceId],
                manufacturer: hassManufacturer,
                model: hassDeviceId,
                name: hassDeviceName,
            },
        }), {
            retain: true,
        });
        discoveryConfigurationPublished = true;
    } catch (e) {
        log.warn(`Unable to publish discovery configuration to ${discoveryTopic} (${e.message})`);
    }
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
async function publishFrame(frame) {
    const adco = frame.ADCO ? frame.ADCO.raw : undefined;
    if (!adco) {
        log.warn('Cannot publish a frame without ADCO property');
        log.debug(frame);
    } else {
        if (!discoveryConfigurationPublished) {
            await publishConfigurationForDiscovery(adco);
        }
        const frameTopic = getFrameTopic(adco);
        log.debug(`Publish frame to topic [${frameTopic}]`);
        log.debug(frame);
        try {
            await client.publish(frameTopic, JSON.stringify(frame));
        } catch (e) {
            log.warn(`Unable to publish frame to ${frameTopic} (${e.message})`);
        }
    }
}

module.exports = {
    connect,
    disconnect,
    publishFrame,
    publishConfigurationForDiscovery,
};
