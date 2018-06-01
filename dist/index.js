/*! Copyright (C) 2018 Oleksandr Tolochko. */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["tooleks"] = factory();
	else
		root["tooleks"] = factory();
})(typeof self !== "undefined" ? self : this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 12);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Retrieve the result of callback call. If an error occurred or result is undefined return a default value instead.
 *
 * @param {Function} callback
 * @param {*} defaultValue
 * @return {*}
 */

function optional(callback, defaultValue = undefined) {
    try {
        const value = callback();
        return typeof value !== "undefined" ? value : defaultValue;
    } catch (error) {
        return defaultValue;
    }
}

module.exports = optional;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const optional = __webpack_require__(0);

module.exports = optional;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Assert "from" parameter.
 *
 * @param {*} from
 * @return {void}
 * @throws TypeError
 */

function assertFromParameter(from) {
    if (typeof from !== "string") {
        throw new TypeError('The "from" parameter should be a string.');
    }
}

/**
 * Assert "to" parameter.
 *
 * @param {*} to
 * @return {void}
 * @throws TypeError
 */
function assertToParameter(to) {
    if (typeof to !== "string") {
        throw new TypeError('The "to" parameter should be a string.');
    }
}

/**
 * Assert "resolver" parameter.
 *
 * @param {*} resolver
 * @return {void}
 * @throws TypeError
 */
function assertResolverParameter(resolver) {
    if (typeof resolver !== "function") {
        throw new TypeError('The "resolver" parameter should be a function.');
    }
}

/**
 * Mapper class.
 */
class Mapper {
    /**
     * Mapper constructor.
     */
    constructor() {
        this._resolvers = {};
    }

    /**
     * Get a list of resolvers.
     *
     * @return {Object}
     */
    getResolvers() {
        return this._resolvers;
    }

    /**
     * Register the resolver function for from-to mapping.
     *
     * @param {String} from
     * @param {String} to
     * @param {Function} resolver
     * @return {Mapper}
     */
    registerResolver(from, to, resolver) {
        assertFromParameter(from);
        assertToParameter(to);
        assertResolverParameter(resolver);
        if (typeof this._resolvers[from] === "undefined") {
            this._resolvers[from] = {};
        }
        this._resolvers[from][to] = resolver;
        return this;
    }

    /**
     * Remove the resolver function for from-to mapping.
     *
     * @param {String} from
     * @param {String} to
     * @return {Mapper}
     */
    removeResolver(from, to) {
        assertFromParameter(from);
        assertToParameter(to);
        if (this.hasResolver(from, to)) {
            delete this._resolvers[from][to];
        }
        return this;
    }

    /**
     * Assert that the resolver function for from-to mapping exists.
     *
     * @param {String} from
     * @param {String} to
     * @return {void}
     * @private
     */
    _assertResolver(from, to) {
        if (typeof this.getResolvers()[from] === "undefined") {
            throw new Error(`Resolver for "${from}" not found.`);
        }
        if (typeof this.getResolvers()[from][to] === "undefined") {
            throw new Error(`Resolver for "${to}" not found.`);
        }
    }

    /**
     * Determine that the resolver function for from-to mapping is registered.
     *
     * @param {String} from
     * @param {String} to
     * @return {Boolean}
     */
    hasResolver(from, to) {
        assertFromParameter(from);
        assertToParameter(to);
        try {
            this._assertResolver(from, to);
            return true;
        } catch (error) {
            return false;
        }
    }

    /**
     * Map value by using from-to resolver function.
     *
     * @param {*} value
     * @param {String} from
     * @param {String} to
     * @return {*}
     */
    map(value, from, to) {
        assertFromParameter(from);
        assertToParameter(to);
        this._assertResolver(from, to);
        const resolver = this.getResolvers()[from][to];
        return resolver(value);
    }
}

module.exports = Mapper;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const Mapper = __webpack_require__(2);

module.exports = Mapper;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

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
        throw new TypeError('The "eventName" parameter should be a string.');
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
        throw new TypeError('The "listener" parameter should be a function.');
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
     * @param {String} eventName
     * @param {*} payload
     * @return {void}
     */
    emit(eventName, payload) {
        assertEventNameParameter(eventName);
        const event = this._events[eventName];
        if (typeof event !== "undefined") {
            event.forEach(listener => listener(payload));
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
        assertEventNameParameter(eventName);
        assertListenerParameter(listener);
        if (typeof this._events[eventName] === "undefined") {
            this._events[eventName] = [];
        }
        this._events[eventName].push(listener);
        return () => {
            this._events[eventName] = this._events[eventName].filter(eventListener => eventListener !== listener);
        };
    }
}

module.exports = EventEmitter;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const EventEmitter = __webpack_require__(4);

module.exports = EventEmitter;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Assert "identifier" parameter.
 *
 * @param {*} identifier
 * @return {void}
 * @throws TypeError
 */

function assertIdentifierParameter(identifier) {
    if (typeof identifier !== "string") {
        throw new TypeError('The "identifier" parameter should be a string.');
    }
}

/**
 * Assert "type" parameter.
 *
 * @param {*} type
 * @return {void}
 * @throws TypeError
 */
function assertTypeParameter(type) {
    if (typeof type !== "function") {
        throw new TypeError('The "type" parameter should be a function.');
    }
}

/**
 * Assert "dependencies" parameter.
 *
 * @param {*} dependencies
 * @return {void}
 * @throws TypeError
 */
function assertDependenciesParameter(dependencies) {
    if (!Array.isArray(dependencies)) {
        throw new TypeError('The "dependencies" parameter should be an array.');
    }
    dependencies.forEach(dependency => {
        if (typeof dependency !== "string" && typeof dependency !== "function") {
            throw new TypeError('The "dependencies" parameter should be an array of strings or functions.');
        }
    });
}

/**
 * Assert "singleton" parameter.
 *
 * @param {*} singleton
 * @return {void}
 * @throws TypeError
 */
function assertSingletonParameter(singleton) {
    if (typeof singleton !== "boolean") {
        throw new TypeError('The "singleton" parameter should be a boolean.');
    }
}

/**
 * Assert "factory" parameter.
 *
 * @param {*} factory
 * @return {void}
 * @throws TypeError
 */
function assertFactoryParameter(factory) {
    if (typeof factory !== "boolean") {
        throw new TypeError('The "factory" parameter should be a boolean.');
    }
}

/**
 * Assert "instance" parameter.
 *
 * @param {*} instance
 * @return {void}
 * @throws TypeError
 */
function assertInstanceParameter(instance) {
    if (typeof instance === "undefined") {
        throw new TypeError('The "instance" parameter should not be an undefined.');
    }
}

/**
 * DependencyContainer class.
 */
class DependencyContainer {
    /**
     * DependencyContainer constructor.
     */
    constructor() {
        this._bindings = {};
    }

    /**
     * Create an instance for a binding.
     *
     * @param {Object} binding
     * @return {*}
     * @private
     */
    _createInstance(binding) {
        const dependencies = this._resolveDependencies(binding.dependencies);
        let instance = null;
        if (binding.factory) {
            instance = binding.type(...dependencies);
        } else {
            instance = new binding.type(...dependencies);
        }
        return instance;
    }

    /**
     * Resolve all of dependencies for a binding.
     *
     * @param {Array<String|Function>} dependencies
     * @private
     */
    _resolveDependencies(dependencies) {
        return dependencies.map(dependency => {
            if (typeof dependency === "string") {
                return this.get(dependency);
            } else if (typeof dependency === "function") {
                return dependency();
            }
            throw new TypeError("Invalid dependency type.");
        });
    }

    /**
     * Return true if the container can return the binding for the given identifier.
     * Return false otherwise.
     *
     * @param {String} identifier
     * @return {Boolean}
     */
    has(identifier) {
        assertIdentifierParameter(identifier);
        return Object.prototype.hasOwnProperty.call(this._bindings, identifier);
    }

    /**
     * Find the binding of the container by its identifier and return it.
     *
     * @param {String} identifier
     * @return {Object}
     */
    get(identifier) {
        assertIdentifierParameter(identifier);
        if (!this.has(identifier)) {
            throw new Error(`The "${identifier}" binding not found.`);
        }
        const binding = this._bindings[identifier];
        if (typeof binding.instance !== "undefined") {
            return binding.instance;
        }
        const instance = this._createInstance(binding);
        if (binding.singleton) {
            binding.instance = instance;
        }
        return instance;
    }

    /**
     * Register a new binding in the container.
     *
     * @param {String} identifier
     * @param {Function} type
     * @param {Object} options
     * @param {Array<String|Function>} options.dependencies
     * @param {Boolean} options.singleton
     * @param {Boolean} options.factory
     * @return {DependencyContainer}
     */
    registerBinding(identifier, type, { dependencies = [], singleton = false, factory = false } = {}) {
        assertIdentifierParameter(identifier);
        assertTypeParameter(type);
        assertDependenciesParameter(dependencies);
        assertSingletonParameter(singleton);
        assertFactoryParameter(factory);
        if (type.length !== dependencies.length) {
            throw new Error(`Invalid number of dependencies were specified for "${identifier}".`);
        }
        this._bindings[identifier] = { type, dependencies, singleton, factory };
        return this;
    }

    /**
     * Remove the binding from the container.
     *
     * @param {String} identifier
     * @return {DependencyContainer}
     */
    removeBinding(identifier) {
        assertIdentifierParameter(identifier);
        if (this.has(identifier)) {
            delete this._bindings[identifier];
        }
        return this;
    }

    /**
     * Register an instance in the container.
     *
     * @param {String} identifier
     * @param {*} instance
     * @return {DependencyContainer}
     */
    registerInstance(identifier, instance) {
        assertIdentifierParameter(identifier);
        assertInstanceParameter(instance);
        this._bindings[identifier] = { instance, singleton: true, factory: false };
        return this;
    }

    /**
     * Remove an instance from the container.
     *
     * @see removeBinding
     * @param {String} identifier
     * @return {DependencyContainer}
     */
    removeInstance(identifier) {
        assertIdentifierParameter(identifier);
        return this.removeBinding(identifier);
    }
}

module.exports = DependencyContainer;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const DependencyContainer = __webpack_require__(6);

module.exports = DependencyContainer;

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

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

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const Defer = __webpack_require__(8);

module.exports = Defer;

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* eslint-disable */



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
    return value.map(item => {
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
    const clonedFunction = function () {
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

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const clone = __webpack_require__(10);

module.exports = clone;

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const clone = __webpack_require__(11);
const Defer = __webpack_require__(9);
const DependencyContainer = __webpack_require__(7);
const EventEmitter = __webpack_require__(5);
const Mapper = __webpack_require__(3);
const optional = __webpack_require__(1);

module.exports = Object.freeze({ clone, Defer, DependencyContainer, EventEmitter, Mapper, optional });

/***/ })
/******/ ]);
});