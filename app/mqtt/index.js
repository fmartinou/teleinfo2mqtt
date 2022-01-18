const mqtt = require('async-mqtt');
const log = require('../log');

const {
    mqttUrl,
    mqttUser,
    mqttPassword,
    mqttBaseTopic,
    hassDiscovery,
    ticMode,
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
    if(ticMode === 'STANDARD')
    {
        return `${mqttBaseTopic}/${adsc}`;
    }
    
    return `${mqttBaseTopic}/${adco}`;
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
async function publishFrame(frame) 
{
    var id;
    if(ticMode === 'HISTORY')
    {
        id = frame.ADCO ? frame.ADCO.raw : undefined;
    }
    else if(ticMode === 'STANDARD')
    {
        id = frame.ADSC ? frame.ADSC.raw : undefined;
    }   
    
    if (!id) 
    {
        log.warn('Cannot publish a frame without ADCO or ADSC property');
        log.debug(frame);
    } 
    else 
    {
        if (hassDiscovery && !discoveryConfigurationPublished) 
        {
            try 
            {
                await publishConfigurationForHassDiscovery(client, id, frame);
                discoveryConfigurationPublished = true;
            } catch (e) {
                log.warn(`Unable to publish discovery configuration (${e.message})`);
            }
        }
        const frameTopic = getFrameTopic(id);
        log.debug(`Publish frame to topic [${frameTopic}]`);
        log.debug(frame);
        try 
        {
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
};
