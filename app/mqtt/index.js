const mqtt = require('mqtt');
const { mqttUrl, mqttTopic } = require('../config');
const log = require('../log');

let client;

async function connect() {
    return new Promise((resolve, reject) => {
        log.info(`Connecting to MQTT broker [${mqttUrl}]`);
        client = mqtt.connect(mqttUrl);

        client.on('connect', () => {
            log.info(`Connected to MQTT broker [${mqttUrl}]`);
            resolve();
        });

        client.on('error', (e) => {
            log.info('MQTT connection error');
            reject(e);
        });
    });
}

async function disconnect() {
    return new Promise((resolve, reject) => {
        log.info(`Disconnecting from MQTT broker [${mqttUrl}]`);
        client.end((e) => {
            if (e) {
                log.info(`Error on disconnecting from MQTT broker [${mqttUrl}]`);
                reject(e);
            } else {
                log.info(`Disconnected from MQTT broker [${mqttUrl}]`);
                resolve();
            }
        });
    });
}

function publishFrame(frame) {
    log.debug(`Publish frame to topic [${mqttTopic}]`);
    client.publish(mqttTopic, JSON.stringify(frame));
}

module.exports = {
    connect,
    disconnect,
    publishFrame,
};
