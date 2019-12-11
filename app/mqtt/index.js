const mqtt = require('async-mqtt');
const log = require('../log');
const {
    mqttUrl,
    mqttTopic,
    mqttUser,
    mqttPassword,
} = require('../config');

let client;

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
    log.debug(`Publish frame to topic [${mqttTopic}]`);
    client.publish(mqttTopic, JSON.stringify(frame));
}

module.exports = {
    connect,
    disconnect,
    publishFrame,
};
