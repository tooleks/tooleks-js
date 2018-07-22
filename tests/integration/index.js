import {expect} from "chai";

export default function(library) {
    describe("library module test", function() {
        it("should have a proper api", function() {
            expect(library.Defer).to.be.a("function");
            expect(library.timeout).to.be.a("function");
            expect(library.waitUntil).to.be.a("function");
            expect(library.DependencyContainer).to.be.a("function");
            expect(library.EventEmitter).to.be.a("function");
            expect(library.Mapper).to.be.a("function");
            expect(library.isArray).to.be.a("function");
            expect(library.isBoolean).to.be.a("function");
            expect(library.isDefined).to.be.a("function");
            expect(library.isFunction).to.be.a("function");
            expect(library.isNull).to.be.a("function");
            expect(library.isNumber).to.be.a("function");
            expect(library.isNumeric).to.be.a("function");
            expect(library.isObject).to.be.a("function");
            expect(library.isString).to.be.a("function");
            expect(library.isUndefined).to.be.a("function");
            expect(library.clone).to.be.a("function");
            expect(library.optional).to.be.a("function");
        });
    });
}
