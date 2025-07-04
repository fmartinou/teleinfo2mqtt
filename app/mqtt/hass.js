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
 * Get STGE attribute template.
 * @param label
 * @returns {string}
 */
function getSTGEAttributeTemplate(label) {
    return `{%- if '${label}' in value_json -%}
    {%- set stge = int(value_json.${label}.value, base=16) -%}
    {%- set tempo_today = (stge // (2**24)) | bitwise_and(3) -%}
    {%- set tempo_tomorrow = (stge // (2**26)) | bitwise_and(3) -%}
    {{ {
        'contact_sec': ("on" if (((stge // (2**0)) | bitwise_and(1)) == 0) else "off"),
        'organe_de_coupure': ((stge // (2**1)) | bitwise_and(0b111)) == 0,
        'etat_cache_borne_distributeur_closed': (stge | bitwise_and(0b10000)) == 0,
        'overvoltage': (stge | bitwise_and(0b1000000)) != 0,
        'overload': (stge | bitwise_and(0b10000000)) != 0,
        'consuming': (stge | bitwise_and(0b100000000)) == 0,
        'producing': (stge | bitwise_and(0b100000000)) != 0,
        'active_energy_positive': (stge | bitwise_and(0b1000000000)) == 0,
        'idx_tarif_fournisseur': stge | bitwise_and(0x00003C00)//(2**10),
        'idx_tarif_distributeur': stge | bitwise_and(0x0000C000)//(2**14),
        'clock_ok': (stge | bitwise_and(2**16)) == 0,
        'teleinfo_mode': "historique" if (( stge // (2**17)) | bitwise_and(1) == 0) else "standard",
        'euridis_com_enabled': (stge // (2**19)) | bitwise_and(1) == 1,
        'euridis_com_secured': (stge // (2**20)) | bitwise_and(1) == 1,
        'tempo_today': "bleu" if tempo_today == 0b01 else ("blanc" if tempo_today == 0b10 else ("rouge" if tempo_today == 0b11 else "inconnu")),
        'tempo_tomorrow': "bleu" if tempo_tomorrow == 0b01 else ("blanc" if tempo_tomorrow == 0b10 else ("rouge" if tempo_tomorrow == 0b11 else "inconnu"))
    } | tojson }}
    {%- endif -%}`;
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
        const discoveryMessage = {
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
        };
        if (label === 'STGE') {
            discoveryMessage.json_attributes_topic = stateTopic;
            discoveryMessage.json_attributes_template = getSTGEAttributeTemplate(label);
        }
        return client.publish(discoveryTopic, JSON.stringify(discoveryMessage), {
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
