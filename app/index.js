const config = require('./config');
const teleinfo = require('./teleinfo');
const Tempo = require('./tempo/Tempo');
const mqtt = require('./mqtt');
const log = require('./log');

/**
 * Main function.
 * @return {Promise<void>}
 */
async function run() {
    const configHidden = { ...config, mqttPassword: '<hidden>' };
    log.info('Starting teleinfo2mqtt with configuration =', configHidden);

    try {
        // Connect to the serial port
        const teleinfoService = await teleinfo.connect({ ticMode: config.ticMode });

        // Init tempo service if enabled
        let tempoService;
        if (config.tempoEnabled) {
            tempoService = new Tempo({
                tempoIntervalMinute: config.tempoIntervalMinute,
            });
        }

        // Connect to the MQTT broker
        await mqtt.connect({ teleinfoService, tempoService });
    } catch (e) {
        log.error('Unable to run => See errors below');
        log.error(e);
        process.exit(1);
    }
}

// Launch the app.
run();
