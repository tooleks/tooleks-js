"use strict";

const assert = require("assert");
const faker = require("faker");
const {isNumeric} = require("../../../src");

describe("isNumeric function test", function() {
    it("should return true", function() {
        assert(isNumeric(faker.random.number()));
        assert(isNumeric(String(faker.random.number())));
    });

    it("should return false", function() {
        assert(!isNumeric([]));
        assert(!isNumeric(faker.random.boolean()));
        assert(!isNumeric(() => faker.lorem.word()));
        assert(!isNumeric(null));
        assert(!isNumeric(NaN));
        assert(!isNumeric(Infinity));
        assert(!isNumeric({}));
        assert(!isNumeric(faker.lorem.word()));
        assert(!isNumeric(undefined));
    });
});
