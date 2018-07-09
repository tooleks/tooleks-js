"use strict";

const DEFAULT_TIMEOUT = 0;

/**
 * Provide promise that will be resolved after timeout.
 *
 * @param {number} [timeout=0]
 * @return {Promise}
 */
function timeout(timeout = DEFAULT_TIMEOUT) {
    return new Promise((resolve) => setTimeout(resolve, timeout));
}

module.exports = timeout;
