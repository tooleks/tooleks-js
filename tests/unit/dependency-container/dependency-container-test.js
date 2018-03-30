"use strict";

const expect = require("chai").expect;

const providers = [require("../../../src").DependencyContainer, require("../../../dist").DependencyContainer];

providers.forEach((DependencyContainer) => {
    describe("DependencyContainer class test", function() {
        let dc, ZeroLevel, FirstLevel, SecondLevel, functionDependency;

        beforeEach(function() {
            dc = new DependencyContainer();
            ZeroLevel = function() {
                // This prototype has no dependencies.
            };
            FirstLevel = function(zero) {
                this.zero = zero;
            };
            SecondLevel = function(first) {
                this.first = first;
            };
            functionDependency = () => 42;
        });

        it("should have a proper api", function() {
            expect(dc).to.be.an.instanceof(DependencyContainer);
            expect(dc.has).to.be.a("function");
            expect(dc.get).to.be.a("function");
            expect(dc.register).to.be.a("function");
        });

        it("should return this on register call", function() {
            expect(dc.register("Zero", ZeroLevel)).to.be.an.instanceof(DependencyContainer);
        });

        it("should throw an error on get call when type wasn't registered", function() {
            expect(() => dc.get("Zero")).to.throw();
        });

        it("should throw an error on register call when id is not a valid type", function() {
            expect(() => dc.register(null, ZeroLevel)).to.throw();
        });

        it("should throw an error on register call when type is not a valid type", function() {
            expect(() => dc.register("Zero", null)).to.throw();
        });

        it("should throw an error on register call when dependencies is not a valid type", function() {
            expect(() => dc.register("Zero", ZeroLevel, null)).to.throw();
        });

        it("should throw an error on register call when type dependencies were not specified", function() {
            expect(() => dc.register("Second", SecondLevel)).to.throw();
        });

        it("should register entry and get instance", function() {
            dc.register("Zero", ZeroLevel);
            const zeroLevel = dc.get("Zero");
            expect(zeroLevel).to.be.an.instanceof(ZeroLevel);
        });

        it("should register entry and have instance", function() {
            expect(dc.has("Zero")).to.be.equal(false);
            dc.register("Zero", ZeroLevel);
            expect(dc.has("Zero")).to.be.equal(true);
        });

        it("should register entry and get instance", function() {
            dc.register("Zero", ZeroLevel);
            dc.register("First", FirstLevel, ["Zero"]);
            dc.register("Second", SecondLevel, ["First"]);

            const secondLevelFirstCall = dc.get("Second");
            const secondLevelSecondCall = dc.get("Second");

            expect(secondLevelFirstCall).to.be.not.equal(secondLevelSecondCall);
            expect(secondLevelFirstCall).to.be.an.instanceof(SecondLevel);
            expect(secondLevelSecondCall).to.be.an.instanceof(SecondLevel);

            expect(secondLevelFirstCall.first).to.be.not.equal(secondLevelSecondCall.first);
            expect(secondLevelFirstCall.first).to.be.an.instanceof(FirstLevel);
            expect(secondLevelSecondCall.first).to.be.an.instanceof(FirstLevel);

            expect(secondLevelFirstCall.first.zero).to.be.not.equal(secondLevelSecondCall.first.zero);
            expect(secondLevelFirstCall.first.zero).to.be.an.instanceof(ZeroLevel);
            expect(secondLevelSecondCall.first.zero).to.be.an.instanceof(ZeroLevel);
        });

        it("should register singleton entry and get instance", function() {
            dc.register("Zero", ZeroLevel);
            dc.register("First", FirstLevel, ["Zero"]);
            dc.register("Second", SecondLevel, ["First"], {singleton: true});

            const secondLevelFirstCall = dc.get("Second");
            const secondLevelSecondCall = dc.get("Second");

            expect(secondLevelFirstCall).to.be.equal(secondLevelSecondCall);
            expect(secondLevelFirstCall).to.be.an.instanceof(SecondLevel);
            expect(secondLevelSecondCall).to.be.an.instanceof(SecondLevel);

            expect(secondLevelFirstCall.first).to.be.equal(secondLevelSecondCall.first);
            expect(secondLevelFirstCall.first).to.be.an.instanceof(FirstLevel);
            expect(secondLevelSecondCall.first).to.be.an.instanceof(FirstLevel);

            expect(secondLevelFirstCall.first.zero).to.be.equal(secondLevelSecondCall.first.zero);
            expect(secondLevelFirstCall.first.zero).to.be.an.instanceof(ZeroLevel);
            expect(secondLevelSecondCall.first.zero).to.be.an.instanceof(ZeroLevel);
        });
    });
});
