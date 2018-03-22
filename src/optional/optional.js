"use strict";

/**
 * Retrieve the result of callback call. If an error occurred return a default value instead.
 *
 * @param {Function} callback
 * @param {*} defaultValue
 * @return {*}
 */
function optional(callback, defaultValue = undefined) {
    try {
        return callback();
    } catch (error) {
        return defaultValue;
    }
}

module.exports = optional;
