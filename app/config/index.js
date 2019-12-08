module.exports = {
    logLevel: process.env.LOG_LEVEL || 'info',
    serial: process.env.SERIAL || '/dev/ttyUSB0',
    mqttUrl: process.env.MQTT_URL || 'mqtt://localhost:1883',
    mqttTopic: process.env.MQTT_TOPIC || '/teleinfo',
};
