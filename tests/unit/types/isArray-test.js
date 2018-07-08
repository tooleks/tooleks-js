"use strict";

const assert = require("assert");
const faker = require("faker");
const {isArray} = require("../../../src");

describe("isArray function test", function() {
    it("should return true", function() {
        assert(isArray([]));
    });

    it("should return false", function() {
        assert(!isArray(faker.random.boolean()));
        assert(!isArray(() => faker.lorem.word()));
        assert(!isArray(null));
        assert(!isArray(faker.random.number()));
        assert(!isArray(String(faker.random.number())));
        assert(!isArray({}));
        assert(!isArray(faker.lorem.word()));
        assert(!isArray(undefined));
    });
});
