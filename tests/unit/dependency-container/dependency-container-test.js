"use strict";

const expect = require("chai").expect;

const providers = [require("../../../src").DependencyContainer, require("../../../dist").DependencyContainer];

providers.forEach((DependencyContainer) => {
    describe("DependencyContainer class test", function() {
        let dc, NoDependencies, TwoDependencies, numberFunctionDependency, instance;

        beforeEach(function() {
            dc = new DependencyContainer();
            NoDependencies = function NoDependenciesService() {
                // This prototype has no dependencies.
            };
            TwoDependencies = function TwoDependenciesService(first, second) {
                this.first = first;
                this.second = second;
            };
            numberFunctionDependency = function() {
                return 42;
            };
            instance = {};
        });

        it("should have a proper api", function() {
            expect(dc).to.be.an.instanceof(DependencyContainer);
            expect(dc.has).to.be.a("function");
            expect(dc.get).to.be.a("function");
            expect(dc.registerBinding).to.be.a("function");
            expect(dc.removeBinding).to.be.a("function");
            expect(dc.registerInstance).to.be.a("function");
            expect(dc.removeInstance).to.be.a("function");
        });

        it("should return this on register/remove binding", function() {
            expect(dc.registerBinding(NoDependencies.name, NoDependencies)).to.be.equal(dc);
            expect(dc.removeBinding(NoDependencies.name)).to.be.equal(dc);
        });

        it("should return this on register/remove instance", function() {
            expect(dc.registerInstance("Instance", instance)).to.be.equal(dc);
            expect(dc.removeInstance("Instance")).to.be.equal(dc);
        });

        it("should throw an error on get when type wasn't registered", function() {
            expect(() => dc.get(NoDependencies.name)).to.throw();
        });

        it("should throw an error on register binding when identifier is not a valid type", function() {
            expect(() => dc.registerBinding(null, NoDependencies)).to.throw();
        });

        it("should throw an error on register binding when type is not a valid type", function() {
            expect(() => dc.registerBinding(NoDependencies.name, null)).to.throw();
        });

        it("should throw an error on register binding when dependencies is not a valid type", function() {
            expect(() => {
                dc.registerBinding(NoDependencies.name, NoDependencies, {
                    dependencies: null,
                });
            }).to.throw();
            expect(() => {
                dc.registerBinding(NoDependencies.name, NoDependencies, {
                    dependencies: [null],
                });
            }).to.throw();
        });

        it("should throw an error on register binding when singleton is not a valid type", function() {
            expect(() => {
                dc.registerBinding(NoDependencies.name, NoDependencies, {
                    singleton: null,
                });
            }).to.throw();
        });

        it("should throw an error on register binding when dependencies were not specified", function() {
            expect(() => dc.registerBinding(TwoDependencies.name, TwoDependencies)).to.throw();
        });

        it("should throw an error on register instance when instance is not a valid type", function() {
            expect(() => dc.registerInstance("Instance", undefined)).to.throw();
        });

        it("should register no dependencies binding and remove binding", function() {
            expect(dc.has(NoDependencies.name)).to.be.equal(false);
            dc.registerBinding(NoDependencies.name, NoDependencies);
            expect(dc.has(NoDependencies.name)).to.be.equal(true);
            expect(dc.get(NoDependencies.name)).to.be.an.instanceof(NoDependencies);
            dc.removeBinding(NoDependencies.name);
            expect(dc.has(NoDependencies.name)).to.be.equal(false);
            expect(() => dc.get(NoDependencies.name)).to.throw();
        });

        it("should register binding and get every time a new instance", function() {
            dc.registerBinding(NoDependencies.name, NoDependencies);
            expect(dc.get(NoDependencies.name)).to.be.an.instanceof(NoDependencies);
            expect(dc.get(NoDependencies.name)).to.be.an.instanceof(NoDependencies);
            expect(dc.get(NoDependencies.name)).to.be.not.equal(dc.get(NoDependencies.name));
        });

        it("should register singleton binding and get every time the sane instance", function() {
            dc.registerBinding(NoDependencies.name, NoDependencies, {
                singleton: true,
            });
            expect(dc.get(NoDependencies.name)).to.be.an.instanceof(NoDependencies);
            expect(dc.get(NoDependencies.name)).to.be.an.instanceof(NoDependencies);
            expect(dc.get(NoDependencies.name)).to.be.equal(dc.get(NoDependencies.name));
        });

        it("should register instance and remove instance", function() {
            expect(dc.has("Instance")).to.be.equal(false);
            dc.registerInstance("Instance", instance);
            expect(dc.has("Instance")).to.be.equal(true);
            expect(dc.get("Instance")).to.be.a(typeof instance);
            dc.removeInstance("Instance");
            expect(dc.has("Instance")).to.be.equal(false);
            expect(() => dc.get("Instance")).to.throw();
        });

        it("should register instance and get the same instance each time", function() {
            dc.registerInstance("Instance", instance);
            expect(dc.get("Instance")).to.be.a(typeof instance);
            expect(dc.get("Instance")).to.be.a(typeof instance);
            expect(dc.get("Instance")).to.be.equal(dc.get("Instance"));
        });

        it("should register binding with dependencies and get a new instance each time", function() {
            dc.registerBinding(NoDependencies.name, NoDependencies);
            dc.registerBinding(TwoDependencies.name, TwoDependencies, {
                dependencies: [NoDependencies.name, numberFunctionDependency],
            });
            expect(dc.get(TwoDependencies.name)).to.be.not.equal(dc.get(TwoDependencies.name));
            expect(dc.get(TwoDependencies.name)).to.be.an.instanceof(TwoDependencies);
            expect(dc.get(TwoDependencies.name)).to.be.an.instanceof(TwoDependencies);
            expect(dc.get(TwoDependencies.name).first).to.be.not.equal(dc.get(TwoDependencies.name).first);
            expect(dc.get(TwoDependencies.name).first).to.be.an.instanceof(NoDependencies);
            expect(dc.get(TwoDependencies.name).first).to.be.an.instanceof(NoDependencies);
            expect(dc.get(TwoDependencies.name).second).to.be.equal(dc.get(TwoDependencies.name).second);
            expect(dc.get(TwoDependencies.name).second).to.be.a(typeof numberFunctionDependency());
            expect(dc.get(TwoDependencies.name).second).to.be.a(typeof numberFunctionDependency());
        });
    });
});
