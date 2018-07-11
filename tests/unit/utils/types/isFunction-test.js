"use strict";

const assert = require("assert");
const faker = require("faker");
const {isFunction} = require("../../../../src");

describe("isFunction function test", function() {
    it("should return true", function() {
        assert(isFunction(() => faker.lorem.word()));
    });

    it("should return false", function() {
        assert(!isFunction([]));
        assert(!isFunction(faker.random.boolean()));
        assert(!isFunction(null));
        assert(!isFunction(faker.random.number()));
        assert(!isFunction(String(faker.random.number())));
        assert(!isFunction({}));
        assert(!isFunction(faker.lorem.word()));
        assert(!isFunction(undefined));
    });
});
