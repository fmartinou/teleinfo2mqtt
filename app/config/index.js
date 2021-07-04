module.exports = {
    emitInterval: process.env.EMIT_INTERVAL || 10,
    hassDiscoveryPrefix: process.env.HASS_DISCOVERY_PREFIX || 'homeassistant',
    hassIdentifier: process.env.HASS_IDENTIFIER,
    logLevel: process.env.LOG_LEVEL || 'info',
    mqttUrl: process.env.MQTT_URL || 'mqtt://localhost:1883',
    mqttUser: process.env.MQTT_USER,
    mqttPassword: process.env.MQTT_PASSWORD,
    serial: process.env.SERIAL || '/dev/ttyUSB0',
};
