"use strict";

const isArray = require("./isArray");
const isBoolean = require("./isBoolean");
const isFunction = require("./isFunction");
const isNull = require("./isNull");
const isNumber = require("./isNumber");
const isNumeric = require("./isNumeric");
const isObject = require("./isObject");
const isString = require("./isString");
const isUndefined = require("./isUndefined");

module.exports = Object.freeze({
    isArray,
    isBoolean,
    isFunction,
    isNull,
    isNumber,
    isNumeric,
    isObject,
    isString,
    isUndefined
});