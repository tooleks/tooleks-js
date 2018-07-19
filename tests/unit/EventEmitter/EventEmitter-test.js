"use strict";

const assert = require("assert");
const faker = require("faker");
const sinon = require("sinon");
const {EventEmitter} = require("../../../dist");

describe("EventEmitter class test", function() {
    let clock;
    let eventEmitter;
    let firstEventName;
    let secondEventName;
    let payload;
    let firstEventSyncListener;
    let firstEventAsyncListener;
    let firstEventAsyncListenerResolve;
    let secondEventSyncListener;
    let secondEventAsyncListener;
    let secondEventAsyncListenerResolve;

    beforeEach(function() {
        clock = sinon.useFakeTimers();
        eventEmitter = new EventEmitter();
        firstEventName = faker.lorem.word();
        secondEventName = faker.lorem.word();
        payload = {};
        firstEventSyncListener = sinon.spy();
        firstEventAsyncListenerResolve = sinon.spy();
        firstEventAsyncListener = sinon.spy(() => {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    firstEventAsyncListenerResolve();
                    resolve();
                }, 100);
            });
        });
        secondEventSyncListener = sinon.spy();
        secondEventAsyncListenerResolve = sinon.spy();
        secondEventAsyncListener = sinon.spy(() => {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    secondEventAsyncListenerResolve();
                    resolve();
                }, 100);
            });
        });
    });

    afterEach(function() {
        clock.restore();
    });

    it("should emit sync event", function() {
        eventEmitter.on(firstEventName, firstEventSyncListener);
        eventEmitter.on(secondEventName, secondEventSyncListener);
        eventEmitter.emit(firstEventName, payload);

        assert(firstEventSyncListener.calledOnce);
        assert(firstEventSyncListener.calledWith(payload));
        assert(secondEventSyncListener.notCalled);
    });

    it("should unsubscribe from sync event", function() {
        const off = eventEmitter.on(firstEventName, firstEventSyncListener);
        eventEmitter.on(secondEventName, secondEventSyncListener);
        eventEmitter.emit(firstEventName, payload);

        assert(firstEventSyncListener.calledOnce);
        assert(secondEventSyncListener.notCalled);

        off();

        eventEmitter.emit(firstEventName, payload);

        assert(firstEventSyncListener.calledOnce);
        assert(secondEventSyncListener.notCalled);
    });

    it("should emit async event", function() {
        eventEmitter.on(firstEventName, firstEventAsyncListener);
        eventEmitter.on(secondEventName, secondEventAsyncListener);
        eventEmitter.emitAsync(firstEventName, payload);

        assert(firstEventAsyncListener.notCalled);
        assert(firstEventAsyncListenerResolve.notCalled);
        assert(secondEventAsyncListener.notCalled);
        assert(secondEventAsyncListenerResolve.notCalled);

        clock.tick(50);

        assert(firstEventAsyncListener.calledOnce);
        assert(firstEventAsyncListener.calledWith(payload));
        assert(firstEventAsyncListenerResolve.notCalled);
        assert(secondEventAsyncListener.notCalled);
        assert(secondEventAsyncListenerResolve.notCalled);

        clock.tick(50);

        assert(firstEventAsyncListener.calledOnce);
        assert(firstEventAsyncListenerResolve.calledOnce);
        assert(secondEventAsyncListener.notCalled);
        assert(secondEventAsyncListenerResolve.notCalled);
    });

    it("should unsubscribe from async event", function() {
        const off = eventEmitter.on(firstEventName, firstEventAsyncListener);
        eventEmitter.on(secondEventName, secondEventAsyncListener);
        eventEmitter.on(secondEventName, secondEventSyncListener);

        eventEmitter.emitAsync(firstEventName, payload);

        assert(firstEventAsyncListener.notCalled);
        assert(firstEventAsyncListenerResolve.notCalled);
        assert(secondEventAsyncListener.notCalled);
        assert(secondEventAsyncListenerResolve.notCalled);

        clock.tick(50);

        assert(firstEventAsyncListener.calledOnce);
        assert(firstEventAsyncListenerResolve.notCalled);
        assert(secondEventAsyncListener.notCalled);
        assert(secondEventAsyncListenerResolve.notCalled);

        clock.tick(50);

        assert(firstEventAsyncListener.calledOnce);
        assert(firstEventAsyncListenerResolve.calledOnce);
        assert(secondEventAsyncListener.notCalled);
        assert(secondEventAsyncListenerResolve.notCalled);

        off();

        eventEmitter.emitAsync(firstEventName, payload);

        clock.tick(50);

        assert(firstEventAsyncListener.calledOnce);
        assert(firstEventAsyncListener.calledOnce);
        assert(secondEventAsyncListener.notCalled);
        assert(secondEventAsyncListenerResolve.notCalled);

        clock.tick(50);

        assert(firstEventAsyncListener.calledOnce);
        assert(firstEventAsyncListener.calledOnce);
        assert(secondEventAsyncListener.notCalled);
        assert(secondEventAsyncListenerResolve.notCalled);
    });
});
