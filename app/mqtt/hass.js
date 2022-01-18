/**
 * Home Assistant related stuff.
 */
const log = require('../log');

const {
    mqttBaseTopic,
    hassDiscoveryPrefix,
	ticMode,
} = require('../config');

/**
 * Get frame topic.
 * @param id
 * @returns {string}
 */
function getFrameTopic(id) 
{
	return `${mqttBaseTopic}/${id}`;
}

/**
 * Get hass device class.
 * @param tag
 * @returns {string}
 */
function getDeviceClass(tag) 
{
    let deviceClass;
	if(ticMode === 'HISTORY')
	{
		switch (tag) 
		{
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
	}
	else if(ticMode === 'STANDARD')
	{
		switch (tag) 
		{
		case 'IRMS1':
		case 'IRMS2':
		case 'IRMS3':
			deviceClass = 'current';
			break;

		case 'EAST':
		case 'EASF01':
		case 'EASF02':
		case 'EASF03':
		case 'EASF04':
		case 'EASF05':
		case 'EASF06':
		case 'EASF07':
		case 'EASF08':
		case 'EASF09':
		case 'EASF10':
		case 'EASD01':
		case 'EASD02':
		case 'EASD03':
		case 'EASD04':
		case 'EAIT':
			deviceClass = 'energy';
			break;
		
		case 'URMS1':
		case 'URMS2':
		case 'URMS3':	
		case 'UMOY1':
		case 'UMOY2':
		case 'UMOY3':			
			deviceClass = 'voltage';
			break;
			
		case 'PREF':
		case 'PCOUP':
		case 'SINSTS':
		case 'SINSTS1':
		case 'SINSTS2':
		case 'SINSTS3':
		case 'SMAXSN':
		case 'SMAXSN1':
		case 'SMAXSN2':
		case 'SMAXSN3':
		case 'SMAXSN-1':
		case 'SMAXSN1-1':
		case 'SMAXSN2-1':
		case 'SMAXSN3-1':
		case 'SINSTI':
		case 'SMAXIN':	
		case 'SMAXIN-1':
		case 'CCASN':
		case 'CCASN-1':
		case 'CCAIN':
		case 'CCAIN-1':
		case 'ERQ1':
		case 'ERQ2':
		case 'ERQ3':
		case 'ERQ4':
			deviceClass = 'power';
			break;

		default:
			deviceClass = undefined;
		}
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
	if(ticMode === 'HISTORY')
	{
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
			stateClass = 'total_increasing';
			break;
		default:
			stateClass = undefined;
		}
	else if(ticMode === 'STANDARD')
	{
		switch (tag) 
		{
		case 'EAST':
		case 'EASF01':
		case 'EASF02':
		case 'EASF03':
		case 'EASF04':
		case 'EASF05':
		case 'EASF06':
		case 'EASF07':
		case 'EASF08':
		case 'EASF09':
		case 'EASF10':
		case 'EASD01':
		case 'EASD02':
		case 'EASD03':
		case 'EASD04':
		case 'EAIT':
			stateClass = 'total_increasing';
			break;
		default:
			stateClass = undefined;
		}
	}
    return stateClass;
}

/**
 * Get hass sensor unit.
 * @param tag
 * @returns {string}
 */
function getUnit(tag) {
    let unit;
	if(ticMode === 'HISTORY')
	{
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
    }
	else if(ticMode === 'STANDARD')
	{
		switch (tag) 
		{
		case 'IRMS1':
		case 'IRMS2':
		case 'IRMS3':
			unit = 'A';
			break;

		case 'EAST':
		case 'EASF01':
		case 'EASF02':
		case 'EASF03':
		case 'EASF04':
		case 'EASF05':
		case 'EASF06':
		case 'EASF07':
		case 'EASF08':
		case 'EASF09':
		case 'EASF10':
		case 'EASD01':
		case 'EASD02':
		case 'EASD03':
		case 'EASD04':
		case 'EAIT':
			unit = 'Wh';
			break;
		
		case 'URMS1':
		case 'URMS2':
		case 'URMS3':	
		case 'UMOY1':
		case 'UMOY2':
		case 'UMOY3':			
			unit = 'V';
			break;
			
		case 'PREF':
		case 'PCOUP':
			unit = 'kVA';
			
		case 'SINSTS':
		case 'SINSTS1':
		case 'SINSTS2':
		case 'SINSTS3':
		case 'SMAXSN':
		case 'SMAXSN1':
		case 'SMAXSN2':
		case 'SMAXSN3':
		case 'SMAXSN-1':
		case 'SMAXSN1-1':
		case 'SMAXSN2-1':
		case 'SMAXSN3-1':
		case 'SINSTI':
		case 'SMAXIN':	
		case 'SMAXIN-1':
			unit = 'VA';
			
		case 'CCASN':
		case 'CCASN-1':
		case 'CCAIN':
		case 'CCAIN-1':
			unit = 'W';
			
		case 'ERQ1':
		case 'ERQ2':
		case 'ERQ3':
		case 'ERQ4':
			unit = 'VArh';
			break;

		default:
			deviceClass = undefined;
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
	case 'ADSC':
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
 * @param id
 * @param frame
 */
async function publishConfigurationForHassDiscovery(client, id, frame) {
    const promises = Object.keys(frame).map(async (tag) => {
        const discoveryTopic = `${hassDiscoveryPrefix}/sensor/${mqttBaseTopic}/${id}_${tag.toLowerCase()}/config`;
        log.info(`Publish configuration for tag ${tag} for discovery to topic [${discoveryTopic}]`);
        const stateTopic = getFrameTopic(id);
        return client.publish(discoveryTopic, JSON.stringify({
            unique_id: `teleinfo_${id}_${tag}`,
            name: `Teleinfo ${id} ${tag}`,
            state_topic: stateTopic,
            state_class: getStateClass(tag),
            device_class: getDeviceClass(tag),
            value_template: getValueTemplate(tag),
            unit_of_measurement: getUnit(tag),
            device: {
                identifiers: [id],
                manufacturer: 'Enedis',
                model: `linky_${id}`,
                name: `Linky ${id}`,
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
