"use strict";

/**
 * Determine if value is a boolean.
 *
 * @param {*} value
 * @return {boolean}
 */
function isBoolean(value) {
    return typeof value === "boolean" || value instanceof Boolean;
}

module.exports = isBoolean;