"use strict";

const expect = require("chai").expect;
const sinon = require("sinon");

const providers = [require("../../../src").Mapper, require("../../../dist").Mapper];

providers.forEach((Mapper) => {
    describe("Mapper class test", function() {
        let mapper, from, to, spyResolver, value;

        beforeEach(function() {
            mapper = new Mapper();
            from = "api.v1.user";
            to = "app.user";
            spyResolver = sinon.spy();
            value = {};
        });

        it("should have a proper api", function() {
            expect(mapper).to.be.an.instanceof(Mapper);
            expect(mapper.getResolvers).to.be.a("function");
            expect(mapper.registerResolver).to.be.a("function");
            expect(mapper.removeResolver).to.be.a("function");
            expect(mapper.hasResolver).to.be.a("function");
            expect(mapper.map).to.be.a("function");
        });

        it("should return this on register/remove resolver", function() {
            expect(mapper.registerResolver(from, to, spyResolver)).to.be.equal(mapper);
            expect(mapper.removeResolver(from, to)).to.be.equal(mapper);
        });

        it("should not throw error on register resolver with valid values", function() {
            expect(() => mapper.registerResolver(from, to, spyResolver)).to.not.throw();
        });

        it("should throw type error on register resolver with invalid `from` value", function() {
            expect(() => mapper.registerResolver({}, to, spyResolver)).to.throw();
        });

        it("should throw type error on register resolver with invalid `to` value", function() {
            expect(() => mapper.registerResolver(from, {}, spyResolver)).to.throw();
        });

        it("should throw type error on register resolver with invalid `resolver` value", function() {
            expect(() => mapper.registerResolver(from, to, {})).to.throw();
        });

        it("should register resolver", function() {
            expect(mapper.getResolvers()).to.deep.equal({});
            expect(mapper.hasResolver(from, to)).to.equal(false);
            mapper.registerResolver(from, to, spyResolver);
            expect(mapper.hasResolver(from, to)).to.equal(true);
        });

        it("should remove resolver", function() {
            mapper.registerResolver(from, to, spyResolver);
            expect(mapper.hasResolver(from, to)).to.equal(true);
            mapper.removeResolver(from, to);
            expect(mapper.hasResolver(from, to)).to.equal(false);
        });

        it("should get resolvers", function() {
            mapper.registerResolver(from, to, spyResolver);
            expect(mapper.getResolvers()).to.deep.equal({[from]: {[to]: spyResolver}});
        });

        it("should map value", function() {
            mapper.registerResolver(from, to, spyResolver);
            const result = mapper.map(value, from, to);
            sinon.assert.calledOnce(spyResolver);
            sinon.assert.calledWith(spyResolver, value);
            expect(result).to.deep.equal(spyResolver(value));
        });

        it("should throw an error on map value with invalid `from` value", function() {
            mapper.registerResolver(from, to, spyResolver);
            expect(() => mapper.map(value, "api.v1.comment", to)).to.throw();
        });

        it("should throw an error on map value with invalid `to` value", function() {
            mapper.registerResolver(from, to, spyResolver);
            expect(() => mapper.map(value, from, "app.comment")).to.throw();
        });
    });
});
