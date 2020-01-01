const teleinfo = require('./teleinfo');
const mqtt = require('./mqtt');
const log = require('./log');

async function disconnect() {
    await teleinfo.disconnect();
    await mqtt.disconnect();
}

async function run() {
    log.info('Starting teleinfo-mqtt');
    try {
        // Connect to MQTT
        await mqtt.connect();

        // Connect to serial port
        const teleinfoEventEmitter = await teleinfo.connect();

        // Register to frame events and publish to mqtt
        teleinfoEventEmitter.on('frame', (frame) => {
            mqtt.publishFrame(frame);
        });

        // Graceful exit
        process.on('SIGTERM', disconnect);
        process.on('SIGINT', disconnect);
    } catch (e) {
        log.error('Unable to run => See errors below');
        log.error(e);
        process.exit(1);
    }
}

run();
