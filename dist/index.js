/*! tooleks v1.4.9 / 2018-07-22T11:07:24.107Z / Copyright (c) Oleksandr Tolochko <tooleks@gmail.com> / License: MIT */
module.exports =
/******/ (function(modules) { // webpackBootstrap
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
/******/ 	return __webpack_require__(__webpack_require__.s = 6);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.optional = exports.clone = exports.isUndefined = exports.isString = exports.isObject = exports.isNumeric = exports.isNumber = exports.isNull = exports.isFunction = exports.isDefined = exports.isBoolean = exports.isArray = undefined;

var _types = __webpack_require__(2);

var _clone = __webpack_require__(18);

var _clone2 = _interopRequireDefault(_clone);

var _optional = __webpack_require__(19);

var _optional2 = _interopRequireDefault(_optional);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.isArray = _types.isArray;
exports.isBoolean = _types.isBoolean;
exports.isDefined = _types.isDefined;
exports.isFunction = _types.isFunction;
exports.isNull = _types.isNull;
exports.isNumber = _types.isNumber;
exports.isNumeric = _types.isNumeric;
exports.isObject = _types.isObject;
exports.isString = _types.isString;
exports.isUndefined = _types.isUndefined;
exports.clone = _clone2.default;
exports.optional = _optional2.default;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Defer class.
 */
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
     * @return {Promise<*>}
     */


    _createClass(Defer, [{
        key: "promisify",
        value: function promisify() {
            return this._promise;
        }
    }]);

    return Defer;
}();

exports.default = Defer;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isUndefined = exports.isString = exports.isObject = exports.isNumeric = exports.isNumber = exports.isNull = exports.isFunction = exports.isDefined = exports.isBoolean = exports.isArray = undefined;

var _isArray = __webpack_require__(9);

var _isArray2 = _interopRequireDefault(_isArray);

var _isBoolean = __webpack_require__(10);

var _isBoolean2 = _interopRequireDefault(_isBoolean);

var _isDefined = __webpack_require__(11);

var _isDefined2 = _interopRequireDefault(_isDefined);

var _isFunction = __webpack_require__(12);

var _isFunction2 = _interopRequireDefault(_isFunction);

var _isNull = __webpack_require__(13);

var _isNull2 = _interopRequireDefault(_isNull);

var _isNumber = __webpack_require__(14);

var _isNumber2 = _interopRequireDefault(_isNumber);

var _isNumeric = __webpack_require__(15);

var _isNumeric2 = _interopRequireDefault(_isNumeric);

var _isObject = __webpack_require__(16);

var _isObject2 = _interopRequireDefault(_isObject);

var _isString = __webpack_require__(17);

var _isString2 = _interopRequireDefault(_isString);

var _isUndefined = __webpack_require__(4);

var _isUndefined2 = _interopRequireDefault(_isUndefined);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.isArray = _isArray2.default;
exports.isBoolean = _isBoolean2.default;
exports.isDefined = _isDefined2.default;
exports.isFunction = _isFunction2.default;
exports.isNull = _isNull2.default;
exports.isNumber = _isNumber2.default;
exports.isNumeric = _isNumeric2.default;
exports.isObject = _isObject2.default;
exports.isString = _isString2.default;
exports.isUndefined = _isUndefined2.default;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.waitUntil = exports.timeout = exports.Defer = undefined;

var _Defer = __webpack_require__(1);

var _Defer2 = _interopRequireDefault(_Defer);

var _timeout = __webpack_require__(7);

var _timeout2 = _interopRequireDefault(_timeout);

var _waitUntil = __webpack_require__(8);

var _waitUntil2 = _interopRequireDefault(_waitUntil);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.Defer = _Defer2.default;
exports.timeout = _timeout2.default;
exports.waitUntil = _waitUntil2.default;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isUndefined;
/**
 * Determine if value is an undefined.
 *
 * @param {*} value
 * @return {boolean}
 */
function isUndefined(value) {
  return typeof value === "undefined";
}

/***/ }),
/* 5 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1, eval)("this");
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.optional = exports.clone = exports.isUndefined = exports.isString = exports.isObject = exports.isNumeric = exports.isNumber = exports.isNull = exports.isFunction = exports.isDefined = exports.isBoolean = exports.isArray = exports.Mapper = exports.EventEmitter = exports.DependencyContainer = exports.waitUntil = exports.timeout = exports.Defer = undefined;

var _async = __webpack_require__(3);

var _utils = __webpack_require__(0);

var _DependencyContainer = __webpack_require__(20);

var _EventEmitter = __webpack_require__(22);

var _Mapper = __webpack_require__(27);

exports.Defer = _async.Defer;
exports.timeout = _async.timeout;
exports.waitUntil = _async.waitUntil;
exports.DependencyContainer = _DependencyContainer.DependencyContainer;
exports.EventEmitter = _EventEmitter.EventEmitter;
exports.Mapper = _Mapper.Mapper;
exports.isArray = _utils.isArray;
exports.isBoolean = _utils.isBoolean;
exports.isDefined = _utils.isDefined;
exports.isFunction = _utils.isFunction;
exports.isNull = _utils.isNull;
exports.isNumber = _utils.isNumber;
exports.isNumeric = _utils.isNumeric;
exports.isObject = _utils.isObject;
exports.isString = _utils.isString;
exports.isUndefined = _utils.isUndefined;
exports.clone = _utils.clone;
exports.optional = _utils.optional;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = timeout;

var _Defer = __webpack_require__(1);

var _Defer2 = _interopRequireDefault(_Defer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DEFAULT_TIME_INTERVAL = 0;

/**
 * Provide promise that will be resolved after time interval.
 *
 * @param {number} [timeInterval=0]
 * @return {Promise<*>}
 */
function timeout() {
  var timeInterval = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : DEFAULT_TIME_INTERVAL;

  var defer = new _Defer2.default();
  setTimeout(function () {
    return defer.resolve();
  }, timeInterval);
  return defer.promisify();
}

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = waitUntil;

var _Defer = __webpack_require__(1);

var _Defer2 = _interopRequireDefault(_Defer);

var _utils = __webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DEFAULT_TIME_INTERVAL = 0;

/**
 * Assert "callback" parameter.
 *
 * @param {*} callback
 * @return {void}
 * @throws TypeError
 */
function assertCallbackParameter(callback) {
    if (!(0, _utils.isFunction)(callback)) {
        throw new TypeError('The "callback" parameter should be a function.');
    }
}

/**
 * Provide promise that will be resolved when callback will return truthy value.
 *
 * @param {function} callback
 * @param {number} {timeInterval=0}
 * @return {Promise<*>}
 */
function waitUntil(callback) {
    var timeInterval = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : DEFAULT_TIME_INTERVAL;

    assertCallbackParameter(callback);
    var defer = new _Defer2.default();
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

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isArray;
/**
 * Determine if value is an array.
 *
 * @param {*} value
 * @return {boolean}
 */
function isArray(value) {
  return Array.isArray(value) || value instanceof Array;
}

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isBoolean;
/**
 * Determine if value is a boolean.
 *
 * @param {*} value
 * @return {boolean}
 */
function isBoolean(value) {
  return typeof value === "boolean" || value instanceof Boolean;
}

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isDefined;

var _isUndefined = __webpack_require__(4);

var _isUndefined2 = _interopRequireDefault(_isUndefined);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Determine if value is not undefined.
 *
 * @param {*} value
 * @return {boolean}
 */
function isDefined(value) {
  return !(0, _isUndefined2.default)(value);
}

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isFunction;
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

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isNull;
/**
 * Determine if value is a null.
 *
 * @param {*} value
 * @return {boolean}
 */
function isNull(value) {
  return value === null;
}

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isNumber;
/**
 * Determine if value is a number.
 *
 * @param {*} value
 * @return {boolean}
 */
function isNumber(value) {
  return typeof value === "number" || value instanceof Number;
}

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isNumeric;
/**
 * Determine if value is a number or numeric string.
 *
 * @param {*} value
 * @return {boolean}
 */
function isNumeric(value) {
  return !isNaN(parseFloat(value)) && isFinite(value);
}

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.default = isObject;
/**
 * Determine if value is an object and not null.
 *
 * @param {*} value
 * @param {boolean} value
 * @return {boolean}
 */
function isObject(value) {
  return (typeof value === "undefined" ? "undefined" : _typeof(value)) === "object" && value !== null;
}

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isString;
/**
 * Determine if value is a string.
 *
 * @param {*} value
 * @return {boolean}
 */
function isString(value) {
  return typeof value === "string" || value instanceof String;
}

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; /* eslint-disable */

exports.default = clone;

var _types = __webpack_require__(2);

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
 * @param {object} value
 * @returns {object}
 * @throws Error
 */
function cloneObject(value) {
    // Overidden clone method.
    if (value.clone && (0, _types.isFunction)(value.clone)) {
        return value.clone();
    }
    // DOM node object.
    else if (value.nodeType && (0, _types.isFunction)(value.cloneNode)) {
            return value.cloneNode(true);
        }
        // Object literal.
        else if ((0, _types.isUndefined)(value.prototype)) {
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
 * @param {function} value
 * @returns {function}
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
    if ((0, _types.isUndefined)(value)) {
        return cloneUndefined(value);
    } else if ((0, _types.isNull)(value)) {
        return cloneNull(value);
    } else if ((0, _types.isBoolean)(value)) {
        return cloneBoolean(value);
    } else if ((0, _types.isNumber)(value)) {
        return cloneNumber(value);
    } else if ((0, _types.isString)(value)) {
        return cloneString(value);
    } else if ((0, _types.isArray)(value)) {
        return cloneArray(value);
    } else if (value instanceof Map) {
        return cloneMap(value);
    } else if (value instanceof Date) {
        return cloneDate(value);
    } else if (value instanceof RegExp) {
        return cloneRegExp(value);
    } else if ((0, _types.isObject)(value)) {
        return cloneObject(value);
    } else if ((0, _types.isFunction)(value)) {
        return cloneFunction(value);
    }

    throw new Error("Unable to clone the " + (typeof value === "undefined" ? "undefined" : _typeof(value)) + ".");
}

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = optional;

var _types = __webpack_require__(2);

/**
 * Retrieve the result of callback call. If an error occurred or result is undefined return a default value instead.
 *
 * @param {function} callback
 * @param {*} defaultValue
 * @return {*}
 */
function optional(callback) {
    var defaultValue = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;

    try {
        var value = callback();
        if ((0, _types.isDefined)(value)) {
            return value;
        }
        return defaultValue;
    } catch (error) {
        return defaultValue;
    }
}

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DependencyContainer = undefined;

var _DependencyContainer = __webpack_require__(21);

var _DependencyContainer2 = _interopRequireDefault(_DependencyContainer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.DependencyContainer = _DependencyContainer2.default;

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _utils = __webpack_require__(0);

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Assert "identifier" parameter.
 *
 * @param {*} identifier
 * @return {void}
 * @throws TypeError
 */
function assertIdentifierParameter(identifier) {
    if (!(0, _utils.isString)(identifier)) {
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
    if (!(0, _utils.isFunction)(type)) {
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
    if (!(0, _utils.isArray)(dependencies)) {
        throw new TypeError('The "dependencies" parameter should be an array.');
    }
    dependencies.forEach(function (dependency) {
        if (!(0, _utils.isString)(dependency) && !(0, _utils.isFunction)(dependency)) {
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
    if (!(0, _utils.isBoolean)(singleton)) {
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
    if (!(0, _utils.isBoolean)(factory)) {
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
    if ((0, _utils.isUndefined)(instance)) {
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
     * @param {object} binding
     * @return {*}
     * @private
     */


    _createClass(DependencyContainer, [{
        key: '_createInstance',
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
        key: '_resolveDependencies',
        value: function _resolveDependencies(dependencies) {
            var _this = this;

            return dependencies.map(function (dependency) {
                if ((0, _utils.isString)(dependency)) {
                    return _this.get(dependency);
                } else if ((0, _utils.isFunction)(dependency)) {
                    return dependency();
                }
                throw new TypeError("Invalid dependency type.");
            });
        }

        /**
         * Register a new binding in the container.
         *
         * @param {string} identifier
         * @param {function|*} type
         * @param {object} options
         * @param {Array<string|Function>} options.dependencies
         * @param {boolean} options.singleton
         * @param {boolean} options.factory
         * @return {DependencyContainer}
         */

    }, {
        key: 'registerBinding',
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
                throw new Error('Invalid number of dependencies were specified for "' + identifier + '".');
            }

            // Check for circular dependencies.
            dependencies.forEach(function (dependency) {
                if (dependency === identifier) {
                    throw new Error('Circular dependency detected. ' + identifier + ' depends on itself.');
                }

                if ((0, _utils.isDefined)(_this2._bindings[dependency])) {
                    _this2._bindings[dependency].dependencies.forEach(function (innerDependency) {
                        if (innerDependency === identifier) {
                            throw new Error("Circular dependency detected. " + ('"' + identifier + '" depends on "' + dependency + '" and vise versa.'));
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
        key: 'registerInstance',
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
        key: 'removeBinding',
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
        key: 'has',
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
        key: 'get',
        value: function get(identifier) {
            assertIdentifierParameter(identifier);
            if (!this.has(identifier)) {
                throw new Error('The "' + identifier + '" binding not found.');
            }
            var binding = this._bindings[identifier];
            if ((0, _utils.isDefined)(binding.instance)) {
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

exports.default = DependencyContainer;

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EventEmitter = undefined;

var _EventEmitter = __webpack_require__(23);

var _EventEmitter2 = _interopRequireDefault(_EventEmitter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.EventEmitter = _EventEmitter2.default;

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(setImmediate) {

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _utils = __webpack_require__(0);

var _async = __webpack_require__(3);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Assert "eventName" parameter.
 *
 * @param {*} eventName
 * @return {void}
 * @throws TypeError
 */
function assertEventNameParameter(eventName) {
    if (!(0, _utils.isString)(eventName)) {
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
    if (!(0, _utils.isFunction)(listener)) {
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


    _createClass(EventEmitter, [{
        key: "_callEventListeners",
        value: function _callEventListeners(eventName, payload) {
            assertEventNameParameter(eventName);
            var listeners = this._events[eventName];
            if ((0, _utils.isUndefined)(listeners)) {
                return [];
            }
            return listeners.map(function (listener) {
                return listener(payload);
            });
        }

        /**
         * Synchronously call each of the listeners registered for the event named eventName.
         *
         * @param {string} eventName
         * @param {*} payload
         * @return {void}
         */

    }, {
        key: "emit",
        value: function emit(eventName, payload) {
            this._callEventListeners(eventName, payload);
        }

        /**
         * Asynchronously call each of the listeners registered for the event named eventName.
         *
         * @param {string} eventName
         * @param {*} payload
         * @return {Promise<Array<*>>} - A promise that will be resolved when each of the listeners will be resolved.
         */

    }, {
        key: "emitAsync",
        value: function emitAsync(eventName, payload) {
            var _this = this;

            var defer = new _async.Defer();
            setImmediate(function () {
                Promise.all(_this._callEventListeners(eventName, payload)).then(defer.resolve).catch(defer.reject);
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

    }, {
        key: "on",
        value: function on(eventName, listener) {
            var _this2 = this;

            assertEventNameParameter(eventName);
            assertListenerParameter(listener);
            if ((0, _utils.isUndefined)(this._events[eventName])) {
                this._events[eventName] = [];
            }
            this._events[eventName].push(listener);
            return function () {
                _this2._events[eventName] = _this2._events[eventName].filter(function (eventListener) {
                    return eventListener !== listener;
                });
                // Remove event listeners property to optimize memory usage.
                if (!_this2._events[eventName].length) {
                    delete _this2._events[eventName];
                }
            };
        }
    }]);

    return EventEmitter;
}();

exports.default = EventEmitter;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(24).setImmediate))

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {var scope = (typeof global !== "undefined" && global) ||
            (typeof self !== "undefined" && self) ||
            window;
var apply = Function.prototype.apply;

// DOM APIs, for completeness

exports.setTimeout = function() {
  return new Timeout(apply.call(setTimeout, scope, arguments), clearTimeout);
};
exports.setInterval = function() {
  return new Timeout(apply.call(setInterval, scope, arguments), clearInterval);
};
exports.clearTimeout =
exports.clearInterval = function(timeout) {
  if (timeout) {
    timeout.close();
  }
};

function Timeout(id, clearFn) {
  this._id = id;
  this._clearFn = clearFn;
}
Timeout.prototype.unref = Timeout.prototype.ref = function() {};
Timeout.prototype.close = function() {
  this._clearFn.call(scope, this._id);
};

// Does not start the time, just sets up the members needed.
exports.enroll = function(item, msecs) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = msecs;
};

exports.unenroll = function(item) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = -1;
};

exports._unrefActive = exports.active = function(item) {
  clearTimeout(item._idleTimeoutId);

  var msecs = item._idleTimeout;
  if (msecs >= 0) {
    item._idleTimeoutId = setTimeout(function onTimeout() {
      if (item._onTimeout)
        item._onTimeout();
    }, msecs);
  }
};

// setimmediate attaches itself to the global object
__webpack_require__(25);
// On some exotic environments, it's not clear which object `setimmediate` was
// able to install onto.  Search each possibility in the same order as the
// `setimmediate` library.
exports.setImmediate = (typeof self !== "undefined" && self.setImmediate) ||
                       (typeof global !== "undefined" && global.setImmediate) ||
                       (this && this.setImmediate);
exports.clearImmediate = (typeof self !== "undefined" && self.clearImmediate) ||
                         (typeof global !== "undefined" && global.clearImmediate) ||
                         (this && this.clearImmediate);

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(5)))

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global, process) {(function (global, undefined) {
    "use strict";

    if (global.setImmediate) {
        return;
    }

    var nextHandle = 1; // Spec says greater than zero
    var tasksByHandle = {};
    var currentlyRunningATask = false;
    var doc = global.document;
    var registerImmediate;

    function setImmediate(callback) {
      // Callback can either be a function or a string
      if (typeof callback !== "function") {
        callback = new Function("" + callback);
      }
      // Copy function arguments
      var args = new Array(arguments.length - 1);
      for (var i = 0; i < args.length; i++) {
          args[i] = arguments[i + 1];
      }
      // Store and register the task
      var task = { callback: callback, args: args };
      tasksByHandle[nextHandle] = task;
      registerImmediate(nextHandle);
      return nextHandle++;
    }

    function clearImmediate(handle) {
        delete tasksByHandle[handle];
    }

    function run(task) {
        var callback = task.callback;
        var args = task.args;
        switch (args.length) {
        case 0:
            callback();
            break;
        case 1:
            callback(args[0]);
            break;
        case 2:
            callback(args[0], args[1]);
            break;
        case 3:
            callback(args[0], args[1], args[2]);
            break;
        default:
            callback.apply(undefined, args);
            break;
        }
    }

    function runIfPresent(handle) {
        // From the spec: "Wait until any invocations of this algorithm started before this one have completed."
        // So if we're currently running a task, we'll need to delay this invocation.
        if (currentlyRunningATask) {
            // Delay by doing a setTimeout. setImmediate was tried instead, but in Firefox 7 it generated a
            // "too much recursion" error.
            setTimeout(runIfPresent, 0, handle);
        } else {
            var task = tasksByHandle[handle];
            if (task) {
                currentlyRunningATask = true;
                try {
                    run(task);
                } finally {
                    clearImmediate(handle);
                    currentlyRunningATask = false;
                }
            }
        }
    }

    function installNextTickImplementation() {
        registerImmediate = function(handle) {
            process.nextTick(function () { runIfPresent(handle); });
        };
    }

    function canUsePostMessage() {
        // The test against `importScripts` prevents this implementation from being installed inside a web worker,
        // where `global.postMessage` means something completely different and can't be used for this purpose.
        if (global.postMessage && !global.importScripts) {
            var postMessageIsAsynchronous = true;
            var oldOnMessage = global.onmessage;
            global.onmessage = function() {
                postMessageIsAsynchronous = false;
            };
            global.postMessage("", "*");
            global.onmessage = oldOnMessage;
            return postMessageIsAsynchronous;
        }
    }

    function installPostMessageImplementation() {
        // Installs an event handler on `global` for the `message` event: see
        // * https://developer.mozilla.org/en/DOM/window.postMessage
        // * http://www.whatwg.org/specs/web-apps/current-work/multipage/comms.html#crossDocumentMessages

        var messagePrefix = "setImmediate$" + Math.random() + "$";
        var onGlobalMessage = function(event) {
            if (event.source === global &&
                typeof event.data === "string" &&
                event.data.indexOf(messagePrefix) === 0) {
                runIfPresent(+event.data.slice(messagePrefix.length));
            }
        };

        if (global.addEventListener) {
            global.addEventListener("message", onGlobalMessage, false);
        } else {
            global.attachEvent("onmessage", onGlobalMessage);
        }

        registerImmediate = function(handle) {
            global.postMessage(messagePrefix + handle, "*");
        };
    }

    function installMessageChannelImplementation() {
        var channel = new MessageChannel();
        channel.port1.onmessage = function(event) {
            var handle = event.data;
            runIfPresent(handle);
        };

        registerImmediate = function(handle) {
            channel.port2.postMessage(handle);
        };
    }

    function installReadyStateChangeImplementation() {
        var html = doc.documentElement;
        registerImmediate = function(handle) {
            // Create a <script> element; its readystatechange event will be fired asynchronously once it is inserted
            // into the document. Do so, thus queuing up the task. Remember to clean up once it's been called.
            var script = doc.createElement("script");
            script.onreadystatechange = function () {
                runIfPresent(handle);
                script.onreadystatechange = null;
                html.removeChild(script);
                script = null;
            };
            html.appendChild(script);
        };
    }

    function installSetTimeoutImplementation() {
        registerImmediate = function(handle) {
            setTimeout(runIfPresent, 0, handle);
        };
    }

    // If supported, we should attach to the prototype of global, since that is where setTimeout et al. live.
    var attachTo = Object.getPrototypeOf && Object.getPrototypeOf(global);
    attachTo = attachTo && attachTo.setTimeout ? attachTo : global;

    // Don't get fooled by e.g. browserify environments.
    if ({}.toString.call(global.process) === "[object process]") {
        // For Node.js before 0.9
        installNextTickImplementation();

    } else if (canUsePostMessage()) {
        // For non-IE10 modern browsers
        installPostMessageImplementation();

    } else if (global.MessageChannel) {
        // For web workers, where supported
        installMessageChannelImplementation();

    } else if (doc && "onreadystatechange" in doc.createElement("script")) {
        // For IE 6–8
        installReadyStateChangeImplementation();

    } else {
        // For older browsers
        installSetTimeoutImplementation();
    }

    attachTo.setImmediate = setImmediate;
    attachTo.clearImmediate = clearImmediate;
}(typeof self === "undefined" ? typeof global === "undefined" ? this : global : self));

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(5), __webpack_require__(26)))

/***/ }),
/* 26 */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Mapper = undefined;

var _Mapper = __webpack_require__(28);

var _Mapper2 = _interopRequireDefault(_Mapper);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.Mapper = _Mapper2.default;

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _utils = __webpack_require__(0);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Assert "from" parameter.
 *
 * @param {*} from
 * @return {void}
 * @throws TypeError
 */
function assertFromParameter(from) {
    if (!(0, _utils.isString)(from)) {
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
    if (!(0, _utils.isString)(to)) {
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
    if (!(0, _utils.isFunction)(resolver)) {
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
        key: '_assertResolver',
        value: function _assertResolver(from, to) {
            if ((0, _utils.isUndefined)(this._resolvers[from])) {
                throw new Error('Resolver for "' + from + '" not found.');
            }
            if ((0, _utils.isUndefined)(this._resolvers[from][to])) {
                throw new Error('Resolver for "' + to + '" not found.');
            }
        }

        /**
         * Register the resolver function for from-to mapping.
         *
         * @param {string} from
         * @param {string} to
         * @param {function} resolver
         * @return {Mapper}
         */

    }, {
        key: 'registerResolver',
        value: function registerResolver(from, to, resolver) {
            assertFromParameter(from);
            assertToParameter(to);
            assertResolverParameter(resolver);
            if ((0, _utils.isUndefined)(this._resolvers[from])) {
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
        key: 'hasResolver',
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
        key: 'removeResolver',
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
        key: 'map',
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

exports.default = Mapper;

/***/ })
/******/ ]);
//# sourceMappingURL=index.js.map