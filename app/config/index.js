const fs = require('fs');

// Location of hass.io addon options file
const HASSIO_ADDON_OPTIONS_FILE = '/data/options.json';

// Configuration (default values)
const config = {
    emitInterval: 10,
    hassDiscovery: true,
    hassDiscoveryPrefix: 'homeassistant',
    logLevel: 'info',
    mqttBaseTopic: 'teleinfo',
    mqttUrl: 'mqtt://localhost:1883',
    mqttUser: undefined,
    mqttPassword: undefined,
    mqttTlsClientKey: undefined,
    mqttTlsClientCert: undefined,
    mqttTlsCaChain: undefined,
    mqttTlsRejectUnauthorized: true,
    serial: '/dev/ttyUSB0',
    tempoEnabled: false,
    tempoIntervalMinute: 5,
    ticMode: 'history',
};

/**
 * Override default configuration with object in arg.
 * @param overrideObject the object containing the overridden values
 */
function overrideConfiguration(overrideObject) {
    if (overrideObject.SERIAL) {
        config.serial = overrideObject.SERIAL;
    }
    if (overrideObject.EMIT_INTERVAL) {
        config.emitInterval = overrideObject.EMIT_INTERVAL;
    }
    if (overrideObject.HASS_DISCOVERY) {
        config.hassDiscovery = overrideObject.HASS_DISCOVERY.toLowerCase() === 'true';
    }
    if (overrideObject.HASS_DISCOVERY_PREFIX) {
        config.hassDiscoveryPrefix = overrideObject.HASS_DISCOVERY_PREFIX;
    }
    if (overrideObject.LOG_LEVEL) {
        config.logLevel = overrideObject.LOG_LEVEL;
    }
    if (overrideObject.MQTT_BASE_TOPIC) {
        config.mqttBaseTopic = overrideObject.MQTT_BASE_TOPIC;
    }
    if (overrideObject.MQTT_URL) {
        config.mqttUrl = overrideObject.MQTT_URL;
    }
    if (overrideObject.MQTT_USER && overrideObject.MQTT_USER !== '') {
        config.mqttUser = overrideObject.MQTT_USER;
    }
    if (overrideObject.MQTT_PASSWORD && overrideObject.MQTT_PASSWORD !== '') {
        config.mqttPassword = overrideObject.MQTT_PASSWORD;
    }
    if (overrideObject.MQTT_TLS_CLIENT_KEY) {
        config.mqttTlsClientKey = overrideObject.MQTT_TLS_CLIENT_KEY;
    }
    if (overrideObject.MQTT_TLS_CLIENT_CERT) {
        config.mqttTlsClientCert = overrideObject.MQTT_TLS_CLIENT_CERT;
    }
    if (overrideObject.MQTT_TLS_CA_CHAIN) {
        config.mqttTlsCaChain = overrideObject.MQTT_TLS_CA_CHAIN;
    }
    if (overrideObject.MQTT_TLS_REJECT_UNAUTHORIZED !== undefined) {
        config.mqttTlsRejectUnauthorized = overrideObject.MQTT_TLS_REJECT_UNAUTHORIZED.toLowerCase() === 'true';
    }
    if (overrideObject.TEMPO_ENABLED !== undefined) {
        config.tempoEnabled = overrideObject.TEMPO_ENABLED.toString().toLowerCase() === 'true';
    }
    if (overrideObject.TEMPO_INTERVAL_MINUTE) {
        config.tempoIntervalMinute = overrideObject.TEMPO_INTERVAL_MINUTE;
    }
    if (overrideObject.TIC_MODE) {
        config.ticMode = overrideObject.TIC_MODE;
    }
}

// 1. Load env var and override default values
overrideConfiguration(process.env);

// 2. Load options.json and override default values (only if hass.io addon environment)
if (process.env.HASSIO_ADDON && process.env.HASSIO_ADDON.toLowerCase() === 'true') {
    const optionsBuffer = fs.readFileSync(HASSIO_ADDON_OPTIONS_FILE, 'utf8');
    const options = JSON.parse(optionsBuffer);
    overrideConfiguration(options);
}

// 3. Export the resolved configuration
module.exports = config;
