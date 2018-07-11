"use strict";

const {expect} = require("chai");
const sinon = require("sinon");
const {timeout} = require("../../../src");

describe("timeout function test", function() {
    let clock;

    beforeEach(function() {
        clock = sinon.useFakeTimers();
    });

    afterEach(function() {
        clock.restore();
    });

    it("should resolve promise after default timeout", function(done) {
        timeout()
            .then(() => {
                expect(clock.now).to.be.equal(0);
                done();
            })
            .catch(done);

        clock.tick(0);
    });

    it("should resolve promise after timeout", function(done) {
        timeout(100)
            .then(() => {
                expect(clock.now).to.be.equal(100);
                done();
            })
            .catch(done);

        clock.tick(50);
        clock.tick(50);
    });
});
