import assert from "assert";
import faker from "faker";

export default function({isArray}) {
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
}
