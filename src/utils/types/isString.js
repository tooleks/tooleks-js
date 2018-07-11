"use strict";

/**
 * Determine if value is a string.
 *
 * @param {*} value
 * @return {boolean}
 */
function isString(value) {
    return typeof value === "string" || value instanceof String;
}

module.exports = isString;
