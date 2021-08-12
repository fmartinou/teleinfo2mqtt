/**
 * Home Assistant related stuff.
 */
const log = require('../log');

const {
    mqttBaseTopic,
    hassDiscoveryPrefix,
} = require('../config');

/**
 * Get frame topic.
 * @param adco
 * @returns {string}
 */
function getFrameTopic(adco) {
    return `${mqttBaseTopic}/${adco}`;
}

/**
 * Get hass device class.
 * @param tag
 * @returns {string}
 */
function getDeviceClass(tag) {
    let deviceClass;
    switch (tag) {
    case 'ADPS':
    case 'IINST':
    case 'IMAX':
    case 'ISOUSC':
        deviceClass = 'current';
        break;

    case 'BASE':
    case 'BBRHCJB':
    case 'BBRHCJR':
    case 'BBRHCJW':
    case 'BBRHPJB':
    case 'BBRHPJR':
    case 'BBRHPJW':
    case 'EJPHN':
    case 'EJPHPM':
    case 'HCHC':
    case 'HCHP':
        deviceClass = 'energy';
        break;

    case 'PAPP':
        deviceClass = 'power';
        break;

    default:
        deviceClass = undefined;
    }
    return deviceClass;
}

/**
 * Get hass state class.
 * @param tag
 * @returns {string}
 */
function getStateClass(tag) {
    let stateClass;
    switch (tag) {
    case 'BASE':
    case 'BBRHCJB':
    case 'BBRHCJR':
    case 'BBRHCJW':
    case 'BBRHPJB':
    case 'BBRHPJR':
    case 'BBRHPJW':
    case 'EJPHN':
    case 'EJPHPM':
    case 'HCHC':
    case 'HCHP':
        stateClass = 'measurement';
        break;
    default:
        stateClass = undefined;
    }
    return stateClass;
}

/**
 * Get hass last reset topic.
 * @param tag
 * @param stateTopic
 * @returns {undefined}
 */
function getLastResetTopic(tag, stateTopic) {
    let lastResetTopic;
    switch (tag) {
    case 'BASE':
    case 'BBRHCJB':
    case 'BBRHCJR':
    case 'BBRHCJW':
    case 'BBRHPJB':
    case 'BBRHPJR':
    case 'BBRHPJW':
    case 'EJPHN':
    case 'EJPHPM':
    case 'HCHC':
    case 'HCHP':
        lastResetTopic = stateTopic;
        break;
    default:
        lastResetTopic = undefined;
    }
    return lastResetTopic;
}

/**
 * Get hass last reset value tempalte.
 * @param tag
 * @returns {string}
 */
function getLastResetValueTemplate(tag) {
    let resetValueTemplate;
    switch (tag) {
    case 'BASE':
    case 'BBRHCJB':
    case 'BBRHCJR':
    case 'BBRHCJW':
    case 'BBRHPJB':
    case 'BBRHPJR':
    case 'BBRHPJW':
    case 'EJPHN':
    case 'EJPHPM':
    case 'HCHC':
    case 'HCHP':
        // Indices never reset
        resetValueTemplate = '1970-01-01T00:00:00+00:00';
        break;
    default:
        resetValueTemplate = undefined;
    }
    return resetValueTemplate;
}

/**
 * Get hass sensor unit.
 * @param tag
 * @returns {string}
 */
function getUnit(tag) {
    let unit;
    switch (tag) {
    case 'ADPS':
    case 'IINST':
    case 'IMAX':
    case 'ISOUSC':
        unit = 'A';
        break;

    case 'BASE':
    case 'BBRHCJB':
    case 'BBRHCJR':
    case 'BBRHCJW':
    case 'BBRHPJB':
    case 'BBRHPJR':
    case 'BBRHPJW':
    case 'EJPHN':
    case 'EJPHPM':
    case 'HCHC':
    case 'HCHP':
        unit = 'Wh';
        break;

    case 'PAPP':
        unit = 'VA';
        break;

    case 'PEJP':
        unit = 'min';
        break;

    default:
        unit = undefined;
    }
    return unit;
}

/**
 * Get hass value template.
 * @param tag
 * @returns {string}
 */
function getValueTemplate(tag) {
    let valueTemplate;
    switch (tag) {
    case 'ADCO':
        valueTemplate = `{{ value_json.${tag}.raw }}`;
        break;
    default:
        valueTemplate = `{{ value_json.${tag}.value }}`;
    }
    return valueTemplate;
}

/**
 * Publish Configuration for home-assistant discovery.
 * @param client
 * @param adco
 * @param frame
 */
async function publishConfigurationForHassDiscovery(client, adco, frame) {
    const promises = Object.keys(frame).map(async (tag) => {
        const discoveryTopic = `${hassDiscoveryPrefix}/sensor/${mqttBaseTopic}/${adco}_${tag.toLowerCase()}/config`;
        log.info(`Publish configuration for tag ${tag} for discovery to topic [${discoveryTopic}]`);
        const stateTopic = getFrameTopic(adco);
        return client.publish(discoveryTopic, JSON.stringify({
            unique_id: `teleinfo_${adco}_${tag}`,
            name: `Teleinfo ${adco} ${tag}`,
            state_topic: stateTopic,
            state_class: getStateClass(tag),
            device_class: getDeviceClass(tag),
            last_reset_topic: getLastResetTopic(tag, stateTopic),
            last_reset_value_template: getLastResetValueTemplate(tag),
            value_template: getValueTemplate(tag),
            unit_of_measurement: getUnit(tag),
            device: {
                identifiers: [adco],
                manufacturer: 'Enedis',
                model: `linky_${adco}`,
                name: `Linky ${adco}`,
            },
        }), {
            retain: true,
        });
    });
    return Promise.all(promises);
}

module.exports = {
    publishConfigurationForHassDiscovery,
};
