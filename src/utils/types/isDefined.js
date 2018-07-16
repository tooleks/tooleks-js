"use strict";

const isUndefined = require("./isUndefined");

/**
 * Determine if value is not undefined.
 *
 * @param {*} value
 * @return {boolean}
 */
function isDefined(value) {
    return !isUndefined(value);
}

module.exports = isDefined;
