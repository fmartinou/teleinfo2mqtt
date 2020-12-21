module.exports = {
    logLevel: process.env.LOG_LEVEL || 'info',
    serial: process.env.SERIAL || '/dev/ttyUSB0',
    mqttUrl: process.env.MQTT_URL || 'mqtt://localhost:1883',
    mqttUser: process.env.MQTT_USER,
    mqttPassword: process.env.MQTT_PASSWORD,
    identifier: process.env.IDENTIFIER,
    discoveryPrefix: process.env.DISCOVERY_PREFIX || 'homeassistant',
};
