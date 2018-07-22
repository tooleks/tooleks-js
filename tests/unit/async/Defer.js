import assert from "assert";
import sinon from "sinon";
import faker from "faker";

export default function({Defer}) {
    describe("Defer class test", function() {
        let defer, resolvedValue, rejectedValue, resolve, reject;

        beforeEach(function() {
            defer = new Defer();
            resolvedValue = faker.lorem.word();
            rejectedValue = new Error(faker.lorem.sentence());
            resolve = sinon.spy();
            reject = sinon.spy();
        });

        it("should resolve a valid value before resolving via promisify", function(done) {
            defer
                .promisify()
                .then(resolve)
                .then(() => {
                    assert(resolve.calledOnce);
                    assert(resolve.calledWith(resolvedValue));
                    done();
                })
                .catch(done);

            defer.resolve(resolvedValue);
        });

        it("should resolve a valid value after resolving via promisify", function(done) {
            defer.resolve(resolvedValue);

            defer
                .promisify()
                .then(resolve)
                .then(() => {
                    assert(resolve.calledOnce);
                    assert(resolve.calledWith(resolvedValue));
                    done();
                })
                .catch(done);
        });

        it("should reject a valid value before rejecting via promisify", function(done) {
            defer
                .promisify()
                .catch(reject)
                .then(() => {
                    assert(reject.calledOnce);
                    assert(reject.calledWith(rejectedValue));
                    done();
                })
                .catch(done);

            defer.reject(rejectedValue);
        });

        it("should reject a valid value after rejecting via promisify", function(done) {
            defer.reject(rejectedValue);

            defer
                .promisify()
                .catch(reject)
                .then(() => {
                    assert(reject.calledOnce);
                    assert(reject.calledWith(rejectedValue));
                    done();
                })
                .catch(done);
        });
    });
}
