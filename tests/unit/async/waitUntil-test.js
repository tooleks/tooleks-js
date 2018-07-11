"use strict";

const assert = require("assert");
const {expect} = require("chai");
const sinon = require("sinon");
const {waitUntil} = require("../../../src");

describe("waitUntil function test", function() {
    let clock;
    let callbackValue;
    let callbackError;

    beforeEach(function() {
        clock = sinon.useFakeTimers();
        sinon.spy(clock, "setInterval");
        sinon.spy(clock, "clearInterval");
        callbackValue = false;
        callbackError = new Error();
    });

    afterEach(function() {
        clock.restore();
    });

    it("should resolve promise after callback return truthy value", function(done) {
        waitUntil(() => callbackValue, 1)
            .then((value) => {
                expect(value).to.be.equal(callbackValue);
                assert(clock.setInterval.calledOnce);
                assert(clock.clearInterval.calledOnce);
                expect(clock.now).to.be.equal(100);
                done();
            })
            .catch(done);

        clock.tick(50);
        callbackValue = {};
        clock.tick(50);
    });

    it("should reject promise when callback throws an error", function(done) {
        waitUntil(() => {
            throw callbackError;
        }, 1)
            .then(() => {
                done(new Error("Whoops! An error should be thrown here."));
            })
            .catch((error) => {
                expect(error).to.be.equal(callbackError);
                assert(clock.setInterval.calledOnce);
                assert(clock.clearInterval.notCalled);
                done();
            })
            .catch(done);

        clock.tick(50);
    });
});
