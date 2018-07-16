"use strict";

const assert = require("assert");
const faker = require("faker");
const sinon = require("sinon");
const {EventEmitter} = require("../../../src");

describe("EventEmitter class test", function() {
    let eventEmitter, eventName, payload, syncListener, asyncListener, asyncListenerResolve;

    beforeEach(function() {
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

    it("should synchronously emit event", function() {
        eventEmitter.on(eventName, syncListener);
        eventEmitter.emit(eventName, payload);
        assert(syncListener.calledOnce);
        assert(syncListener.calledWith(payload));
    });

    it("should synchronously unsubscribe from event", function() {
        const off = eventEmitter.on(eventName, syncListener);
        eventEmitter.emit(eventName, payload);
        assert(syncListener.calledOnce);
        off();
        eventEmitter.emit(eventName, payload);
        assert(syncListener.calledOnce);
    });

    it("should asynchronously emit event", async function() {
        eventEmitter.on(eventName, asyncListener);
        await eventEmitter.emitAsync(eventName, payload);
        assert(asyncListener.calledOnce);
        assert(asyncListener.calledWith(payload));
        assert(asyncListenerResolve.calledOnce);
    });

    it("should asynchronously unsubscribe from event", async function() {
        const off = eventEmitter.on(eventName, asyncListener);
        await eventEmitter.emitAsync(eventName, payload);
        assert(asyncListener.calledOnce);
        assert(asyncListener.calledWith(payload));
        assert(asyncListenerResolve.calledOnce);
        off();
        assert(asyncListener.calledOnce);
        assert(asyncListenerResolve.calledOnce);
    });
});
