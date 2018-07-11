"use strict";

/**
 * Determine if value is a number.
 *
 * @param {*} value
 * @return {boolean}
 */
function isNumber(value) {
    return typeof value === "number" || value instanceof Number;
}

module.exports = isNumber;
