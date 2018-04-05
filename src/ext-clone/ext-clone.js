/* eslint-disable */
"use strict";

/**
 * Enable clone extension.
 *
 * @return {void}
 */
function enable() {
    Boolean.prototype.clone = function() {
        return Boolean(this);
    };

    Number.prototype.clone = function() {
        return Number(this);
    };

    String.prototype.clone = function() {
        return String(this);
    };

    Array.prototype.clone = function() {
        return this.map((item) => {
            if (typeof item !== "undefined" && item !== null) {
                return item.clone();
            } else {
                return item;
            }
        });
    };

    Map.prototype.clone = function() {
        return new Map(Array.from(this).clone());
    };

    Date.prototype.clone = function() {
        return new Date(this.getTime());
    };

    Object.prototype.clone = function() {
        if (this.nodeType && typeof this.cloneNode === "function") {
            // DOM node object.
            return this.cloneNode(true);
        } else if (!this.prototype) {
            // Object literal.
            const clone = {};
            for (let propertyName in this) {
                if (this.hasOwnProperty(propertyName)) {
                    const property = this[propertyName];
                    if (typeof property !== "undefined" && property !== null) {
                        clone[propertyName] = property.clone();
                    } else {
                        clone[propertyName] = property;
                    }
                }
            }
            return clone;
        }

        throw new Error("Unable to clone the object.");
    };

    Function.prototype.clone = function() {
        const self = this;
        const clone = function() {
            return self.apply(this, arguments);
        };
        for (let propertyName in this) {
            if (this.hasOwnProperty(propertyName)) {
                const property = this[propertyName];
                if (typeof property !== "undefined" && property !== null) {
                    clone[propertyName] = property.clone();
                } else {
                    clone[propertyName] = property;
                }
            }
        }
        return clone;
    };
}

/**
 * Disable clone extension.
 *
 * @return {void}
 */
function disable() {
    getTypes().forEach((type) => {
        type.prototype.clone = undefined;
    });
}

/**
 * Return true if clone extension is enabled.
 * Return false otherwise.
 *
 * @return {Boolean}
 */
function isEnabled() {
    return getTypes().reduce((isEnabled, type) => {
        return isEnabled && typeof type.prototype.clone !== "undefined";
    }, true);
}

/**
 * Get an array of types supported by clone extension.
 *
 * @return {Array<Function>}
 */
function getTypes() {
    return [Boolean, Number, String, Array, Map, Date, Object, Function];
}

module.exports = Object.freeze({enable, disable, isEnabled, getTypes});
