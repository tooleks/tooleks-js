import assert from "assert";
import faker from "faker";

export default function({isUndefined}) {
    describe("isUndefined function test", function() {
        it("should return true", function() {
            assert(isUndefined(undefined));
        });

        it("should return false", function() {
            assert(!isUndefined([]));
            assert(!isUndefined(faker.random.boolean()));
            assert(!isUndefined(() => faker.lorem.word()));
            assert(!isUndefined(null));
            assert(!isUndefined(faker.random.number()));
            assert(!isUndefined(String(faker.random.number())));
            assert(!isUndefined({}));
            assert(!isUndefined(faker.lorem.word()));
        });
    });
}
