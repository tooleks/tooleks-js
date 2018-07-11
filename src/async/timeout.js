"use strict";

const Defer = require("./Defer");

const DEFAULT_TIME_INTERVAL = 0;

/**
 * Provide promise that will be resolved after time interval.
 *
 * @param {number} [timeInterval=0]
 * @return {Promise<*>}
 */
function timeout(timeInterval = DEFAULT_TIME_INTERVAL) {
    const defer = new Defer();
    setTimeout(() => defer.resolve(), timeInterval);
    return defer.promisify();
}

module.exports = timeout;
