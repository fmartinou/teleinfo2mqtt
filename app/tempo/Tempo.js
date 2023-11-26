const axios = require('axios');
const { EventEmitter } = require('events');
const deepEqual = require('deep-equal');
const log = require('../log');

// EDF public api endpoints
const DAY_COLOR_ENDPOINT = 'https://particulier.edf.fr/services/rest/referentiel/searchTempoStore';
const DAY_COLOR_REMAINING = 'https://particulier.edf.fr/services/rest/referentiel/getNbTempoDays?TypeAlerte=TEMPO';
const TEMPO_EVENT = 'tempo-change';

// EDF tempo total days
const BLUE_TOTAL_DAYS = 300;
const WHITE_TOTAL_DAYS = 43;
const RED_TOTAL_DAYS = 22;

/**
 * Service intended to fetch tempo data.
 */
class Tempo {
    /**
     * Constructor.
     * @param tempoIntervalMinute the polling frequency in minute
     */
    constructor({ tempoIntervalMinute }) {
        this.eventEmitter = new EventEmitter();
        this.tempoIntervalMinute = tempoIntervalMinute;
        this.scheduleId = undefined;
        this.data = {
            today: undefined,
            tomorrow: undefined,
        };

        // Graceful exit
        process.on('SIGTERM', () => this.stopSchedule());
        process.on('SIGINT', () => this.stopSchedule());
    }

    /**
     * Start scheduling tempo api.
     */
    async startSchedule() {
        log.info('Start polling tempo data');
        this.scheduleId = setInterval(
            async () => this.onSchedule(),
            this.tempoIntervalMinute * 60000,
        );

        // Run at startup
        await this.onSchedule();
    }

    /**
     * Stop scheduling tempo api.
     */
    stopSchedule() {
        log.info('Stop polling tempo data');
        if (this.scheduleId) {
            clearInterval(this.scheduleId);
        }
    }

    /**
     * Schedule handler.
     * @returns {Promise<void>}
     */
    async onSchedule() {
        try {
            const lastData = await Tempo.fetch();
            // Emit only when tempo data has changed (once a day).
            if (!deepEqual(this.data, lastData)) {
                this.data = lastData;
                log.info(`Tempo data changed (${JSON.stringify(this.data)})`);
                this.emitChange(this.data);
            }
        } catch (e) {
            log.error(`Error when fetching tempo data (${e.message})`);
        }
    }

    /**
     * Fetch data using EDF open api.
     * @returns tempo data
     */
    static async fetch() {
        return {
            ...await Tempo.getDayColor(),
            ...await Tempo.getDayColorRemaining(),
        };
    }

    /**
     * Get day color using edf api.
     * @returns {Promise<{today: string, tomorrow: string}>}
     */
    static async getDayColor() {
        const dayColorResponse = await axios.get(DAY_COLOR_ENDPOINT, {
            params: {
                dateRelevant: new Date().toISOString().split('T')[0],
            },
        });
        if (dayColorResponse.status === 200) {
            return {
                today: Tempo.formatDayColor(dayColorResponse.data.couleurJourJ),
                tomorrow: Tempo.formatDayColor(dayColorResponse.data.couleurJourJ1),
            };
        }
        throw new Error(`Error on getDayColor api call (${dayColorResponse.status})`);
    }

    /**
     * Get the number of remaing days (blue, white, red).
     * @returns {Promise}
     */
    static async getDayColorRemaining() {
        const dayColorRemainingResponse = await axios.get(DAY_COLOR_REMAINING);
        if (dayColorRemainingResponse.status === 200) {
            return {
                blue_total: BLUE_TOTAL_DAYS,
                blue_elapsed: BLUE_TOTAL_DAYS - dayColorRemainingResponse.data.PARAM_NB_J_BLEU,
                blue_remaining: dayColorRemainingResponse.data.PARAM_NB_J_BLEU,
                white_total: WHITE_TOTAL_DAYS,
                white_elapsed: WHITE_TOTAL_DAYS - dayColorRemainingResponse.data.PARAM_NB_J_BLANC,
                white_remaining: dayColorRemainingResponse.data.PARAM_NB_J_BLANC,
                red_remaining: dayColorRemainingResponse.data.PARAM_NB_J_ROUGE,
                red_total: RED_TOTAL_DAYS,
                red_elapsed: RED_TOTAL_DAYS - dayColorRemainingResponse.data.PARAM_NB_J_ROUGE,
            };
        }
        throw new Error(`Error on getDayColorRemaining api call (${dayColorRemainingResponse.status})`);
    }

    /**
     * Emit tempo event.
     */
    emitChange() {
        this.eventEmitter.emit(TEMPO_EVENT, this.data);
    }

    /**
     * Register on-data handler.
     * @param handler
     */
    onChange(handler) {
        this.eventEmitter.on(TEMPO_EVENT, () => handler(this.data));
    }

    /**
     * Format the dayColor returned by edf.
     * @param dayColor the dayColor
     * @returns {string} the dayColor formatted
     */
    static formatDayColor(dayColor) {
        switch (dayColor.replace(/TEMPO_/g, '')) {
        case 'BLEU': return 'blue';
        case 'BLANC': return 'white';
        case 'ROUGE': return 'red';
        default: return 'unknown';
        }
    }
}

module.exports = Tempo;
