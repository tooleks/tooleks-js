import assert from "assert";
import faker from "faker";

export default function({isObject}) {
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
}
