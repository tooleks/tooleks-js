"use strict";

const expect = require("chai").expect;
const sinon = require("sinon");
const Defer = require("../../../src").Defer;

describe("Defer class test", function() {
    let defer, resolvedValue, rejectedValue, spyOnResolveListener, spyOnRejectListener;

    beforeEach(function() {
        defer = new Defer();
        resolvedValue = "resolvedValue";
        rejectedValue = new Error("rejectedValue");
        spyOnResolveListener = sinon.spy();
        spyOnRejectListener = sinon.spy();
    });

    it("should have a proper api", function() {
        expect(defer).to.be.an.instanceof(Defer);
        expect(defer.resolve).to.be.a("function");
        expect(defer.reject).to.be.a("function");
        expect(defer.onResolve).to.be.a("function");
        expect(defer.onReject).to.be.a("function");
        expect(defer.promisify).to.be.a("function");
    });

    it("should resolve a valid value before resolving via onResolve", function() {
        defer.onResolve(spyOnResolveListener);
        defer.resolve(resolvedValue);
        sinon.assert.calledOnce(spyOnResolveListener);
        sinon.assert.calledWith(spyOnResolveListener, resolvedValue);
    });

    it("should resolve a valid value before resolving via onResolve", function() {
        defer.resolve(resolvedValue);
        defer.onResolve(spyOnResolveListener);
        sinon.assert.calledOnce(spyOnResolveListener);
        sinon.assert.calledWith(spyOnResolveListener, resolvedValue);
    });

    it("should reject a valid value before resolving via onResolve", function() {
        defer.onReject(spyOnRejectListener);
        defer.reject(rejectedValue);
        sinon.assert.calledOnce(spyOnRejectListener);
        sinon.assert.calledWith(spyOnRejectListener, rejectedValue);
    });

    it("should reject a valid value before resolving via onResolve", function() {
        defer.reject(rejectedValue);
        defer.onReject(spyOnRejectListener);
        sinon.assert.calledOnce(spyOnRejectListener);
        sinon.assert.calledWith(spyOnRejectListener, rejectedValue);
    });

    it("should resolve a valid value before resolving via promisify", function(done) {
        defer
            .promisify()
            .then(spyOnResolveListener)
            .then(() => {
                sinon.assert.calledOnce(spyOnResolveListener);
                sinon.assert.calledWith(spyOnResolveListener, resolvedValue);
                done();
            });
        defer.resolve(resolvedValue);
    });

    it("should resolve a valid value before resolving via promisify", function(done) {
        defer.resolve(resolvedValue);
        defer
            .promisify()
            .then(spyOnResolveListener)
            .then(() => {
                sinon.assert.calledOnce(spyOnResolveListener);
                sinon.assert.calledWith(spyOnResolveListener, resolvedValue);
                done();
            });
    });

    it("should resolve a valid value before rejecting via promisify", function(done) {
        defer
            .promisify()
            .then(spyOnRejectListener)
            .then(() => {
                sinon.assert.calledOnce(spyOnRejectListener);
                sinon.assert.calledWith(spyOnRejectListener, resolvedValue);
                done();
            });
        defer.resolve(resolvedValue);
    });

    it("should resolve a valid value before rejecting via promisify", function(done) {
        defer.resolve(resolvedValue);
        defer
            .promisify()
            .then(spyOnRejectListener)
            .then(() => {
                sinon.assert.calledOnce(spyOnRejectListener);
                sinon.assert.calledWith(spyOnRejectListener, resolvedValue);
                done();
            });
    });

    it("should resolve but not reject", function() {
        defer.onResolve(spyOnResolveListener);
        defer.onReject(spyOnRejectListener);
        defer.resolve(resolvedValue);
        defer.onResolve(spyOnResolveListener);
        defer.onReject(spyOnRejectListener);
        sinon.assert.calledTwice(spyOnResolveListener);
        sinon.assert.calledWith(spyOnResolveListener, resolvedValue);
        sinon.assert.callCount(spyOnRejectListener, 0);
    });

    it("should reject but not resolve", function() {
        defer.onResolve(spyOnResolveListener);
        defer.onReject(spyOnRejectListener);
        defer.reject(rejectedValue);
        defer.onResolve(spyOnResolveListener);
        defer.onReject(spyOnRejectListener);
        sinon.assert.calledTwice(spyOnRejectListener);
        sinon.assert.calledWith(spyOnRejectListener, rejectedValue);
        sinon.assert.callCount(spyOnResolveListener, 0);
    });
});
