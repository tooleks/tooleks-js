"use strict";

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
     * @param {String} eventName
     * @param {*} payload
     * @return {void}
     */
    emit(eventName, payload) {
        if (typeof eventName !== "string") {
            throw new TypeError("eventName should be a string.");
        }

        const event = this._events[eventName];

        if (typeof event !== "undefined") {
            event.forEach((listener) => listener(payload));
        }
    }

    /**
     * Add the listener function to the end of the listeners array for the event named eventName.
     *
     * @param {String} eventName
     * @param {Function} listener
     * @return {Function} - A function to remove the listener function from the listeners array for the event named eventName.
     */
    on(eventName, listener) {
        if (typeof eventName !== "string") {
            throw new TypeError("eventName should be a string.");
        }

        if (typeof listener !== "function") {
            throw new TypeError("listener should be a function.");
        }

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
