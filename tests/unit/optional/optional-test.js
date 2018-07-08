"use strict";

const {expect} = require("chai");
const faker = require("faker");
const {optional} = require("../../../src");

describe("optional function test", function() {
    let target, defaultValue;

    beforeEach(function() {
        target = {};
        defaultValue = faker.lorem.word();
    });

    it("should throw an Error on an undefined property call", function() {
        expect(() => optional(() => target.undefinedProperty.undefinedProperty)).to.not.throw();
    });

    it("should return default value on an undefined property call", function() {
        expect(optional(() => target.undefinedProperty)).to.be.undefined;
        expect(optional(() => target.undefinedProperty.undefinedProperty)).to.be.undefined;
    });

    it("should return custom value on an undefined property call", function() {
        expect(optional(() => target.undefinedProperty, defaultValue)).to.be.equal(defaultValue);
        expect(optional(() => target.undefinedProperty.undefinedProperty, defaultValue)).to.be.equal(defaultValue);
    });

    it("should throw an Error on an undefined function call", function() {
        expect(() => optional(() => target.undefinedFunction())).to.not.throw();
    });

    it("should return default value on an undefined function call", function() {
        expect(optional(() => target.undefinedFunction())).to.be.undefined;
    });

    it("should return custom value on an undefined function call", function() {
        expect(optional(() => target.undefinedFunction(), defaultValue)).to.be.equal(defaultValue);
    });
});
