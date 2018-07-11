/*! tooleks v1.3.1. Copyright (c) Oleksandr Tolochko. */
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
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/ 	return __webpack_require__(__webpack_require__.s = 23);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isArray = __webpack_require__(19);
var isBoolean = __webpack_require__(18);
var isFunction = __webpack_require__(17);
var isNull = __webpack_require__(16);
var isNumber = __webpack_require__(15);
var isNumeric = __webpack_require__(14);
var isObject = __webpack_require__(13);
var isString = __webpack_require__(12);
var isUndefined = __webpack_require__(11);

module.exports = Object.freeze({
    isArray: isArray,
    isBoolean: isBoolean,
    isFunction: isFunction,
    isNull: isNull,
    isNumber: isNumber,
    isNumeric: isNumeric,
    isObject: isObject,
    isString: isString,
    isUndefined: isUndefined
});

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Defer class.
 */

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Defer = function () {
    /**
     * Defer constructor.
     */
    function Defer() {
        var _this = this;

        _classCallCheck(this, Defer);

        this._promise = new Promise(function (resolve, reject) {
            _this.resolve = resolve;
            _this.reject = reject;
        });
        this.promisify = this.promisify.bind(this);
    }

    /**
     * Get a promise which will be resolved or rejected with a deferred value.
     *
     * @return {Promise<any>}
     */


    _createClass(Defer, [{
        key: "promisify",
        value: function promisify() {
            return this._promise;
        }
    }]);

    return Defer;
}();

module.exports = Defer;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _require = __webpack_require__(0),
    isFunction = _require.isFunction,
    isString = _require.isString,
    isUndefined = _require.isUndefined;

/**
 * Assert "from" parameter.
 *
 * @param {*} from
 * @return {void}
 * @throws TypeError
 */


function assertFromParameter(from) {
    if (!isString(from)) {
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
    if (!isString(to)) {
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
    if (!isFunction(resolver)) {
        throw new TypeError('The "resolver" parameter should be a function.');
    }
}

/**
 * Mapper class.
 */

var Mapper = function () {
    /**
     * Mapper constructor.
     */
    function Mapper() {
        _classCallCheck(this, Mapper);

        this._resolvers = {};
        this._assertResolver = this._assertResolver.bind(this);
        this.registerResolver = this.registerResolver.bind(this);
        this.hasResolver = this.hasResolver.bind(this);
        this.removeResolver = this.removeResolver.bind(this);
        this.map = this.map.bind(this);
    }

    /**
     * Assert that the resolver function for from-to mapping exists.
     *
     * @param {string} from
     * @param {string} to
     * @return {void}
     * @private
     */


    _createClass(Mapper, [{
        key: "_assertResolver",
        value: function _assertResolver(from, to) {
            if (isUndefined(this._resolvers[from])) {
                throw new Error("Resolver for \"" + from + "\" not found.");
            }
            if (isUndefined(this._resolvers[from][to])) {
                throw new Error("Resolver for \"" + to + "\" not found.");
            }
        }

        /**
         * Register the resolver function for from-to mapping.
         *
         * @param {string} from
         * @param {string} to
         * @param {Function} resolver
         * @return {Mapper}
         */

    }, {
        key: "registerResolver",
        value: function registerResolver(from, to, resolver) {
            assertFromParameter(from);
            assertToParameter(to);
            assertResolverParameter(resolver);
            if (isUndefined(this._resolvers[from])) {
                this._resolvers[from] = {};
            }
            this._resolvers[from][to] = resolver;
            return this;
        }

        /**
         * Determine that the resolver function for from-to mapping is registered.
         *
         * @param {string} from
         * @param {string} to
         * @return {boolean}
         */

    }, {
        key: "hasResolver",
        value: function hasResolver(from, to) {
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
         * Remove the resolver function for from-to mapping.
         *
         * @param {string} from
         * @param {string} to
         * @return {Mapper}
         */

    }, {
        key: "removeResolver",
        value: function removeResolver(from, to) {
            assertFromParameter(from);
            assertToParameter(to);
            if (this.hasResolver(from, to)) {
                delete this._resolvers[from][to];
            }
            return this;
        }

        /**
         * Map value by using from-to resolver function.
         *
         * @param {*} value
         * @param {string} from
         * @param {string} to
         * @return {*}
         */

    }, {
        key: "map",
        value: function map(value, from, to) {
            assertFromParameter(from);
            assertToParameter(to);
            this._assertResolver(from, to);
            var resolver = this._resolvers[from][to];
            return resolver(value);
        }
    }]);

    return Mapper;
}();

module.exports = Mapper;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Mapper = __webpack_require__(2);

module.exports = Mapper;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _require = __webpack_require__(0),
    isFunction = _require.isFunction,
    isString = _require.isString,
    isUndefined = _require.isUndefined;

/**
 * Assert "eventName" parameter.
 *
 * @param {*} eventName
 * @return {void}
 * @throws TypeError
 */


function assertEventNameParameter(eventName) {
    if (!isString(eventName)) {
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
    if (!isFunction(listener)) {
        throw new TypeError('The "listener" parameter should be a function.');
    }
}

/**
 * EventEmitter class.
 */

var EventEmitter = function () {
    /**
     * EventEmitter constructor.
     */
    function EventEmitter() {
        _classCallCheck(this, EventEmitter);

        this._events = {};
        this.emit = this.emit.bind(this);
        this.on = this.on.bind(this);
    }

    /**
     * Synchronously call each of the listeners registered for the event named eventName.
     *
     * @param {string} eventName
     * @param {*} payload
     * @return {void}
     */


    _createClass(EventEmitter, [{
        key: "emit",
        value: function emit(eventName, payload) {
            assertEventNameParameter(eventName);
            var event = this._events[eventName];
            if (!isUndefined(event)) {
                event.forEach(function (listener) {
                    return listener(payload);
                });
            }
        }

        /**
         * Add the listener function to the end of the listeners array for the event named eventName.
         *
         * @param {string} eventName
         * @param {Function} listener
         * @return {Function} - A function to remove the listener function from the listeners array for the event named eventName.
         */

    }, {
        key: "on",
        value: function on(eventName, listener) {
            var _this = this;

            assertEventNameParameter(eventName);
            assertListenerParameter(listener);
            if (isUndefined(this._events[eventName])) {
                this._events[eventName] = [];
            }
            this._events[eventName].push(listener);
            return function () {
                _this._events[eventName] = _this._events[eventName].filter(function (eventListener) {
                    return eventListener !== listener;
                });
            };
        }
    }]);

    return EventEmitter;
}();

module.exports = EventEmitter;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var EventEmitter = __webpack_require__(4);

module.exports = EventEmitter;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _require = __webpack_require__(0),
    isArray = _require.isArray,
    isBoolean = _require.isBoolean,
    isFunction = _require.isFunction,
    isString = _require.isString,
    isUndefined = _require.isUndefined;

/**
 * Assert "identifier" parameter.
 *
 * @param {*} identifier
 * @return {void}
 * @throws TypeError
 */


function assertIdentifierParameter(identifier) {
    if (!isString(identifier)) {
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
    if (!isFunction(type)) {
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
    if (!isArray(dependencies)) {
        throw new TypeError('The "dependencies" parameter should be an array.');
    }
    dependencies.forEach(function (dependency) {
        if (!isString(dependency) && !isFunction(dependency)) {
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
    if (!isBoolean(singleton)) {
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
    if (!isBoolean(factory)) {
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
    if (isUndefined(instance)) {
        throw new TypeError('The "instance" parameter should not be an undefined.');
    }
}

/**
 * DependencyContainer class.
 */

var DependencyContainer = function () {
    /**
     * DependencyContainer constructor.
     */
    function DependencyContainer() {
        _classCallCheck(this, DependencyContainer);

        this._bindings = {};
        this._createInstance = this._createInstance.bind(this);
        this._resolveDependencies = this._resolveDependencies.bind(this);
        this.registerBinding = this.registerBinding.bind(this);
        this.registerInstance = this.registerInstance.bind(this);
        this.removeBinding = this.removeBinding.bind(this);
        this.has = this.has.bind(this);
        this.get = this.get.bind(this);
    }

    /**
     * Create an instance for a binding.
     *
     * @param {Object} binding
     * @return {*}
     * @private
     */


    _createClass(DependencyContainer, [{
        key: "_createInstance",
        value: function _createInstance(binding) {
            var dependencies = this._resolveDependencies(binding.dependencies);
            var instance = null;
            if (binding.factory) {
                instance = binding.type.apply(binding, _toConsumableArray(dependencies));
            } else {
                instance = new (Function.prototype.bind.apply(binding.type, [null].concat(_toConsumableArray(dependencies))))();
            }
            return instance;
        }

        /**
         * Resolve all of dependencies for a binding.
         *
         * @param {Array<string|Function>} dependencies
         * @private
         */

    }, {
        key: "_resolveDependencies",
        value: function _resolveDependencies(dependencies) {
            var _this = this;

            return dependencies.map(function (dependency) {
                if (isString(dependency)) {
                    return _this.get(dependency);
                } else if (isFunction(dependency)) {
                    return dependency();
                }
                throw new TypeError("Invalid dependency type.");
            });
        }

        /**
         * Register a new binding in the container.
         *
         * @param {string} identifier
         * @param {Function|*} type
         * @param {Object} options
         * @param {Array<string|Function>} options.dependencies
         * @param {boolean} options.singleton
         * @param {boolean} options.factory
         * @return {DependencyContainer}
         */

    }, {
        key: "registerBinding",
        value: function registerBinding(identifier, type) {
            var _this2 = this;

            var _ref = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {},
                _ref$dependencies = _ref.dependencies,
                dependencies = _ref$dependencies === undefined ? [] : _ref$dependencies,
                _ref$singleton = _ref.singleton,
                singleton = _ref$singleton === undefined ? false : _ref$singleton,
                _ref$factory = _ref.factory,
                factory = _ref$factory === undefined ? false : _ref$factory;

            assertIdentifierParameter(identifier);
            assertTypeParameter(type);
            assertDependenciesParameter(dependencies);
            assertSingletonParameter(singleton);
            assertFactoryParameter(factory);

            // Check dependencies list length.
            if (type.length !== dependencies.length) {
                throw new Error("Invalid number of dependencies were specified for \"" + identifier + "\".");
            }

            // Check for circular dependencies.
            dependencies.forEach(function (dependency) {
                if (dependency === identifier) {
                    throw new Error("Circular dependency detected. " + identifier + " depends on itself.");
                }

                if (!isUndefined(_this2._bindings[dependency])) {
                    _this2._bindings[dependency].dependencies.forEach(function (innerDependency) {
                        if (innerDependency === identifier) {
                            throw new Error("Circular dependency detected. " + ("\"" + identifier + "\" depends on \"" + dependency + "\" and vise versa."));
                        }
                    });
                }
            });

            this._bindings[identifier] = { type: type, dependencies: dependencies, singleton: singleton, factory: factory };

            return this;
        }

        /**
         * Register an instance in the container.
         *
         * @param {string} identifier
         * @param {*} instance
         * @return {DependencyContainer}
         */

    }, {
        key: "registerInstance",
        value: function registerInstance(identifier, instance) {
            assertIdentifierParameter(identifier);
            assertInstanceParameter(instance);
            this._bindings[identifier] = { instance: instance, dependencies: [], singleton: true, factory: false };
            return this;
        }

        /**
         * Remove the binding from the container.
         *
         * @param {string} identifier
         * @return {DependencyContainer}
         */

    }, {
        key: "removeBinding",
        value: function removeBinding(identifier) {
            assertIdentifierParameter(identifier);
            if (this.has(identifier)) {
                delete this._bindings[identifier];
            }
            return this;
        }

        /**
         * Return true if the container can return the binding for the given identifier.
         * Return false otherwise.
         *
         * @param {string} identifier
         * @return {boolean}
         */

    }, {
        key: "has",
        value: function has(identifier) {
            assertIdentifierParameter(identifier);
            return Object.prototype.hasOwnProperty.call(this._bindings, identifier);
        }

        /**
         * Find the binding of the container by its identifier and return it.
         *
         * @param {string} identifier
         * @return {*}
         */

    }, {
        key: "get",
        value: function get(identifier) {
            assertIdentifierParameter(identifier);
            if (!this.has(identifier)) {
                throw new Error("The \"" + identifier + "\" binding not found.");
            }
            var binding = this._bindings[identifier];
            if (!isUndefined(binding.instance)) {
                return binding.instance;
            }
            var instance = this._createInstance(binding);
            if (binding.singleton) {
                binding.instance = instance;
            }
            return instance;
        }
    }]);

    return DependencyContainer;
}();

module.exports = DependencyContainer;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var DependencyContainer = __webpack_require__(6);

module.exports = DependencyContainer;

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _require = __webpack_require__(0),
    isUndefined = _require.isUndefined;

/**
 * Retrieve the result of callback call. If an error occurred or result is undefined return a default value instead.
 *
 * @param {Function} callback
 * @param {*} defaultValue
 * @return {*}
 */


function optional(callback) {
    var defaultValue = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;

    try {
        var value = callback();
        if (!isUndefined(value)) {
            return value;
        }
        return defaultValue;
    } catch (error) {
        return defaultValue;
    }
}

module.exports = optional;

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* eslint-disable */



var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _require = __webpack_require__(0),
    isArray = _require.isArray,
    isBoolean = _require.isBoolean,
    isFunction = _require.isFunction,
    isNull = _require.isNull,
    isNumber = _require.isNumber,
    isObject = _require.isObject,
    isString = _require.isString,
    isUndefined = _require.isUndefined;

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
 * Clone boolean value.
 *
 * @param {boolean} value
 * @returns {boolean}
 */
function cloneBoolean(value) {
    return Boolean(value);
}

/**
 * Clone number value.
 *
 * @param {number} value
 * @returns {number}
 */
function cloneNumber(value) {
    return Number(value);
}

/**
 * Clone string value.
 *
 * @param {string} value
 * @returns {string}
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
    return value.map(function (item) {
        return clone(item);
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
    return new Date(value.valueOf());
}

/**
 * Clone RegExp value.
 *
 * @param {RegExp} value
 * @returns {RegExp}
 */
function cloneRegExp(value) {
    var pattern = value.source;
    var flags = "";
    if (value.global) {
        flags += "g";
    }
    if (value.ignoreCase) {
        flags += "i";
    }
    if (value.multiline) {
        flags += "m";
    }
    return new RegExp(pattern, flags);
}

/**
 * Clone Object value.
 *
 * @param {Object} value
 * @returns {Object}
 * @throws Error
 */
function cloneObject(value) {
    // Overidden clone method.
    if (value.clone && isFunction(value.clone)) {
        return value.clone();
    }
    // DOM node object.
    else if (value.nodeType && isFunction(value.cloneNode)) {
            return value.cloneNode(true);
        }
        // Object literal.
        else if (isUndefined(value.prototype)) {
                return Object.keys(value).reduce(function (clonedObject, key) {
                    var property = value[key];
                    clonedObject[key] = clone(property);
                    return clonedObject;
                }, {});
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
    // Root function.
    var clonedFunction = function clonedFunction() {
        return value.apply(value, arguments);
    };

    // Function keys.
    Object.keys(value).forEach(function (key) {
        var property = value[key];
        clonedFunction[key] = clone(property);
    });

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
    if (isUndefined(value)) {
        return cloneUndefined(value);
    } else if (isNull(value)) {
        return cloneNull(value);
    } else if (isBoolean(value)) {
        return cloneBoolean(value);
    } else if (isNumber(value)) {
        return cloneNumber(value);
    } else if (isString(value)) {
        return cloneString(value);
    } else if (isArray(value)) {
        return cloneArray(value);
    } else if (value instanceof Map) {
        return cloneMap(value);
    } else if (value instanceof Date) {
        return cloneDate(value);
    } else if (value instanceof RegExp) {
        return cloneRegExp(value);
    } else if (isObject(value)) {
        return cloneObject(value);
    } else if (isFunction(value)) {
        return cloneFunction(value);
    }

    throw new Error("Unable to clone the " + (typeof value === "undefined" ? "undefined" : _typeof(value)) + ".");
}

module.exports = clone;

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var types = __webpack_require__(0);
var clone = __webpack_require__(9);
var optional = __webpack_require__(8);

module.exports = Object.freeze(_extends({}, types, { clone: clone, optional: optional }));

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Determine if value is an undefined.
 *
 * @param {*} value
 * @return {boolean}
 */

function isUndefined(value) {
  return typeof value === "undefined";
}

module.exports = isUndefined;

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Determine if value is a string.
 *
 * @param {*} value
 * @return {boolean}
 */

function isString(value) {
  return typeof value === "string" || value instanceof String;
}

module.exports = isString;

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Determine if value is an object and not null.
 *
 * @param {*} value
 * @param {boolean} value
 * @return {boolean}
 */

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function isObject(value) {
  return (typeof value === "undefined" ? "undefined" : _typeof(value)) === "object" && value !== null;
}

module.exports = isObject;

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Determine if value is a number or numeric string.
 *
 * @param {*} value
 * @return {boolean}
 */

function isNumeric(value) {
  return !isNaN(parseFloat(value)) && isFinite(value);
}

module.exports = isNumeric;

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Determine if value is a number.
 *
 * @param {*} value
 * @return {boolean}
 */

function isNumber(value) {
  return typeof value === "number" || value instanceof Number;
}

module.exports = isNumber;

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Determine if value is a null.
 *
 * @param {*} value
 * @return {boolean}
 */

function isNull(value) {
  return value === null;
}

module.exports = isNull;

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Determine if value is a function.
 *
 * @param {*} value
 * @param {boolean} value
 * @return {boolean}
 */

function isFunction(value) {
  return typeof value === "function";
}

module.exports = isFunction;

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Determine if value is a boolean.
 *
 * @param {*} value
 * @return {boolean}
 */

function isBoolean(value) {
  return typeof value === "boolean" || value instanceof Boolean;
}

module.exports = isBoolean;

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Determine if value is an array.
 *
 * @param {*} value
 * @return {boolean}
 */

function isArray(value) {
  return Array.isArray(value) || value instanceof Array;
}

module.exports = isArray;

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _require = __webpack_require__(0),
    isFunction = _require.isFunction;

var Defer = __webpack_require__(1);

var DEFAULT_TIME_INTERVAL = 0;

/**
 * Assert "callback" parameter.
 *
 * @param {*} callback
 * @return {void}
 * @throws TypeError
 */
function assertCallbackParameter(callback) {
    if (!isFunction(callback)) {
        throw new TypeError('The "callback" parameter should be a function.');
    }
}

/**
 * Provide promise that will be resolved when callback will return truthy value.
 *
 * @param {function} callback
 * @param {number} {timeInterval=0}
 * @return {Promise}
 */
function waitUntil(callback) {
    var timeInterval = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : DEFAULT_TIME_INTERVAL;

    assertCallbackParameter(callback);
    var defer = new Defer();
    var intervalId = setInterval(function () {
        try {
            var result = callback();
            if (result) {
                clearInterval(intervalId);
                defer.resolve(result);
            }
        } catch (error) {
            defer.reject(error);
        }
    }, timeInterval);
    return defer.promisify();
}

module.exports = waitUntil;

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Defer = __webpack_require__(1);

var DEFAULT_TIME_INTERVAL = 0;

/**
 * Provide promise that will be resolved after time interval.
 *
 * @param {number} [timeInterval=0]
 * @return {Promise}
 */
function timeout() {
  var timeInterval = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : DEFAULT_TIME_INTERVAL;

  var defer = new Defer();
  setTimeout(function () {
    return defer.resolve();
  }, timeInterval);
  return defer.promisify();
}

module.exports = timeout;

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Defer = __webpack_require__(1);
var timeout = __webpack_require__(21);
var waitUntil = __webpack_require__(20);

module.exports = Object.freeze({ Defer: Defer, timeout: timeout, waitUntil: waitUntil });

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var async = __webpack_require__(22);
var utils = __webpack_require__(10);
var DependencyContainer = __webpack_require__(7);
var EventEmitter = __webpack_require__(5);
var Mapper = __webpack_require__(3);

module.exports = Object.freeze(_extends({}, async, utils, { DependencyContainer: DependencyContainer, EventEmitter: EventEmitter, Mapper: Mapper }));

/***/ })
/******/ ]);
});