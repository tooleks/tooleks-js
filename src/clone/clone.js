/* eslint-disable */

"use strict";

/**
 * Clone undefined value.
 *
 * @param {undefined} value
 * @returns {undefined}
 */
function cloneUndefined(value) {
    return undefined;
}

/**
 * Clone null value.
 *
 * @param {null} value
 * @returns {null}
 */
function cloneNull(value) {
    return null;
}

/**
 * Clone Boolean value.
 *
 * @param {Boolean} value
 * @returns {Boolean}
 */
function cloneBoolean(value) {
    return Boolean(value);
}

/**
 * Clone Number value.
 *
 * @param {Number} value
 * @returns {Number}
 */
function cloneNumber(value) {
    return Number(value);
}

/**
 * Clone String value.
 *
 * @param {String} value
 * @returns {String}
 */
function cloneString(value) {
    return String(value);
}

/**
 * Clone Array value.
 *
 * @param {Array} value
 * @returns {Array}
 */
function cloneArray(value) {
    return value.map((item) => {
        if (typeof item !== "undefined" && item !== null) {
            return clone(item);
        }
        return item;
    });
}

/**
 * Clone Map value.
 *
 * @param {Map} value
 * @returns {Map}
 */
function cloneMap(value) {
    return new Map(clone(Array.from(value)));
}

/**
 * Clone Date value.
 *
 * @param {Date} value
 * @returns {Date}
 */
function cloneDate(value) {
    return new Date(value.getTime());
}

/**
 * Clone Object value.
 *
 * @param {Object} value
 * @returns {Object}
 * @throws Error
 */
function cloneObject(value) {
    if (typeof value.clone === "function") {
        // Overidden clone method.
        return value.clone();
    } else if (value.nodeType && typeof value.cloneNode === "function") {
        // DOM node object.
        return value.cloneNode(true);
    } else if (!value.prototype) {
        // Object literal.
        const clonedObject = {};
        for (const propertyName in value) {
            if (Object.prototype.hasOwnProperty.call(value, propertyName)) {
                const property = value[propertyName];
                clonedObject[propertyName] = clone(property);
            }
        }
        return clonedObject;
    }

    throw new Error("Unable to clone the object. Implement the 'clone' method manually.");
}

/**
 * Clone Function value.
 *
 * @param {Function} value
 * @returns {Function}
 */
function cloneFunction(value) {
    const clonedFunction = function() {
        return value.apply(value, arguments);
    };
    for (const propertyName in value) {
        if (Object.prototype.hasOwnProperty.call(value, propertyName)) {
            const property = value[propertyName];
            clonedFunction[propertyName] = clone(property);
        }
    }
    return clonedFunction;
}

/**
 * Clone value.
 *
 * @param {*} value
 * @returns {*}
 * @throws Error
 */
function clone(value) {
    if (typeof value === "undefined") {
        return cloneUndefined(value);
    } else if (value === null) {
        return cloneNull(value);
    } else if (typeof value === "boolean") {
        return cloneBoolean(value);
    } else if (typeof value === "number") {
        return cloneNumber(value);
    } else if (typeof value === "string") {
        return cloneString(value);
    } else if (Array.isArray(value) || value instanceof Array) {
        return cloneArray(value);
    } else if (value instanceof Map) {
        return cloneMap(value);
    } else if (value instanceof Date) {
        return cloneDate(value);
    } else if (typeof value === "object") {
        return cloneObject(value);
    } else if (typeof value === "function") {
        return cloneFunction(value);
    }
    throw new Error(`Unable to clone the ${typeof value}.`);
}

module.exports = clone;
