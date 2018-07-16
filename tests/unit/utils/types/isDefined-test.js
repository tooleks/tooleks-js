"use strict";

const assert = require("assert");
const faker = require("faker");
const {isDefined} = require("../../../../src");

describe("isDefined function test", function() {
    it("should return true", function() {
        assert(isDefined([]));
        assert(isDefined(faker.random.boolean()));
        assert(isDefined(() => faker.lorem.word()));
        assert(isDefined(null));
        assert(isDefined(faker.random.number()));
        assert(isDefined(String(faker.random.number())));
        assert(isDefined({}));
        assert(isDefined(faker.lorem.word()));
    });

    it("should return false", function() {
        assert(!isDefined(undefined));
    });
});
