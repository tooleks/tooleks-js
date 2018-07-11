"use strict";

const {isUndefined} = require("./types");

/**
 * Retrieve the result of callback call. If an error occurred or result is undefined return a default value instead.
 *
 * @param {Function} callback
 * @param {*} defaultValue
 * @return {*}
 */
function optional(callback, defaultValue = undefined) {
    try {
        const value = callback();
        if (!isUndefined(value)) {
            return value;
        }
        return defaultValue;
    } catch (error) {
        return defaultValue;
    }
}

module.exports = optional;
