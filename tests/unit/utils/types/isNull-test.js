"use strict";

const assert = require("assert");
const faker = require("faker");
const {isNull} = require("../../../../dist");

describe("isNull function test", function() {
    it("should return true", function() {
        assert(isNull(null));
    });

    it("should return false", function() {
        assert(!isNull([]));
        assert(!isNull(faker.random.boolean()));
        assert(!isNull(() => faker.lorem.word()));
        assert(!isNull(faker.random.number()));
        assert(!isNull(String(faker.random.number())));
        assert(!isNull({}));
        assert(!isNull(faker.lorem.word()));
        assert(!isNull(undefined));
    });
});
