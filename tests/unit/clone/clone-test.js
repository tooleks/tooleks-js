"use strict";

const assert = require("assert");
const {expect} = require("chai");
const faker = require("faker");
const {clone} = require("../../../src");

describe("clone function test", function() {
    it("should clone undefined", function() {
        let result = clone(undefined);
        expect(result).to.be.an("undefined");
    });

    it("should clone null", function() {
        let result = clone(null);
        expect(result).to.be.a("null");
    });

    it("should clone boolean", function() {
        let _boolean = faker.random.boolean();
        let result = clone(_boolean);
        expect(result).to.be.a("boolean");
        expect(result).to.be.equal(_boolean);
    });

    it("should clone number", function() {
        let _number = faker.random.number();
        let result = clone(_number);
        expect(result).to.be.a("number");
        expect(result).to.be.equal(_number);
    });

    it("should clone string", function() {
        let _string = faker.lorem.sentence();
        let result = clone(_string);
        expect(result).to.be.a("string");
        expect(result).to.be.equal(_string);
    });

    it("should clone Array", function() {
        let _array;
        let result;

        // Array of primitives.
        _array = [faker.random.number(), faker.random.boolean(), faker.lorem.sentence()];
        result = clone(_array);
        expect(result).to.be.an.instanceof(Array);
        expect(result).to.not.equal(_array);
        expect(result[0]).to.equal(_array[0]);
        expect(result[1]).to.equal(_array[1]);
        expect(result[2]).to.equal(_array[2]);

        // Array of object literals.
        _array = [{value: faker.random.number()}, {value: faker.random.boolean()}, {value: faker.lorem.sentence()}];
        result = clone(_array);
        expect(result).to.be.an.instanceof(Array);
        expect(result).to.not.equal(_array);
        expect(result[0]).to.not.equal(_array[0]);
        expect(result[1]).to.not.equal(_array[1]);
        expect(result[2]).to.not.equal(_array[2]);
    });

    it("should clone Map", function() {
        let _map = new Map();
        _map.set("value", faker.random.number());
        let result = clone(_map);
        expect(result).to.be.an.instanceof(Map);
        expect(result).to.not.equal(_map);
        expect(result.get("value")).to.be.equal(_map.get("value"));
    });

    it("should clone Date", function() {
        let _date = new Date();
        let result = clone(_date);
        expect(result).to.be.an.instanceof(Date);
        expect(result).to.not.equal(_date);
        expect(result.valueOf()).to.be.equal(_date.valueOf());
    });

    it("should clone RegExp", function() {
        let pattern = "[^0-9]";
        let _regExp;
        let result;

        // No flags.
        _regExp = new RegExp(pattern);
        result = clone(_regExp);
        expect(result).to.be.an.instanceof(RegExp);
        expect(result.source).to.be.equal(pattern);
        assert(!result.global);
        assert(!result.ignoreCase);
        assert(!result.multiline);

        // Global flag.
        _regExp = new RegExp(pattern, "g");
        result = clone(_regExp);
        expect(result).to.be.an.instanceof(RegExp);
        expect(result.source).to.be.equal(pattern);
        assert(result.global);
        assert(!result.ignoreCase);
        assert(!result.multiline);

        // Ignore case flag.
        _regExp = new RegExp(pattern, "i");
        result = clone(_regExp);
        expect(result).to.be.an.instanceof(RegExp);
        expect(result.source).to.be.equal(pattern);
        assert(!result.global);
        assert(result.ignoreCase);
        assert(!result.multiline);

        // Multiline flag.
        _regExp = new RegExp(pattern, "m");
        result = clone(_regExp);
        expect(result).to.be.an.instanceof(RegExp);
        expect(result.source).to.be.equal(pattern);
        assert(!result.global);
        assert(!result.ignoreCase);
        assert(result.multiline);

        // All flags.
        _regExp = new RegExp(pattern, "gim");
        result = clone(_regExp);
        expect(result).to.be.an.instanceof(RegExp);
        expect(result.source).to.be.equal(pattern);
        assert(result.global);
        assert(result.ignoreCase);
        assert(result.multiline);
    });

    it("should clone Object", function() {
        let _object = {};
        let result = clone(_object);
        expect(result).to.be.an("object");
        expect(result).to.not.equal(_object);
    });

    it("should clone Function", function() {
        let _functionResult = faker.random.number();
        function _function() {
            return _functionResult;
        }
        let result = clone(_function);
        expect(result).to.be.a("function");
        expect(result).to.not.equal(_function);
        expect(result()).to.be.equal(_function());
    });

    it("should clone class instance", function() {
        let _Class = function(value) {
            this.value = value;
            this.clone = () => {
                let value = clone(this.value);
                return new _Class(value);
            };
        };
        let _classInstance = new _Class({});
        let result = clone(_classInstance);
        expect(result).to.be.an.instanceof(_Class);
        expect(result).to.not.equal(_classInstance);
        expect(result.value).to.not.equal(_classInstance.value);
        expect(result.clone).to.not.equal(_classInstance.clone);
    });
});
