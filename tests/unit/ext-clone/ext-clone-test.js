"use strict";

const expect = require("chai").expect;

const providers = [require("../../../src/ext-clone"), require("../../../dist/ext-clone")];

providers.forEach((extClone) => {
    describe("clone function test", function() {
        let originalBoolean,
            originalNumber,
            originalString,
            originalDate,
            originalArrayOfPrimitives,
            originalArrayOfObjectLiterals,
            originalMap,
            originalObjectLiteral,
            originalFunction;

        beforeEach(function() {
            extClone.enable();
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
        });

        afterEach(function() {
            extClone.disable();
        });

        it("should have a proper api", function() {
            expect(extClone).to.be.an("object");
            expect(extClone.enable).to.be.a("function");
            expect(extClone.disable).to.be.a("function");
            expect(extClone.getTypes).to.be.a("function");
        });

        it("should get types", function() {
            expect(extClone.getTypes()).to.be.an.instanceof(Array);
        });

        it("should enable/disable api", function() {
            extClone.disable();
            extClone.getTypes().forEach((type) => {
                expect(type.prototype.clone).to.be.undefined;
            });
            extClone.enable();
            extClone.getTypes().forEach((type) => {
                expect(type.prototype.clone).to.be.a("function");
            });
            extClone.disable();
            extClone.getTypes().forEach((type) => {
                expect(type.prototype.clone).to.be.undefined;
            });
        });

        it("should clone boolean", function() {
            let clonedBoolean = originalBoolean.clone();
            expect(clonedBoolean).to.be.a("boolean");
            clonedBoolean = !originalBoolean;
            expect(clonedBoolean).to.not.deep.equal(originalBoolean);
        });

        it("should clone number", function() {
            let clonedNumber = originalNumber.clone();
            expect(clonedNumber).to.be.a("number");
            clonedNumber++;
            expect(clonedNumber).to.not.deep.equal(originalNumber);
        });

        it("should clone string", function() {
            let clonedString = originalString.clone();
            expect(clonedString).to.be.a("string");
            clonedString += "Suffix";
            expect(clonedString).to.not.deep.equal(originalString);
        });

        it("should clone Array (of primitives)", function() {
            const clonedArrayOfPrimitives = originalArrayOfPrimitives.clone();
            expect(clonedArrayOfPrimitives).to.be.an.instanceof(Array);
            clonedArrayOfPrimitives.push(2);
            expect(clonedArrayOfPrimitives).to.not.deep.equal(originalArrayOfPrimitives);
        });

        it("should clone Array (of Object literals)", function() {
            const clonedArrayOfObjectLiterals = originalArrayOfObjectLiterals.clone();
            expect(clonedArrayOfObjectLiterals).to.be.an.instanceof(Array);
            clonedArrayOfObjectLiterals[0].value = 2;
            expect(clonedArrayOfObjectLiterals).to.not.deep.equal(originalArrayOfObjectLiterals);
        });

        it("should clone Map", function() {
            const clonedMap = originalMap.clone();
            expect(clonedMap).to.be.an.instanceof(Map);
            clonedMap.set("value", 2);
            expect(clonedMap).to.not.deep.equal(originalMap);
        });

        it("should clone Date", function() {
            const clonedDate = originalDate.clone();
            expect(clonedDate).to.be.an.instanceof(Date);
            clonedDate.setMonth(5);
            expect(clonedDate).to.not.deep.equal(originalDate);
        });

        it("should clone Object literal", function() {
            const clonedObject = originalObjectLiteral.clone();
            expect(clonedObject).to.be.an("object");
            clonedObject.value = 2;
            expect(clonedObject).to.not.deep.equal(originalObjectLiteral);
        });

        it("should clone Function", function() {
            const clonedFunction = originalFunction.clone();
            expect(clonedFunction).to.be.a("function");
            clonedFunction.value = 2;
            expect(clonedFunction).to.not.deep.equal(originalFunction);
            expect(clonedFunction(originalString)).to.deep.equal(originalFunction(originalString));
        });
    });
});
