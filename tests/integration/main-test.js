"use strict";

const expect = require("chai").expect;

describe("main module test", function() {
    it("should have a proper api", function() {
        expect(require("../../dist").Defer).to.be.a("function");
        expect(require("../../dist").DependencyContainer).to.be.a("function");
        expect(require("../../dist").EventEmitter).to.be.a("function");
        expect(require("../../dist").Mapper).to.be.a("function");
        expect(require("../../dist").optional).to.be.a("function");
    });
});

describe("ext-clone module test", function() {
    it("should have a proper api", function() {
        expect(require("../../dist/ext-clone").enable).to.be.a("function");
        expect(require("../../dist/ext-clone").disable).to.be.a("function");
        expect(require("../../dist/ext-clone").isEnabled).to.be.a("function");
        expect(require("../../dist/ext-clone").getTypes).to.be.a("function");
    });
});
