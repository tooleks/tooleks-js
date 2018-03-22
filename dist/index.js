/*! Copyright (C) 2018 Oleksandr Tolochko. */
(function(e, a) { for(var i in a) e[i] = a[i]; }(exports, /******/ (function(modules) { // webpackBootstrap
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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/defer/defer.js":
/*!****************************!*\
  !*** ./src/defer/defer.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\n/**\n * Defer class.\n */\n\nclass Defer {\n    /**\n     * Defer constructor.\n     */\n    constructor() {\n        this._resolved = false;\n        this._rejected = false;\n        this._resolveListeners = [];\n        this._rejectListeners = [];\n    }\n\n    /**\n     * Call a callback function with a deferred value.\n     *\n     * @param callback\n     * @return {void}\n     * @private\n     */\n    _callCallback(callback) {\n        if (typeof callback === \"function\") {\n            callback(this._defferedValue);\n        }\n    }\n\n    /**\n     * Determine if a defer is resolved.\n     *\n     * @return {Boolean}\n     * @private\n     */\n    _isResolved() {\n        return this._resolved;\n    }\n\n    /**\n     * Determine if a defer is rejected.\n     *\n     * @return {Boolean}\n     * @private\n     */\n    _isRejected() {\n        return this._rejected;\n    }\n\n    /**\n     * Determine if a defer is resolved or rejected.\n     *\n     * @return {Boolean}\n     * @private\n     */\n    _isResolvedOrRejected() {\n        return this._isResolved() || this._isRejected();\n    }\n\n    /**\n     * Resolve a defer with a value.\n     *\n     * @param {*} value\n     * @return {void}\n     */\n    resolve(value) {\n        if (this._isResolvedOrRejected()) {\n            return;\n        }\n\n        this._defferedValue = value;\n        this._resolved = true;\n        this._resolveListeners.forEach(listener => this._callCallback(listener));\n        this._resolveListeners = [];\n    }\n\n    /**\n     * Reject a defer with an error.\n     *\n     * @param {*} error\n     * @return {void}\n     */\n    reject(error) {\n        if (this._isResolvedOrRejected()) {\n            return;\n        }\n\n        this._defferedValue = error;\n        this._rejected = true;\n        this._rejectListeners.forEach(listener => this._callCallback(listener));\n        this._rejectListeners = [];\n    }\n\n    /**\n     * Add the listener function to the end of the resolve listeners array.\n     * If a defer is already resolved a listener function will be called immediately.\n     *\n     * @param {Function} listener\n     * @return {void}\n     */\n    onResolve(listener) {\n        if (typeof listener !== \"function\") {\n            throw new TypeError(\"listener should be a function.\");\n        }\n\n        if (this._isResolved()) {\n            this._callCallback(listener);\n        } else {\n            this._resolveListeners.push(listener);\n        }\n    }\n\n    /**\n     * Add the listener function to the end of the reject listeners array.\n     * If a defer is already rejected a listener function will be called immediately.\n     *\n     * @param {Function} listener\n     * @return {void}\n     */\n    onReject(listener) {\n        if (typeof listener !== \"function\") {\n            throw new TypeError(\"listener should be a function.\");\n        }\n\n        if (this._isRejected()) {\n            this._callCallback(listener);\n        } else {\n            this._rejectListeners.push(listener);\n        }\n    }\n\n    /**\n     * Get a promise which will be resolved or rejected with a deferred value.\n     *\n     * @return {Promise<any>}\n     */\n    promisify() {\n        return new Promise((resolve, reject) => {\n            this.onResolve(resolve);\n            this.onReject(reject);\n        });\n    }\n}\n\nmodule.exports = Defer;\n\n//# sourceURL=webpack:///./src/defer/defer.js?");

/***/ }),

/***/ "./src/defer/index.js":
/*!****************************!*\
  !*** ./src/defer/index.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nconst Defer = __webpack_require__(/*! ./defer */ \"./src/defer/defer.js\");\n\nmodule.exports = Defer;\n\n//# sourceURL=webpack:///./src/defer/index.js?");

/***/ }),

/***/ "./src/event-emitter/event-emitter.js":
/*!********************************************!*\
  !*** ./src/event-emitter/event-emitter.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\n/**\n * EventEmitter class.\n */\n\nclass EventEmitter {\n    /**\n     * EventEmitter constructor.\n     */\n    constructor() {\n        this._events = {};\n    }\n\n    /**\n     * Synchronously call each of the listeners registered for the event named eventName.\n     *\n     * @param {String} eventName\n     * @param {*} payload\n     * @return {void}\n     */\n    emit(eventName, payload) {\n        if (typeof eventName !== \"string\") {\n            throw new TypeError(\"eventName should be a string.\");\n        }\n\n        const event = this._events[eventName];\n\n        if (typeof event !== \"undefined\") {\n            event.forEach(listener => listener(payload));\n        }\n    }\n\n    /**\n     * Add the listener function to the end of the listeners array for the event named eventName.\n     *\n     * @param {String} eventName\n     * @param {Function} listener\n     * @return {Function} - A function to remove the listener function from the listeners array for the event named eventName.\n     */\n    on(eventName, listener) {\n        if (typeof eventName !== \"string\") {\n            throw new TypeError(\"eventName should be a string.\");\n        }\n\n        if (typeof listener !== \"function\") {\n            throw new TypeError(\"listener should be a function.\");\n        }\n\n        if (typeof this._events[eventName] === \"undefined\") {\n            this._events[eventName] = [];\n        }\n\n        this._events[eventName].push(listener);\n\n        return () => {\n            this._events[eventName] = this._events[eventName].filter(eventListener => eventListener !== listener);\n        };\n    }\n}\n\nmodule.exports = EventEmitter;\n\n//# sourceURL=webpack:///./src/event-emitter/event-emitter.js?");

/***/ }),

/***/ "./src/event-emitter/index.js":
/*!************************************!*\
  !*** ./src/event-emitter/index.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nconst EventEmitter = __webpack_require__(/*! ./event-emitter */ \"./src/event-emitter/event-emitter.js\");\n\nmodule.exports = EventEmitter;\n\n//# sourceURL=webpack:///./src/event-emitter/index.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nconst Defer = __webpack_require__(/*! ./defer */ \"./src/defer/index.js\");\nconst EventEmitter = __webpack_require__(/*! ./event-emitter */ \"./src/event-emitter/index.js\");\nconst Mapper = __webpack_require__(/*! ./mapper */ \"./src/mapper/index.js\");\nconst optional = __webpack_require__(/*! ./optional */ \"./src/optional/index.js\");\n\nmodule.exports = Object.freeze({ Defer, EventEmitter, Mapper, optional });\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/mapper/index.js":
/*!*****************************!*\
  !*** ./src/mapper/index.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nconst Mapper = __webpack_require__(/*! ./mapper */ \"./src/mapper/mapper.js\");\n\nmodule.exports = Mapper;\n\n//# sourceURL=webpack:///./src/mapper/index.js?");

/***/ }),

/***/ "./src/mapper/mapper.js":
/*!******************************!*\
  !*** ./src/mapper/mapper.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\n/**\n * Mapper class.\n */\n\nclass Mapper {\n    /**\n     * Mapper constructor.\n     */\n    constructor() {\n        this._resolvers = {};\n    }\n\n    /**\n     * Get a list of resolvers.\n     *\n     * @return {Object}\n     */\n    getResolvers() {\n        return this._resolvers;\n    }\n\n    /**\n     * Register the resolver function for from-to mapping.\n     *\n     * @param {String} from\n     * @param {String} to\n     * @param {Function} resolver\n     * @return {void}\n     */\n    registerResolver(from, to, resolver) {\n        if (typeof from !== \"string\") {\n            throw new TypeError(\"From parameter should be a string.\");\n        }\n        if (typeof to !== \"string\") {\n            throw new TypeError(\"To parameter should be a string.\");\n        }\n        if (typeof resolver !== \"function\") {\n            throw new TypeError(\"Resolver parameter should be a string.\");\n        }\n        if (typeof this._resolvers[from] === \"undefined\") {\n            this._resolvers[from] = {};\n        }\n        this._resolvers[from][to] = resolver;\n    }\n\n    /**\n     * Remove the resolver function for from-to mapping.\n     *\n     * @param {String} from\n     * @param {String} to\n     * @return {void}\n     */\n    removeResolver(from, to) {\n        delete this._resolvers[from][to];\n    }\n\n    /**\n     * Assert that the resolver function for from-to mapping exists.\n     *\n     * @param {String} from\n     * @param {String} to\n     * @return {void}\n     * @private\n     */\n    _assertResolver(from, to) {\n        if (typeof this.getResolvers()[from] === \"undefined\") {\n            throw new Error(`Resolver for \"${from}\" not found.`);\n        }\n        if (typeof this.getResolvers()[from][to] === \"undefined\") {\n            throw new Error(`Resolver for \"${to}\" not found.`);\n        }\n    }\n\n    /**\n     * Determine that the resolver function for from-to mapping is registered.\n     *\n     * @param {String} from\n     * @param {String} to\n     * @return {Boolean}\n     */\n    hasResolver(from, to) {\n        try {\n            this._assertResolver(from, to);\n            return true;\n        } catch (error) {\n            return false;\n        }\n    }\n\n    /**\n     * Map value by using from-to resolver function.\n     *\n     * @param {*} value\n     * @param {String} from\n     * @param {String} to\n     * @return {*}\n     */\n    map(value, from, to) {\n        this._assertResolver(from, to);\n        const resolver = this.getResolvers()[from][to];\n        return resolver(value);\n    }\n}\n\nmodule.exports = Mapper;\n\n//# sourceURL=webpack:///./src/mapper/mapper.js?");

/***/ }),

/***/ "./src/optional/index.js":
/*!*******************************!*\
  !*** ./src/optional/index.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nconst optional = __webpack_require__(/*! ./optional */ \"./src/optional/optional.js\");\n\nmodule.exports = optional;\n\n//# sourceURL=webpack:///./src/optional/index.js?");

/***/ }),

/***/ "./src/optional/optional.js":
/*!**********************************!*\
  !*** ./src/optional/optional.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\n/**\n * Retrieve the result of callback call. If an error occurred return a default value instead.\n *\n * @param {Function} callback\n * @param {*} defaultValue\n * @return {*}\n */\n\nfunction optional(callback, defaultValue = undefined) {\n    try {\n        return callback();\n    } catch (error) {\n        return defaultValue;\n    }\n}\n\nmodule.exports = optional;\n\n//# sourceURL=webpack:///./src/optional/optional.js?");

/***/ })

/******/ })));