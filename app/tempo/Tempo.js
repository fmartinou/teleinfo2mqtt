const axios = require('axios');
const { EventEmitter } = require('events');
const deepEqual = require('deep-equal');
const log = require('../log');

const API_ENDPOINT = 'https://www.api-couleur-tempo.fr/api';

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
            ...await Tempo.getToday(),
            ...await Tempo.getTomorrow(),
            // Disabled for now; waiting for a replacement solution
            // ...await Tempo.getDayColorRemaining(),
        };
    }

    /**
     * Get today color.
     * @returns {Promise<{today: string}>}
     */
    static async getToday() {
        const response = await axios.get(`${API_ENDPOINT}/jourTempo/today`);
        if (response.status === 200) {
            return {
                today: Tempo.formatDayColorCode(response.data.codeJour),
            };
        }
        throw new Error(`Error on jourTempo/today api call (${response.status})`);
    }

    /**
     * Get tomorrow color.
     * @returns {Promise<{tomorrow: string}>}
     */
    static async getTomorrow() {
        const response = await axios.get(`${API_ENDPOINT}/jourTempo/tomorrow`);
        if (response.status === 200) {
            return {
                tomorrow: Tempo.formatDayColorCode(response.data.codeJour),
            };
        }
        throw new Error(`Error on jourTempo/tomorrow api call (${response.status})`);
    }

    /**
     * Get the number of remaing days (blue, white, red).
     * @returns {Promise}
     */
    static async getDayColorRemaining() {
        const dayColorRemainingResponse = await axios.get(`${API_ENDPOINT}/joursTempo`);
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
     * @param dayColorCode the dayColorCode
     * @returns {string} the dayColor formatted
     */
    static formatDayColorCode(dayColorCode) {
        switch (dayColorCode) {
        case 1: return 'blue';
        case 2: return 'white';
        case 3: return 'red';
        default: return 'unknown';
        }
    }
}

module.exports = Tempo;
