"use strict";

const expect = require("chai").expect;

describe("index module test", function() {
    it("should have a proper api", function() {
        expect(require("../../dist").Defer).to.be.a("function");
        expect(require("../../dist").timeout).to.be.a("function");
        expect(require("../../dist").waitUntil).to.be.a("function");
        expect(require("../../dist").DependencyContainer).to.be.a("function");
        expect(require("../../dist").EventEmitter).to.be.a("function");
        expect(require("../../dist").Mapper).to.be.a("function");
        expect(require("../../dist").isArray).to.be.a("function");
        expect(require("../../dist").isBoolean).to.be.a("function");
        expect(require("../../dist").isDefined).to.be.a("function");
        expect(require("../../dist").isFunction).to.be.a("function");
        expect(require("../../dist").isNull).to.be.a("function");
        expect(require("../../dist").isNumber).to.be.a("function");
        expect(require("../../dist").isNumeric).to.be.a("function");
        expect(require("../../dist").isObject).to.be.a("function");
        expect(require("../../dist").isString).to.be.a("function");
        expect(require("../../dist").isUndefined).to.be.a("function");
        expect(require("../../dist").clone).to.be.a("function");
        expect(require("../../dist").optional).to.be.a("function");
    });
});
