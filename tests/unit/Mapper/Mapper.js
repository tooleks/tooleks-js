import assert from "assert";
import {expect} from "chai";
import sinon from "sinon";
import faker from "faker";

export default function({Mapper}) {
    describe("Mapper class test", function() {
        let mapper, from, to, value, resolverValue, resolver;

        beforeEach(function() {
            mapper = new Mapper();
            from = faker.random.uuid();
            to = faker.random.uuid();
            value = {};
            resolverValue = {};
            resolver = sinon.spy(() => resolverValue);
        });

        it("should return this on register/remove resolver", function() {
            expect(mapper.registerResolver(from, to, resolver)).to.be.equal(mapper);
            expect(mapper.removeResolver(from, to)).to.be.equal(mapper);
        });

        it("should not throw error on register resolver with valid values", function() {
            expect(() => mapper.registerResolver(from, to, resolver)).to.not.throw();
        });

        it("should throw type error on register resolver with invalid `from` value", function() {
            try {
                mapper.registerResolver({}, to, resolver);
                assert(false, "Whoops! An error should be thrown here.");
            } catch (error) {
                expect(error).to.be.an.instanceof(TypeError);
                expect(error.message).to.be.equal(`The "from" parameter should be a string.`);
            }
        });

        it("should throw type error on register resolver with invalid `to` value", function() {
            try {
                mapper.registerResolver(from, {}, resolver);
                assert(false, "Whoops! An error should be thrown here.");
            } catch (error) {
                expect(error).to.be.an.instanceof(TypeError);
                expect(error.message).to.be.equal(`The "to" parameter should be a string.`);
            }
        });

        it("should throw type error on register resolver with invalid `resolver` value", function() {
            try {
                mapper.registerResolver(from, to, {});
                assert(false, "Whoops! An error should be thrown here.");
            } catch (error) {
                expect(error).to.be.an.instanceof(TypeError);
                expect(error.message).to.be.equal(`The "resolver" parameter should be a function.`);
            }
        });

        it("should register resolver", function() {
            assert(!mapper.hasResolver(from, to));
            mapper.registerResolver(from, to, resolver);
            assert(mapper.hasResolver(from, to));
        });

        it("should remove resolver", function() {
            mapper.registerResolver(from, to, resolver);
            assert(mapper.hasResolver(from, to));
            mapper.removeResolver(from, to);
            assert(!mapper.hasResolver(from, to));
        });

        it("should map value", function() {
            mapper.registerResolver(from, to, resolver);
            const result = mapper.map(value, from, to);
            assert(resolver.calledOnce);
            assert(resolver.calledWith(value));
            expect(result).to.equal(resolverValue);
        });

        it("should throw an error on map value with invalid `from` value", function() {
            mapper.registerResolver(from, to, resolver);
            let _from = faker.random.uuid();
            try {
                mapper.map(value, _from, to);
                assert(false, "Whoops! An error should be thrown here.");
            } catch (error) {
                expect(error).to.be.an.instanceof(Error);
                expect(error.message).to.be.equal(`Resolver for "${_from}" not found.`);
            }
        });

        it("should throw an error on map value with invalid `to` value", function() {
            mapper.registerResolver(from, to, resolver);
            let _to = faker.random.uuid();
            try {
                mapper.map(value, from, _to);
                assert(false, "Whoops! An error should be thrown here.");
            } catch (error) {
                expect(error).to.be.an.instanceof(Error);
                expect(error.message).to.be.equal(`Resolver for "${_to}" not found.`);
            }
        });
    });
}
