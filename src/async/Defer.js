/**
 * Defer class.
 */
export default class Defer {

    /**
     * Defer constructor.
     */
    constructor() {
        this._promise = new Promise((resolve, reject) => {
            this.resolve = resolve;
            this.reject = reject;
        });
        this.promisify = this.promisify.bind(this);
    }

    /**
     * Get a promise which will be resolved or rejected with a deferred value.
     *
     * @return {Promise<*>}
     */
    promisify() {
        return this._promise;
    }
}
