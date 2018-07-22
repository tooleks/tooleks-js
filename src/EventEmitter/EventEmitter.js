import {isFunction, isString, isUndefined} from "../utils";
import {Defer} from "../async";

/**
 * Assert "eventName" parameter.
 *
 * @param {*} eventName
 * @return {void}
 * @throws TypeError
 */
function assertEventNameParameter(eventName) {
    if (!isString(eventName)) {
        throw new TypeError("The \"eventName\" parameter should be a string.");
    }
}

/**
 * Assert "listener" parameter.
 *
 * @param {*} listener
 * @return {void}
 * @throws TypeError
 */
function assertListenerParameter(listener) {
    if (!isFunction(listener)) {
        throw new TypeError("The \"listener\" parameter should be a function.");
    }
}

/**
 * EventEmitter class.
 */
export default class EventEmitter {

    /**
     * EventEmitter constructor.
     */
    constructor() {
        this._events = {};
        this._callEventListeners = this._callEventListeners.bind(this);
        this.emit = this.emit.bind(this);
        this.emitAsync = this.emitAsync.bind(this);
        this.on = this.on.bind(this);
    }

    /**
     * Synchronously call each of the listeners registered for the event named eventName.
     *
     * @param {string} eventName
     * @param {*} payload
     * @return {Array<*>}
     * @private
     */
    _callEventListeners(eventName, payload) {
        assertEventNameParameter(eventName);
        const listeners = this._events[eventName];
        if (isUndefined(listeners)) {
            return [];
        }
        return listeners.map((listener) => listener(payload));
    }

    /**
     * Synchronously call each of the listeners registered for the event named eventName.
     *
     * @param {string} eventName
     * @param {*} payload
     * @return {void}
     */
    emit(eventName, payload) {
        this._callEventListeners(eventName, payload);
    }

    /**
     * Asynchronously call each of the listeners registered for the event named eventName.
     *
     * @param {string} eventName
     * @param {*} payload
     * @return {Promise<Array<*>>} - A promise that will be resolved when each of the listeners will be resolved.
     */
    emitAsync(eventName, payload) {
        const defer = new Defer();
        setImmediate(() => {
            Promise.all(this._callEventListeners(eventName, payload)).
                then(defer.resolve).
                catch(defer.reject);
        });
        return defer.promisify();
    }

    /**
     * Add the listener function to the end of the listeners array for the event named eventName.
     *
     * @param {string} eventName
     * @param {function} listener
     * @return {function} - A function to remove the listener function from the listeners array for the event named eventName.
     */
    on(eventName, listener) {
        assertEventNameParameter(eventName);
        assertListenerParameter(listener);
        if (isUndefined(this._events[eventName])) {
            this._events[eventName] = [];
        }
        this._events[eventName].push(listener);
        return () => {
            this._events[eventName] = this._events[eventName].filter((eventListener) => eventListener !== listener);
            // Remove event listeners property to optimize memory usage.
            if (!this._events[eventName].length) {
                delete this._events[eventName];
            }
        };
    }
}
