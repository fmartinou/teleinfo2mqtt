const fs = require('fs');
const mqtt = require('async-mqtt');
const log = require('../log');

const {
    mqttUrl,
    mqttUser,
    mqttPassword,
    mqttBaseTopic,
    mqttTlsClientKey,
    mqttTlsClientCert,
    mqttTlsCaChain,
    mqttTlsRejectUnauthorized,
    hassDiscovery,

} = require('../config');

const { publishConfigurationForHassDiscovery } = require('./hass');

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
 * @param id
 * @returns {string}
 */
function getFrameTopic(id) {
    return `${mqttBaseTopic}/${id}`;
}

/**
 * Disconnect from MQTT broker.
 */
async function disconnect(force = false) {
    if (client) {
        log.info(`Disconnecting from MQTT broker [${mqttUrl}]`);
        try {
            await client.end(force);
            log.info(`Disconnected from MQTT broker [${mqttUrl}]`);
        } catch (e) {
            log.error(`Error on disconnecting from MQTT broker [${mqttUrl}]`);
            throw e;
        }
    }
}

/**
 * Publish teleinfo frame to MQTT broker.
 * @param frame
 * @param teleinfoService
 */
async function publishFrame({ frame, teleinfoService }) {
    const idLabel = teleinfoService.getIdLabel(frame);
    const id = frame[idLabel] ? frame[idLabel].raw : undefined;

    if (!id) {
        log.warn('Cannot publish a frame without unique id property');
        log.debug(frame);
    } else {
        if (hassDiscovery && !discoveryConfigurationPublished) {
            try {
                await publishConfigurationForHassDiscovery({
                    client,
                    id,
                    frame,
                    teleinfoService,
                });
                discoveryConfigurationPublished = true;
            } catch (e) {
                log.warn(`Unable to publish discovery configuration (${e.message})`);
            }
        }
        const frameTopic = getFrameTopic(id);
        log.debug(`Publish frame to topic [${frameTopic}]`);
        log.debug(frame);
        try {
            await client.publish(frameTopic, JSON.stringify(frame));
        } catch (e) {
            log.warn(`Unable to publish frame to ${frameTopic} (${e.message})`);
        }
    }
}

/**
 * Connect to MQTT broker.
 * @param teleinfoService
 * @return {Promise<>}
 */
async function connect({ teleinfoService }) {
    const options = {};
    if (mqttUser) {
        options.username = mqttUser;
    }
    if (mqttPassword) {
        options.password = mqttPassword;
    }
    if (mqttTlsClientKey) {
        options.key = fs.readFileSync(mqttTlsClientKey);
    }
    if (mqttTlsClientCert) {
        options.cert = fs.readFileSync(mqttTlsClientCert);
    }
    if (mqttTlsCaChain) {
        options.ca = [fs.readFileSync(mqttTlsCaChain)];
    }
    if (mqttTlsRejectUnauthorized !== '') {
        options.rejectUnauthorized = mqttTlsRejectUnauthorized;
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
        process.on('SIGTERM', () => disconnect());
        process.on('SIGINT', () => disconnect(true));

        // Register to frame events and publish frame details to the mqtt broker
        if (teleinfoService) {
            teleinfoService.onFrame((frame) => { publishFrame({ frame, teleinfoService }); });
        }

        return client;
    } catch (e) {
        log.error(`MQTT connection error [${e.message}]`);
        throw e;
    }
}

module.exports = {
    connect,
    publishFrame,
};
