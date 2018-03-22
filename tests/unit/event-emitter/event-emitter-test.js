"use strict";

const expect = require("chai").expect;
const sinon = require("sinon");
const EventEmitter = require("../../../src").EventEmitter;

describe("EventEmitter class test", function() {
    let eventEmitter, eventName, payload, spyListener;

    beforeEach(function() {
        eventEmitter = new EventEmitter();
        eventName = "eventName";
        payload = {};
        spyListener = sinon.spy();
    });

    it("should have a proper api", function() {
        expect(eventEmitter).to.be.an.instanceof(EventEmitter);
        expect(eventEmitter.emit).to.be.a("function");
        expect(eventEmitter.on).to.be.a("function");
    });

    it("should subscribe to event", function() {
        eventEmitter.on(eventName, spyListener);
        eventEmitter.emit(eventName, payload);
        sinon.assert.calledOnce(spyListener);
        sinon.assert.calledWith(spyListener, payload);
    });

    it("should unsubscribe from event", function() {
        const unsubscribe = eventEmitter.on(eventName, spyListener);
        eventEmitter.emit(eventName, payload);
        sinon.assert.calledOnce(spyListener);
        unsubscribe();
        eventEmitter.emit(eventName, payload);
        sinon.assert.calledOnce(spyListener);
    });
});
