"use strict";

const expect = require("chai").expect;

describe("index module test", function() {
    it("should have a proper api", function() {
        expect(require("../../dist").clone).to.be.a("function");
        expect(require("../../dist").Defer).to.be.a("function");
        expect(require("../../dist").DependencyContainer).to.be.a("function");
        expect(require("../../dist").EventEmitter).to.be.a("function");
        expect(require("../../dist").Mapper).to.be.a("function");
        expect(require("../../dist").optional).to.be.a("function");
    });
});
