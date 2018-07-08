"use strict";

/**
 * Determine if value is a function.
 *
 * @param {*} value
 * @param {boolean} value
 * @return {boolean}
 */
function isFunction(value) {
    return typeof value === "function";
}

module.exports = isFunction;
