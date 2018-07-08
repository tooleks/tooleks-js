"use strict";

const assert = require("assert");
const {expect} = require("chai");
const sinon = require("sinon");
const faker = require("faker");
const {Mapper} = require("../../../src");

describe("Mapper class test", function() {
    let mapper, from, to, value, resolverValue, resolver, resolverSpy;

    beforeEach(function() {
        mapper = new Mapper();
        from = faker.lorem.word();
        to = faker.lorem.word();
        value = {};
        resolverValue = {};
        resolver = () => resolverValue;
        resolverSpy = sinon.spy(resolver);
    });

    it("should return this on register/remove resolver", function() {
        expect(mapper.registerResolver(from, to, resolverSpy)).to.be.equal(mapper);
        expect(mapper.removeResolver(from, to)).to.be.equal(mapper);
    });

    it("should not throw error on register resolver with valid values", function() {
        expect(() => mapper.registerResolver(from, to, resolverSpy)).to.not.throw();
    });

    it("should throw type error on register resolver with invalid `from` value", function() {
        expect(() => mapper.registerResolver({}, to, resolverSpy)).to.throw();
    });

    it("should throw type error on register resolver with invalid `to` value", function() {
        expect(() => mapper.registerResolver(from, {}, resolverSpy)).to.throw();
    });

    it("should throw type error on register resolver with invalid `resolver` value", function() {
        expect(() => mapper.registerResolver(from, to, {})).to.throw();
    });

    it("should register resolver", function() {
        expect(mapper.hasResolver(from, to)).to.equal(false);
        mapper.registerResolver(from, to, resolverSpy);
        expect(mapper.hasResolver(from, to)).to.equal(true);
    });

    it("should remove resolver", function() {
        mapper.registerResolver(from, to, resolverSpy);
        expect(mapper.hasResolver(from, to)).to.equal(true);
        mapper.removeResolver(from, to);
        expect(mapper.hasResolver(from, to)).to.equal(false);
    });

    it("should map value", function() {
        mapper.registerResolver(from, to, resolverSpy);
        const result = mapper.map(value, from, to);
        assert(resolverSpy.calledOnce);
        assert(resolverSpy.calledWith(value));
        expect(result).to.equal(resolverValue);
    });

    it("should throw an error on map value with invalid `from` value", function() {
        mapper.registerResolver(from, to, resolverSpy);
        expect(() => mapper.map(value, faker.lorem.sentence(), to)).to.throw();
    });

    it("should throw an error on map value with invalid `to` value", function() {
        mapper.registerResolver(from, to, resolverSpy);
        expect(() => mapper.map(value, from, faker.lorem.sentence())).to.throw();
    });
});
