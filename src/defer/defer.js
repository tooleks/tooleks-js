"use strict";

/**
 * Defer class.
 */
class Defer {

    /**
     * Defer constructor.
     */
    constructor() {
        this._resolved = false;
        this._rejected = false;
        this._resolveListeners = [];
        this._rejectListeners = [];
    }

    /**
     * Call a callback function with a deferred value.
     *
     * @param callback
     * @return {void}
     * @private
     */
    _callCallback(callback) {
        if (typeof callback === "function") {
            callback(this._defferedValue);
        }
    }

    /**
     * Determine if a defer is resolved.
     *
     * @return {Boolean}
     * @private
     */
    _isResolved() {
        return this._resolved;
    }

    /**
     * Determine if a defer is rejected.
     *
     * @return {Boolean}
     * @private
     */
    _isRejected() {
        return this._rejected;
    }

    /**
     * Determine if a defer is resolved or rejected.
     *
     * @return {Boolean}
     * @private
     */
    _isResolvedOrRejected() {
        return this._isResolved() || this._isRejected();
    }

    /**
     * Resolve a defer with a value.
     *
     * @param {*} value
     * @return {void}
     */
    resolve(value) {
        if (this._isResolvedOrRejected()) {
            return;
        }

        this._defferedValue = value;
        this._resolved = true;
        this._resolveListeners.forEach((listener) => this._callCallback(listener));
        this._resolveListeners = [];
    }

    /**
     * Reject a defer with an error.
     *
     * @param {*} error
     * @return {void}
     */
    reject(error) {
        if (this._isResolvedOrRejected()) {
            return;
        }

        this._defferedValue = error;
        this._rejected = true;
        this._rejectListeners.forEach((listener) => this._callCallback(listener));
        this._rejectListeners = [];
    }

    /**
     * Add the listener function to the end of the resolve listeners array.
     * If a defer is already resolved a listener function will be called immediately.
     *
     * @param {Function} listener
     * @return {void}
     */
    onResolve(listener) {
        if (typeof listener !== "function") {
            throw new TypeError("listener should be a function.");
        }

        if (this._isResolved()) {
            this._callCallback(listener);
        } else {
            this._resolveListeners.push(listener);
        }
    }

    /**
     * Add the listener function to the end of the reject listeners array.
     * If a defer is already rejected a listener function will be called immediately.
     *
     * @param {Function} listener
     * @return {void}
     */
    onReject(listener) {
        if (typeof listener !== "function") {
            throw new TypeError("listener should be a function.");
        }

        if (this._isRejected()) {
            this._callCallback(listener);
        } else {
            this._rejectListeners.push(listener);
        }
    }

    /**
     * Get a promise which will be resolved or rejected with a deferred value.
     *
     * @return {Promise<any>}
     */
    promisify() {
        return new Promise((resolve, reject) => {
            this.onResolve(resolve);
            this.onReject(reject);
        });
    }
}

module.exports = Defer;
