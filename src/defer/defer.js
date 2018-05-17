"use strict";

/**
 * Defer class.
 */
class Defer {

    /**
     * Defer constructor.
     */
    constructor() {
        this._promise = new Promise((resolve, reject) => {
            this.resolve = resolve;
            this.reject = reject;
        });
    }

    /**
     * Get a promise which will be resolved or rejected with a deferred value.
     *
     * @return {Promise<any>}
     */
    promisify() {
        return this._promise;
    }
}

module.exports = Defer;
