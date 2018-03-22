"use strict";

const expect = require("chai").expect;
const optional = require("../../../src").optional;

describe("optional function test", function() {
    let object, customValue;

    beforeEach(function() {
        object = {};
        customValue = "value";
    });

    it("should have a proper api", function() {
        expect(optional).to.be.a("function");
    });

    it("should throw an Error on an undefined property call", function() {
        expect(() => optional(() => object.propertyName1.propertyName2)).to.not.throw();
    });

    it("should return default value on an undefined property call", function() {
        expect(optional(() => object.propertyName1.propertyName2)).to.be.undefined;
    });

    it("should return custom value on an undefined property call", function() {
        expect(optional(() => object.propertyName1.propertyName2, customValue)).to.be.deep.equal(customValue);
    });

    it("should throw an Error on an undefined function call", function() {
        expect(() => optional(() => object.functionName())).to.not.throw();
    });

    it("should return default value on an undefined function call", function() {
        expect(optional(() => object.functionName())).to.be.undefined;
    });

    it("should return custom value on an undefined function call", function() {
        expect(optional(() => object.functionName(), customValue)).to.be.deep.equal(customValue);
    });
});
