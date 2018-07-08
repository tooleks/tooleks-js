"use strict";

/**
 * Determine if value is an array.
 *
 * @param {*} value
 * @return {boolean}
 */
function isArray(value) {
    return Array.isArray(value) || value instanceof Array;
}

module.exports = isArray;
