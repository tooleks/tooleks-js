"use strict";

/**
 * Determine if value is an undefined.
 *
 * @param {*} value
 * @return {boolean}
 */
function isUndefined(value) {
    return typeof value === "undefined";
}

module.exports = isUndefined;
