"use strict";

const path = require("path");
const merge = require("webpack-merge");
const commonConfig = require("./common.config");

module.exports = merge(commonConfig, {
    entry: {
        "ext-clone": path.resolve(__dirname, "../src/ext-clone/index.js"),
    },
    output: {
        path: path.resolve(__dirname, "../dist"),
    },
});
