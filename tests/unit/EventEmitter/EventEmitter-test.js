"use strict";

const assert = require("assert");
const faker = require("faker");
const sinon = require("sinon");
const {EventEmitter} = require("../../../src");

describe("EventEmitter class test", function() {
    let clock, eventEmitter, eventName, payload, syncListener, asyncListener, asyncListenerResolve;

    beforeEach(function() {
        clock = sinon.useFakeTimers();
        eventEmitter = new EventEmitter();
        eventName = faker.lorem.word();
        payload = {};
        syncListener = sinon.spy();
        asyncListenerResolve = sinon.spy();
        asyncListener = sinon.spy(() => {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    asyncListenerResolve();
                    resolve();
                }, 100);
            });
        });
    });

    afterEach(function() {
        clock.restore();
    });

    it("should emit sync event", function() {
        eventEmitter.on(eventName, syncListener);
        eventEmitter.emit(eventName, payload);
        assert(syncListener.calledOnce);
        assert(syncListener.calledWith(payload));
    });

    it("should unsubscribe from sync event", function() {
        const off = eventEmitter.on(eventName, syncListener);
        eventEmitter.emit(eventName, payload);
        assert(syncListener.calledOnce);
        off();
        eventEmitter.emit(eventName, payload);
        assert(syncListener.calledOnce);
    });

    it("should emit async event", function() {
        eventEmitter.on(eventName, asyncListener);
        eventEmitter.emitAsync(eventName, payload);
        assert(asyncListener.notCalled);
        assert(asyncListenerResolve.notCalled);
        clock.tick(50);
        assert(asyncListener.calledOnce);
        assert(asyncListener.calledWith(payload));
        assert(asyncListenerResolve.notCalled);
        clock.tick(50);
        assert(asyncListener.calledOnce);
        assert(asyncListenerResolve.calledOnce);
    });

    it("should unsubscribe from async event", function() {
        const off = eventEmitter.on(eventName, asyncListener);
        eventEmitter.emitAsync(eventName, payload);
        assert(asyncListener.notCalled);
        assert(asyncListenerResolve.notCalled);
        clock.tick(50);
        assert(asyncListener.calledOnce);
        assert(asyncListener.calledWith(payload));
        assert(asyncListenerResolve.notCalled);
        clock.tick(50);
        assert(asyncListener.calledOnce);
        assert(asyncListenerResolve.calledOnce);
        off();
        eventEmitter.emitAsync(eventName, payload);
        clock.tick(50);
        assert(asyncListener.calledOnce);
        assert(asyncListener.calledOnce);
        clock.tick(50);
        assert(asyncListener.calledOnce);
        assert(asyncListener.calledOnce);
    });
});
