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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/ext-clone/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/ext-clone/ext-clone.js":
/*!************************************!*\
  !*** ./src/ext-clone/ext-clone.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("/* eslint-disable */\n\n\nfunction enable() {\n    Boolean.prototype.clone = function () {\n        return Boolean(this);\n    };\n\n    Number.prototype.clone = function () {\n        return Number(this);\n    };\n\n    String.prototype.clone = function () {\n        return String(this);\n    };\n\n    Array.prototype.clone = function () {\n        return this.map(item => {\n            if (typeof item !== \"undefined\" && item !== null) {\n                return item.clone();\n            } else {\n                return item;\n            }\n        });\n    };\n\n    Map.prototype.clone = function () {\n        return new Map(Array.from(this).clone());\n    };\n\n    Date.prototype.clone = function () {\n        return new Date(this.getTime());\n    };\n\n    Object.prototype.clone = function () {\n        if (this.nodeType && typeof this.cloneNode === \"function\") {\n            // DOM node object.\n            return this.cloneNode(true);\n        } else if (!this.prototype) {\n            // Object literal.\n            const clone = {};\n            for (let propertyName in this) {\n                if (this.hasOwnProperty(propertyName)) {\n                    const property = this[propertyName];\n                    if (typeof property !== \"undefined\" && property !== null) {\n                        clone[propertyName] = property.clone();\n                    } else {\n                        clone[propertyName] = property;\n                    }\n                }\n            }\n            return clone;\n        }\n\n        throw new Error(\"Unable to clone the object.\");\n    };\n\n    Function.prototype.clone = function () {\n        const self = this;\n        const clone = function () {\n            return self.apply(this, arguments);\n        };\n        for (let key in this) {\n            if (this.hasOwnProperty(key)) {\n                clone[key] = this[key];\n            }\n        }\n        return clone;\n    };\n}\n\nfunction disable() {\n    Boolean.prototype.clone = undefined;\n    Number.prototype.clone = undefined;\n    String.prototype.clone = undefined;\n    Array.prototype.clone = undefined;\n    Map.prototype.clone = undefined;\n    Date.prototype.clone = undefined;\n    Object.prototype.clone = undefined;\n    Function.prototype.clone = undefined;\n}\n\nfunction getTypes() {\n    return [Boolean, Number, String, Array, Map, Date, Object, Function];\n}\n\nmodule.exports = Object.freeze({ enable, disable, getTypes });\n\n//# sourceURL=webpack:///./src/ext-clone/ext-clone.js?");

/***/ }),

/***/ "./src/ext-clone/index.js":
/*!********************************!*\
  !*** ./src/ext-clone/index.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nconst extensionClone = __webpack_require__(/*! ./ext-clone */ \"./src/ext-clone/ext-clone.js\");\n\nmodule.exports = extensionClone;\n\n//# sourceURL=webpack:///./src/ext-clone/index.js?");

/***/ })

/******/ })));