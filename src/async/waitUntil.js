"use strict";

const {isFunction} = require("../utils");
const Defer = require("./Defer");

const DEFAULT_TIME_INTERVAL = 0;

/**
 * Assert "callback" parameter.
 *
 * @param {*} callback
 * @return {void}
 * @throws TypeError
 */
function assertCallbackParameter(callback) {
    if (!isFunction(callback)) {
        throw new TypeError("The \"callback\" parameter should be a function.");
    }
}

/**
 * Provide promise that will be resolved when callback will return truthy value.
 *
 * @param {function} callback
 * @param {number} {timeInterval=0}
 * @return {Promise<*>}
 */
function waitUntil(callback, timeInterval = DEFAULT_TIME_INTERVAL) {
    assertCallbackParameter(callback);
    const defer = new Defer();
    const intervalId = setInterval(() => {
        try {
            const result = callback();
            if (result) {
                clearInterval(intervalId);
                defer.resolve(result);
            }
        } catch (error) {
            defer.reject(error);
        }
    }, timeInterval);
    return defer.promisify();
}

module.exports = waitUntil;
