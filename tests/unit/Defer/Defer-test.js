"use strict";

const expect = require("chai").expect;
const sinon = require("sinon");

const providers = [require("../../../src").Defer, require("../../../dist").Defer];

providers.forEach((Defer) => {
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
            expect(defer.promisify).to.be.a("function");
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

        it("should resolve a valid value after resolving via promisify", function(done) {
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

        it("should reject a valid value before rejecting via promisify", function(done) {
            defer
                .promisify()
                .catch(spyOnRejectListener)
                .then(() => {
                    sinon.assert.calledOnce(spyOnRejectListener);
                    sinon.assert.calledWith(spyOnRejectListener, resolvedValue);
                    done();
                });
            defer.reject(resolvedValue);
        });

        it("should reject a valid value after rejecting via promisify", function(done) {
            defer.reject(resolvedValue);
            defer
                .promisify()
                .catch(spyOnRejectListener)
                .then(() => {
                    sinon.assert.calledOnce(spyOnRejectListener);
                    sinon.assert.calledWith(spyOnRejectListener, resolvedValue);
                    done();
                });
        });
    });
});
