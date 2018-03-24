"use strict";

const webpack = require("webpack");

module.exports = {
    mode: process.env.NODE_ENV || "production",
    output: {
        filename: "[name].js",
        // TODO: Replace with "umd" when https://github.com/webpack/webpack/issues/6784 will be fixed.
        libraryTarget: "commonjs",
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                },
            },
        ],
    },
    plugins: [new webpack.BannerPlugin("Copyright (C) 2018 Oleksandr Tolochko.")],
};
