"use strict";

/**
 * Determine if value is an object and not null.
 *
 * @param {*} value
 * @param {boolean} value
 * @return {boolean}
 */
function isObject(value) {
    return typeof value === "object" && value !== null;
}

module.exports = isObject;
