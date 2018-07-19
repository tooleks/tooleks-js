"use strict";

const assert = require("assert");
const faker = require("faker");
const {isNumber} = require("../../../../dist");

describe("isNumber function test", function() {
    it("should return true", function() {
        assert(isNumber(faker.random.number()));
        assert(isNumber(new Number(faker.random.number())));
    });

    it("should return false", function() {
        assert(!isNumber([]));
        assert(!isNumber(faker.random.boolean()));
        assert(!isNumber(() => faker.lorem.word()));
        assert(!isNumber(null));
        assert(!isNumber(String(faker.random.number())));
        assert(!isNumber({}));
        assert(!isNumber(faker.lorem.word()));
        assert(!isNumber(undefined));
    });
});
