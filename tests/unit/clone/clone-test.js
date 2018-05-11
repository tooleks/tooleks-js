"use strict";

const expect = require("chai").expect;

const providers = [require("../../../src").clone, require("../../../dist").clone];

providers.forEach((clone) => {
    describe("clone function test", function() {
        let originalUndefined,
            originalNull,
            originalBoolean,
            originalNumber,
            originalString,
            originalDate,
            originalArrayOfPrimitives,
            originalArrayOfObjectLiterals,
            originalMap,
            originalObjectLiteral,
            originalFunction,
            OriginalClass;

        beforeEach(function() {
            originalUndefined = undefined;
            originalNull = null;
            originalBoolean = false;
            originalNumber = 42;
            originalString = "string";
            originalDate = new Date("December 17, 1994");
            originalArrayOfPrimitives = [1];
            originalArrayOfObjectLiterals = [{value: 1}];
            originalMap = new Map();
            originalMap.set("value", 1);
            originalObjectLiteral = {value: 1};
            originalFunction = (value) => value;
            OriginalClass = function(value) {
                this.value = value;
                this.clone = () => {
                    const value = clone(this.value);
                    return new OriginalClass(value);
                };
            };
        });

        it("should have a proper api", function() {
            expect(clone).to.be.a("function");
        });

        it("should clone undefined", function() {
            let clonedUndefined = clone(originalUndefined);
            expect(clonedUndefined).to.be.an("undefined");
        });

        it("should clone null", function() {
            let clonedNull = clone(originalNull);
            expect(clonedNull).to.be.a("null");
        });

        it("should clone boolean", function() {
            let clonedBoolean = clone(originalBoolean);
            expect(clonedBoolean).to.be.a("boolean");
            clonedBoolean = !originalBoolean;
            expect(clonedBoolean).to.not.equal(originalBoolean);
        });

        it("should clone number", function() {
            let clonedNumber = clone(originalNumber);
            expect(clonedNumber).to.be.a("number");
            clonedNumber++;
            expect(clonedNumber).to.not.equal(originalNumber);
        });

        it("should clone string", function() {
            let clonedString = clone(originalString);
            expect(clonedString).to.be.a("string");
            clonedString += "Suffix";
            expect(clonedString).to.not.equal(originalString);
        });

        it("should clone Array (of primitives)", function() {
            const clonedArrayOfPrimitives = clone(originalArrayOfPrimitives);
            expect(clonedArrayOfPrimitives).to.be.an.instanceof(Array);
            expect(clonedArrayOfPrimitives).to.not.equal(originalArrayOfPrimitives);
        });

        it("should clone Array (of Object literals)", function() {
            const clonedArrayOfObjectLiterals = clone(originalArrayOfObjectLiterals);
            expect(clonedArrayOfObjectLiterals).to.be.an.instanceof(Array);
            expect(clonedArrayOfObjectLiterals).to.not.equal(originalArrayOfObjectLiterals);
        });

        it("should clone Map", function() {
            const clonedMap = clone(originalMap);
            expect(clonedMap).to.be.an.instanceof(Map);
            expect(clonedMap).to.not.equal(originalMap);
        });

        it("should clone Date", function() {
            const clonedDate = clone(originalDate);
            expect(clonedDate).to.be.an.instanceof(Date);
            expect(clonedDate).to.not.equal(originalDate);
        });

        it("should clone Object literal", function() {
            const clonedObject = clone(originalObjectLiteral);
            expect(clonedObject).to.be.an("object");
            expect(clonedObject).to.not.equal(originalObjectLiteral);
        });

        it("should clone Function", function() {
            const clonedFunction = clone(originalFunction);
            expect(clonedFunction).to.be.a("function");
            expect(clonedFunction).to.not.equal(originalFunction);
            expect(clonedFunction(originalString)).to.equal(originalFunction(originalString));
        });

        it("should clone class instance", function() {
            const originalClassInstance = new OriginalClass(originalObjectLiteral);
            const clonedClassInstance = clone(originalClassInstance);
            expect(clonedClassInstance).to.be.an.instanceof(OriginalClass);
            expect(clonedClassInstance).to.not.equal(originalClassInstance);
            expect(clonedClassInstance.value).to.not.equal(originalClassInstance.value);
            expect(clonedClassInstance.clone).to.not.equal(originalClassInstance.clone);
        });
    });
});
