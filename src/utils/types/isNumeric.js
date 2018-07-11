"use strict";

/**
 * Determine if value is a number or numeric string.
 *
 * @param {*} value
 * @return {boolean}
 */
function isNumeric(value) {
    return !isNaN(parseFloat(value)) && isFinite(value);
}

module.exports = isNumeric;
