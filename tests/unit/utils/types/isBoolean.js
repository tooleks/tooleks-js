import assert from "assert";
import faker from "faker";

export default function({isBoolean}) {
    describe("isBoolean function test", function() {
        it("should return true", function() {
            assert(isBoolean(faker.random.boolean()));
            assert(isBoolean(new Boolean(faker.random.boolean())));
        });

        it("should return false", function() {
            assert(!isBoolean([]));
            assert(!isBoolean(() => faker.lorem.word()));
            assert(!isBoolean(null));
            assert(!isBoolean(faker.random.number()));
            assert(!isBoolean(String(faker.random.number())));
            assert(!isBoolean({}));
            assert(!isBoolean(faker.lorem.word()));
            assert(!isBoolean(undefined));
        });
    });
}
