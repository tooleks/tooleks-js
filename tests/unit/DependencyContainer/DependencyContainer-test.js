"use strict";

const expect = require("chai").expect;

const providers = [require("../../../src").DependencyContainer, require("../../../dist").DependencyContainer];

providers.forEach((DependencyContainer) => {
    describe("DependencyContainer class test", function() {
        let dc;
        let NoDepsClass;
        let TwoDepsClass;
        let noDepsFactory;
        let twoDepsFactory;
        let numberFuncDep;
        let instance;

        beforeEach(function() {
            dc = new DependencyContainer();
            NoDepsClass = function NoDepsClassService() {
                // This class has no dependencies.
            };
            TwoDepsClass = function TwoDepsClassService(first, second) {
                this.first = first;
                this.second = second;
            };
            noDepsFactory = function noDepsFactoryFunction() {
                // This factory has no dependencies.
                return {};
            };
            twoDepsFactory = function twoDepsFactoryFunction(first, second) {
                return {first, second};
            };
            numberFuncDep = function() {
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
            expect(dc.registerBinding(NoDepsClass.name, NoDepsClass)).to.be.equal(dc);
            expect(dc.removeBinding(NoDepsClass.name)).to.be.equal(dc);
        });

        it("should return this on register/remove instance", function() {
            expect(dc.registerInstance("Instance", instance)).to.be.equal(dc);
            expect(dc.removeInstance("Instance")).to.be.equal(dc);
        });

        it("should throw an error on get when type wasn't registered", function() {
            expect(() => dc.get(NoDepsClass.name)).to.throw();
        });

        it("should throw an error on register binding when identifier is not a valid type", function() {
            expect(() => dc.registerBinding(null, NoDepsClass)).to.throw();
        });

        it("should throw an error on register binding when type is not a valid type", function() {
            expect(() => dc.registerBinding(NoDepsClass.name, null)).to.throw();
        });

        it("should throw an error on register binding when dependencies is not a valid type", function() {
            expect(() => {
                dc.registerBinding(NoDepsClass.name, NoDepsClass, {
                    dependencies: null,
                });
            }).to.throw();
            expect(() => {
                dc.registerBinding(NoDepsClass.name, NoDepsClass, {
                    dependencies: [null],
                });
            }).to.throw();
        });

        it("should throw an error on register binding when singleton is not a valid type", function() {
            expect(() => {
                dc.registerBinding(NoDepsClass.name, NoDepsClass, {
                    singleton: null,
                });
            }).to.throw();
        });

        it("should throw an error on register binding when factory is not a valid type", function() {
            expect(() => {
                dc.registerBinding(noDepsFactory.name, noDepsFactory, {
                    factory: null,
                });
            }).to.throw();
        });

        it("should throw an error on register binding when dependencies were not specified", function() {
            expect(() => dc.registerBinding(TwoDepsClass.name, TwoDepsClass)).to.throw();
        });

        it("should throw an error on register factory binding when dependencies were not specified", function() {
            expect(() =>
                dc.registerBinding(twoDepsFactory.name, twoDepsFactory, {
                    factory: true,
                }),
            ).to.throw();
        });

        it("should throw an error on register instance when instance is not a valid type", function() {
            expect(() => dc.registerInstance("Instance", undefined)).to.throw();
        });

        it("should register no dependencies binding and remove binding", function() {
            expect(dc.has(NoDepsClass.name)).to.be.equal(false);
            dc.registerBinding(NoDepsClass.name, NoDepsClass);
            expect(dc.has(NoDepsClass.name)).to.be.equal(true);
            expect(dc.get(NoDepsClass.name)).to.be.an.instanceof(NoDepsClass);
            dc.removeBinding(NoDepsClass.name);
            expect(dc.has(NoDepsClass.name)).to.be.equal(false);
            expect(() => dc.get(NoDepsClass.name)).to.throw();
        });

        it("should register no dependencies factory binding and remove binding", function() {
            expect(dc.has(noDepsFactory.name)).to.be.equal(false);
            dc.registerBinding(noDepsFactory.name, noDepsFactory, {factory: true});
            expect(dc.has(noDepsFactory.name)).to.be.equal(true);
            expect(dc.get(noDepsFactory.name).prototype).to.be.an("undefined");
            expect(dc.get(noDepsFactory.name)).to.be.deep.equal({});
            dc.removeBinding(noDepsFactory.name);
            expect(dc.has(noDepsFactory.name)).to.be.equal(false);
            expect(() => dc.get(noDepsFactory.name)).to.throw();
        });

        it("should register binding and get every time a new instance", function() {
            dc.registerBinding(NoDepsClass.name, NoDepsClass);
            expect(dc.get(NoDepsClass.name)).to.be.an.instanceof(NoDepsClass);
            expect(dc.get(NoDepsClass.name)).to.be.an.instanceof(NoDepsClass);
            expect(dc.get(NoDepsClass.name)).to.be.not.equal(dc.get(NoDepsClass.name));
        });

        it("should register factory binding and get every time a new call", function() {
            dc.registerBinding(noDepsFactory.name, noDepsFactory, {factory: true});
            expect(dc.get(noDepsFactory.name).prototype).to.be.an("undefined");
            expect(dc.get(noDepsFactory.name)).to.be.deep.equal({});
            expect(dc.get(noDepsFactory.name)).to.be.not.equal(dc.get(noDepsFactory.name));
        });

        it("should register singleton binding and get every time the same instance", function() {
            dc.registerBinding(NoDepsClass.name, NoDepsClass, {
                singleton: true,
            });
            expect(dc.get(NoDepsClass.name)).to.be.an.instanceof(NoDepsClass);
            expect(dc.get(NoDepsClass.name)).to.be.an.instanceof(NoDepsClass);
            expect(dc.get(NoDepsClass.name)).to.be.equal(dc.get(NoDepsClass.name));
        });

        it("should register singleton factory binding and get every time the same instance", function() {
            dc.registerBinding(noDepsFactory.name, noDepsFactory, {
                singleton: true,
                factory: true,
            });
            expect(dc.get(noDepsFactory.name)).to.be.deep.equal({});
            expect(dc.get(noDepsFactory.name).prototype).to.be.an("undefined");
            expect(dc.get(noDepsFactory.name)).to.be.equal(dc.get(noDepsFactory.name));
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
            dc.registerBinding(NoDepsClass.name, NoDepsClass);
            dc.registerBinding(TwoDepsClass.name, TwoDepsClass, {
                dependencies: [NoDepsClass.name, numberFuncDep],
            });

            expect(dc.get(TwoDepsClass.name)).to.be.an.instanceof(TwoDepsClass);
            expect(dc.get(TwoDepsClass.name)).to.be.not.equal(dc.get(TwoDepsClass.name));

            expect(dc.get(TwoDepsClass.name).first).to.be.not.equal(dc.get(TwoDepsClass.name).first);
            expect(dc.get(TwoDepsClass.name).first).to.be.an.instanceof(NoDepsClass);

            expect(dc.get(TwoDepsClass.name).second).to.be.equal(dc.get(TwoDepsClass.name).second);
            expect(dc.get(TwoDepsClass.name).second).to.be.a(typeof numberFuncDep());
        });

        it("should register factory binding with dependencies and get a new call each time", function() {
            dc.registerBinding(noDepsFactory.name, noDepsFactory);
            dc.registerBinding(twoDepsFactory.name, twoDepsFactory, {
                dependencies: [noDepsFactory.name, numberFuncDep],
            });

            expect(dc.get(twoDepsFactory.name).prototype).to.be.an("undefined");
            expect(dc.get(twoDepsFactory.name)).to.be.not.equal(dc.get(twoDepsFactory.name));

            expect(dc.get(twoDepsFactory.name).first).to.be.not.equal(dc.get(twoDepsFactory.name).first);
            expect(dc.get(twoDepsFactory.name).first.prototype).to.be.an("undefined");
            expect(dc.get(twoDepsFactory.name).first).to.be.deep.equal({});

            expect(dc.get(twoDepsFactory.name).second).to.be.equal(dc.get(twoDepsFactory.name).second);
            expect(dc.get(twoDepsFactory.name).second).to.be.a(typeof numberFuncDep());
        });
    });
});
