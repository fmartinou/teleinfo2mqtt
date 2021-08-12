module.exports = {
    emitInterval: process.env.EMIT_INTERVAL || 10,
    hassDiscovery: process.env.HASS_DISCOVERY ? process.env.HASS_DISCOVERY.toLowerCase() === 'true' : true,
    hassDiscoveryPrefix: process.env.HASS_DISCOVERY_PREFIX || 'homeassistant',
    logLevel: process.env.LOG_LEVEL || 'info',
    mqttBaseTopic: process.env.MQTT_BASE_TOPIC || 'teleinfo',
    mqttUrl: process.env.MQTT_URL || 'mqtt://localhost:1883',
    mqttUser: process.env.MQTT_USER,
    mqttPassword: process.env.MQTT_PASSWORD,
    serial: process.env.SERIAL || '/dev/ttyUSB0',
};
