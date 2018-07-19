"use strict";

const assert = require("assert");
const faker = require("faker");
const {isString} = require("../../../../dist");

describe("isString function test", function() {
    it("should return true", function() {
        assert(isString(String(faker.random.number())));
        assert(isString(faker.lorem.word()));
        assert(isString(new String(faker.lorem.word())));
    });

    it("should return false", function() {
        assert(!isString([]));
        assert(!isString(faker.random.boolean()));
        assert(!isString(() => faker.lorem.word()));
        assert(!isString(null));
        assert(!isString(faker.random.number()));
        assert(!isString({}));
        assert(!isString(undefined));
    });
});
