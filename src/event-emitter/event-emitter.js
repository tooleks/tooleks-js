"use strict";

/**
 * Assert "eventName" parameter.
 *
 * @param {*} eventName
 * @return {void}
 * @throws TypeError
 */
function assertEventNameParameter(eventName) {
    if (typeof eventName !== "string") {
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
    if (typeof listener !== "function") {
        throw new TypeError("The \"listener\" parameter should be a function.");
    }
}

/**
 * EventEmitter class.
 */
class EventEmitter {

    /**
     * EventEmitter constructor.
     */
    constructor() {
        this._events = {};
    }

    /**
     * Synchronously call each of the listeners registered for the event named eventName.
     *
     * @param {string} eventName
     * @param {*} payload
     * @return {void}
     */
    emit(eventName, payload) {
        assertEventNameParameter(eventName);
        const event = this._events[eventName];
        if (typeof event !== "undefined") {
            event.forEach((listener) => listener(payload));
        }
    }

    /**
     * Add the listener function to the end of the listeners array for the event named eventName.
     *
     * @param {string} eventName
     * @param {Function} listener
     * @return {Function} - A function to remove the listener function from the listeners array for the event named eventName.
     */
    on(eventName, listener) {
        assertEventNameParameter(eventName);
        assertListenerParameter(listener);
        if (typeof this._events[eventName] === "undefined") {
            this._events[eventName] = [];
        }
        this._events[eventName].push(listener);
        return () => {
            this._events[eventName] = this._events[eventName].filter((eventListener) => eventListener !== listener);
        };
    }
}

module.exports = EventEmitter;
