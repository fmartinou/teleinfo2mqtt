const bunyan = require('bunyan');
const config = require('../config');

const log = bunyan.createLogger({
    name: 'teleinfo2mqtt',
    level: config.logLevel,
});

module.exports = log;
