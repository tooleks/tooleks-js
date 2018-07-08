"use strict";

const assert = require("assert");
const sinon = require("sinon");
const faker = require("faker");
const {Defer} = require("../../../src");

describe("Defer class test", function() {
    let defer, resolvedValue, rejectedValue, resolve, reject;

    beforeEach(function() {
        defer = new Defer();
        resolvedValue = faker.lorem.word();
        rejectedValue = new Error(faker.lorem.sentence());
        resolve = sinon.spy();
        reject = sinon.spy();
    });

    it("should resolve a valid value before resolving via promisify", function(done) {
        defer
            .promisify()
            .then(resolve)
            .then(() => {
                assert(resolve.calledOnce);
                assert(resolve.calledWith(resolvedValue));
                done();
            })
            .catch(() => assert(false, "Should not throw an error."));

        defer.resolve(resolvedValue);
    });

    it("should resolve a valid value after resolving via promisify", function(done) {
        defer.resolve(resolvedValue);

        defer
            .promisify()
            .then(resolve)
            .then(() => {
                assert(resolve.calledOnce);
                assert(resolve.calledWith(resolvedValue));
                done();
            })
            .catch(() => assert(false, "Should not throw an error."));
    });

    it("should reject a valid value before rejecting via promisify", function(done) {
        defer
            .promisify()
            .catch(reject)
            .then(() => {
                assert(reject.calledOnce);
                assert(reject.calledWith(rejectedValue));
                done();
            })
            .catch(() => assert(false, "Should not throw an error."));

        defer.reject(rejectedValue);
    });

    it("should reject a valid value after rejecting via promisify", function(done) {
        defer.reject(rejectedValue);

        defer
            .promisify()
            .catch(reject)
            .then(() => {
                assert(reject.calledOnce);
                assert(reject.calledWith(rejectedValue));
                done();
            })
            .catch(() => assert(false, "Should not throw an error."));
    });
});
