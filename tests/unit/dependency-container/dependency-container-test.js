"use strict";

const expect = require("chai").expect;

const providers = [require("../../../src").DependencyContainer, require("../../../dist").DependencyContainer];

providers.forEach((DependencyContainer) => {
    describe("DependencyContainer class test", function() {
        let dc, NoDependency, TwoDependencies, functionDependency;

        beforeEach(function() {
            dc = new DependencyContainer();
            NoDependency = function() {
                // This prototype has no dependencies.
            };
            TwoDependencies = function(first, second) {
                this.first = first;
                this.second = second;
            };
            functionDependency = () => {
                return {};
            };
        });

        it("should have a proper api", function() {
            expect(dc).to.be.an.instanceof(DependencyContainer);
            expect(dc.has).to.be.a("function");
            expect(dc.get).to.be.a("function");
            expect(dc.registerBinding).to.be.a("function");
            expect(dc.removeBinding).to.be.a("function");
        });

        it("should return this on register binding", function() {
            expect(dc.registerBinding("NoDependency", NoDependency)).to.be.equal(dc);
        });

        it("should return this on remove binding", function() {
            expect(dc.removeBinding("NoDependency")).to.be.equal(dc);
        });

        it("should throw an error on get call when type wasn't registered", function() {
            expect(() => dc.get("NoDependency")).to.throw();
        });

        it("should throw an error on register binding when identifier is not a valid type", function() {
            expect(() => dc.registerBinding(null, NoDependency)).to.throw();
        });

        it("should throw an error on register binding when type is not a valid type", function() {
            expect(() => dc.registerBinding("NoDependency", null)).to.throw();
        });

        it("should throw an error on register binding when dependencies is not a valid type", function() {
            expect(() => {
                dc.registerBinding("NoDependency", NoDependency, {
                    dependencies: null,
                });
            }).to.throw();
            expect(() => {
                dc.registerBinding("NoDependency", NoDependency, {
                    dependencies: [null],
                });
            }).to.throw();
        });

        it("should throw an error on register binding when singleton is not a valid type", function() {
            expect(() => {
                dc.registerBinding("NoDependency", NoDependency, {
                    singleton: null,
                });
            }).to.throw();
        });

        it("should throw an error on register binding when dependencies were not specified", function() {
            expect(() => dc.registerBinding("TwoDependencies", TwoDependencies)).to.throw();
        });

        it("should register binding and remove binding", function() {
            expect(dc.has("NoDependency")).to.be.equal(false);
            dc.registerBinding("NoDependency", NoDependency);
            expect(dc.has("NoDependency")).to.be.equal(true);
            expect(dc.get("NoDependency")).to.be.an.instanceof(NoDependency);
            dc.removeBinding("NoDependency");
            expect(dc.has("NoDependency")).to.be.equal(false);
            expect(() => dc.get("NoDependency")).to.throw();
        });

        it("should register binding and get every time a new instance", function() {
            dc.registerBinding("NoDependency", NoDependency);
            const noDependencyFirst = dc.get("NoDependency");
            expect(noDependencyFirst).to.be.an.instanceof(NoDependency);
            const noDependencySecond = dc.get("NoDependency");
            expect(noDependencySecond).to.be.an.instanceof(NoDependency);
            expect(noDependencyFirst).to.be.not.equal(noDependencySecond);
        });

        it("should register singleton binding and get every time the same instance", function() {
            dc.registerBinding("NoDependency", NoDependency, {
                singleton: true,
            });
            const noDependencyFirstCall = dc.get("NoDependency");
            expect(noDependencyFirstCall).to.be.an.instanceof(NoDependency);
            const noDependencySecondCall = dc.get("NoDependency");
            expect(noDependencySecondCall).to.be.an.instanceof(NoDependency);
            expect(noDependencyFirstCall).to.be.equal(noDependencySecondCall);
        });

        it("should register binding and get a new instance each time", function() {
            dc.registerBinding("NoDependency", NoDependency);
            dc.registerBinding("TwoDependencies", TwoDependencies, {
                dependencies: ["NoDependency", functionDependency],
            });

            const twoDependenciesFirstCall = dc.get("TwoDependencies");
            const twoDependenciesSecondCall = dc.get("TwoDependencies");

            expect(twoDependenciesFirstCall).to.be.not.equal(twoDependenciesSecondCall);
            expect(twoDependenciesFirstCall).to.be.an.instanceof(TwoDependencies);
            expect(twoDependenciesSecondCall).to.be.an.instanceof(TwoDependencies);

            expect(twoDependenciesFirstCall.first).to.be.not.equal(twoDependenciesSecondCall.first);
            expect(twoDependenciesFirstCall.first).to.be.an.instanceof(NoDependency);
            expect(twoDependenciesSecondCall.first).to.be.an.instanceof(NoDependency);

            expect(twoDependenciesFirstCall.second).to.be.not.equal(twoDependenciesSecondCall.second);
            expect(twoDependenciesFirstCall.second).to.be.an(typeof functionDependency());
            expect(twoDependenciesSecondCall.second).to.be.an(typeof functionDependency());
        });
    });
});
