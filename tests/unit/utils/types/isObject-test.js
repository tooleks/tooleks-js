"use strict";

const assert = require("assert");
const faker = require("faker");
const {isObject} = require("../../../../src");

describe("isObject function test", function() {
    it("should return true", function() {
        assert(isObject([]));
        assert(isObject({}));
    });

    it("should return false", function() {
        assert(!isObject(faker.random.boolean()));
        assert(!isObject(() => faker.lorem.word()));
        assert(!isObject(null));
        assert(!isObject(faker.random.number()));
        assert(!isObject(String(faker.random.number())));
        assert(!isObject(faker.lorem.word()));
        assert(!isObject(undefined));
    });
});
