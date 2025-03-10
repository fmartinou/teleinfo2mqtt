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
 * @param id
 * @returns {string}
 */
function getFrameTopic(id) {
    return `${mqttBaseTopic}/${id}`;
}

/**
 * Get hass value template.
 * @param label
 * @param idLabel
 * @returns {string}
 */
function getValueTemplate({ label, idLabel }) {
    const valueProperty = label === idLabel ? 'raw' : 'value';
    return `{% if '${label}' in value_json %}{{ value_json.${label}.${valueProperty} }}{% endif %}`;
}

/**
 * Publish Configuration for home-assistant discovery.
 * @param client
 * @param id
 * @param teleinfoService
 */
async function publishConfigurationForHassDiscovery({
    client, id, teleinfoService,
}) {
    const promises = teleinfoService.getLabels().map(async (label) => {
        const labelSanitized = label.replace(/-/g, '_minus_').replace(/\+/g, '_plus_').toLowerCase();
        const discoveryTopic = `${hassDiscoveryPrefix}/sensor/${mqttBaseTopic}/${id}_${labelSanitized}/config`;
        log.info(`Publish configuration for tag ${label} for discovery to topic [${discoveryTopic}]`);
        const stateTopic = getFrameTopic(id);
        return client.publish(discoveryTopic, JSON.stringify({
            unique_id: label,
            name: label,
            state_topic: stateTopic,
            state_class: teleinfoService.getHAStateClass(label),
            device_class: teleinfoService.getHADeviceClass(label),
            value_template: getValueTemplate({ label, idLabel: teleinfoService.getIdLabel() }),
            unit_of_measurement: teleinfoService.getHAUnit(label),
            device: {
                identifiers: [id],
                manufacturer: 'Enedis',
                model: `teleinfo_${id}`,
                name: `Teleinfo ${id}`,
            },
        }), {
            retain: true,
        });
    });
    return Promise.all(promises);
}

async function publishTempoConfigurationForHassDiscovery({ client, tempoData }) {
    const promises = Object.keys(tempoData).map(async (label) => {
        const discoveryTopic = `${hassDiscoveryPrefix}/sensor/${mqttBaseTopic}/tempo_${label.toLowerCase()}/config`;
        log.info(`Publish configuration for tempo data ${label} for discovery to topic [${discoveryTopic}]`);
        const stateTopic = getFrameTopic('tempo');
        return client.publish(discoveryTopic, JSON.stringify({
            unique_id: label,
            name: label,
            state_topic: stateTopic,
            value_template: `{{ value_json.${label} }}`,
            device: {
                identifiers: ['tempo'],
                manufacturer: 'EDF',
                model: 'Tempo',
                name: 'Teleinfo Tempo',
            },
        }), {
            retain: true,
        });
    });
    return Promise.all(promises);
}

module.exports = {
    publishConfigurationForHassDiscovery,
    publishTempoConfigurationForHassDiscovery,
};
