"use strict";

const assert = require("assert");
const faker = require("faker");
const sinon = require("sinon");
const {EventEmitter} = require("../../../src");

describe("EventEmitter class test", function() {
    let eventEmitter, eventName, payload, listener;

    beforeEach(function() {
        eventEmitter = new EventEmitter();
        eventName = faker.lorem.word();
        payload = {};
        listener = sinon.spy();
    });

    it("should subscribe to event", function() {
        eventEmitter.on(eventName, listener);
        eventEmitter.emit(eventName, payload);
        assert(listener.calledOnce);
        assert(listener.calledWith(payload));
    });

    it("should unsubscribe from event", function() {
        const unsubscribe = eventEmitter.on(eventName, listener);
        eventEmitter.emit(eventName, payload);
        assert(listener.calledOnce);
        unsubscribe();
        eventEmitter.emit(eventName, payload);
        assert(listener.calledOnce);
    });
});
