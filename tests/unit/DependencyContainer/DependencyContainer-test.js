"use strict";

const assert = require("assert");
const {expect} = require("chai");
const {DependencyContainer} = require("../../../src");

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

    it("should return this on register/remove binding", function() {
        expect(dc.registerBinding(NoDepsClass.name, NoDepsClass)).to.be.equal(dc);
        expect(dc.registerInstance("Instance", instance)).to.be.equal(dc);
        expect(dc.removeBinding(NoDepsClass.name)).to.be.equal(dc);
    });

    it("should throw an error on get when type wasn't registered", function() {
        try {
            dc.get(NoDepsClass.name);
            assert(false, "Whoops! An error should be thrown here.");
        } catch (error) {
            expect(error).to.be.an.instanceof(Error);
            expect(error.message).to.be.equal(`The "${NoDepsClass.name}" binding not found.`);
        }
    });

    it("should throw an error on register binding when identifier is not a valid type", function() {
        try {
            dc.get(null, NoDepsClass);
            assert(false, "Whoops! An error should be thrown here.");
        } catch (error) {
            expect(error).to.be.an.instanceof(Error);
            expect(error.message).to.be.equal('The "identifier" parameter should be a string.');
        }
    });

    it("should throw an error on register binding when type is not a valid type", function() {
        try {
            dc.registerBinding(NoDepsClass.name, null);
            assert(false, "Whoops! An error should be thrown here.");
        } catch (error) {
            expect(error).to.be.an.instanceof(Error);
            expect(error.message).to.be.equal('The "type" parameter should be a function.');
        }
    });

    it("should throw an error on register binding when dependencies is not a valid type", function() {
        try {
            dc.registerBinding(NoDepsClass.name, NoDepsClass, {
                dependencies: null,
            });
            assert(false, "Whoops! An error should be thrown here.");
        } catch (error) {
            expect(error).to.be.an.instanceof(TypeError);
            expect(error.message).to.be.equal('The "dependencies" parameter should be an array.');
        }

        try {
            dc.registerBinding(NoDepsClass.name, NoDepsClass, {
                dependencies: [null],
            });
            assert(false, "Whoops! An error should be thrown here.");
        } catch (error) {
            expect(error).to.be.an.instanceof(TypeError);
            expect(error.message).to.be.equal(
                'The "dependencies" parameter should be an array of strings or functions.',
            );
        }
    });

    it("should throw an error on register binding when singleton is not a valid type", function() {
        try {
            dc.registerBinding(NoDepsClass.name, NoDepsClass, {
                singleton: null,
            });
            assert(false, "Whoops! An error should be thrown here.");
        } catch (error) {
            expect(error).to.be.an.instanceof(TypeError);
            expect(error.message).to.be.equal('The "singleton" parameter should be a boolean.');
        }
    });

    it("should throw an error on register binding when factory is not a valid type", function() {
        try {
            dc.registerBinding(noDepsFactory.name, noDepsFactory, {
                factory: null,
            });
            assert(false, "Whoops! An error should be thrown here.");
        } catch (error) {
            expect(error).to.be.an.instanceof(TypeError);
            expect(error.message).to.be.equal('The "factory" parameter should be a boolean.');
        }
    });

    it("should throw an error on register binding when dependencies were not specified", function() {
        try {
            dc.registerBinding(TwoDepsClass.name, TwoDepsClass);
            assert(false, "Whoops! An error should be thrown here.");
        } catch (error) {
            expect(error).to.be.an.instanceof(Error);
            expect(error.message).to.be.equal(
                `Invalid number of dependencies were specified for "${TwoDepsClass.name}".`,
            );
        }
    });

    it("should throw an error on register binding when circular dependency was detected", function() {
        dc.registerBinding(NoDepsClass.name, NoDepsClass);
        dc.registerBinding(`First${TwoDepsClass.name}`, TwoDepsClass, {
            dependencies: [NoDepsClass.name, `Second${TwoDepsClass.name}`],
        });

        try {
            dc.registerBinding(`Second${TwoDepsClass.name}`, TwoDepsClass, {
                dependencies: [NoDepsClass.name, `First${TwoDepsClass.name}`],
            });
            assert(false, "Whoops! An error should be thrown here.");
        } catch (error) {
            expect(error).to.be.an.instanceof(Error);
            expect(error.message).to.be.equal(
                "Circular dependency detected. " +
                    `"Second${TwoDepsClass.name}" depends on "First${TwoDepsClass.name}" and vise versa.`,
            );
        }

        try {
            dc.registerBinding(TwoDepsClass.name, TwoDepsClass, {
                dependencies: [NoDepsClass.name, TwoDepsClass.name],
            });
            assert(false, "Whoops! An error should be thrown here.");
        } catch (error) {
            expect(error).to.be.an.instanceof(Error);
            expect(error.message).to.be.equal(`Circular dependency detected. ${TwoDepsClass.name} depends on itself.`);
        }
    });

    it("should throw an error on register factory binding when dependencies were not specified", function() {
        try {
            dc.registerBinding(twoDepsFactory.name, twoDepsFactory, {
                factory: true,
            });
            assert(false, "Whoops! An error should be thrown here.");
        } catch (error) {
            expect(error).to.be.an.instanceof(Error);
            expect(error.message).to.be.equal(
                `Invalid number of dependencies were specified for "${twoDepsFactory.name}".`,
            );
        }
    });

    it("should throw an error on register instance when instance is not a valid type", function() {
        try {
            dc.registerInstance("Instance", undefined);
            assert(false, "Whoops! An error should be thrown here.");
        } catch (error) {
            expect(error).to.be.an.instanceof(TypeError);
            expect(error.message).to.be.equal('The "instance" parameter should not be an undefined.');
        }
    });

    it("should register no dependencies binding and remove binding", function() {
        assert(!dc.has(NoDepsClass.name));
        dc.registerBinding(NoDepsClass.name, NoDepsClass);
        assert(dc.has(NoDepsClass.name));
        expect(dc.get(NoDepsClass.name)).to.be.an.instanceof(NoDepsClass);
        dc.removeBinding(NoDepsClass.name);
        assert(!dc.has(NoDepsClass.name));
        try {
            dc.get(NoDepsClass.name);
            assert(false, "Whoops! An error should be thrown here.");
        } catch (error) {
            expect(error).to.be.an.instanceof(Error);
            expect(error.message).to.be.equal(`The "${NoDepsClass.name}" binding not found.`);
        }
    });

    it("should register no dependencies factory binding and remove binding", function() {
        assert(!dc.has(noDepsFactory.name));
        dc.registerBinding(noDepsFactory.name, noDepsFactory, {factory: true});
        assert(dc.has(noDepsFactory.name));
        expect(dc.get(noDepsFactory.name).prototype).to.be.an("undefined");
        expect(dc.get(noDepsFactory.name)).to.be.deep.equal({});
        dc.removeBinding(noDepsFactory.name);
        assert(!dc.has(noDepsFactory.name));
        try {
            dc.get(noDepsFactory.name);
            assert(false, "Whoops! An error should be thrown here.");
        } catch (error) {
            expect(error).to.be.an.instanceof(Error);
            expect(error.message).to.be.equal(`The "${noDepsFactory.name}" binding not found.`);
        }
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
        assert(!dc.has("Instance"));
        dc.registerInstance("Instance", instance);
        assert(dc.has("Instance"));
        expect(dc.get("Instance")).to.be.a(typeof instance);
        dc.removeBinding("Instance");
        assert(!dc.has("Instance"));
        try {
            dc.get("Instance");
            assert(false, "Whoops! An error should be thrown here.");
        } catch (error) {
            expect(error).to.be.an.instanceof(Error);
            expect(error.message).to.be.equal(`The "Instance" binding not found.`);
        }
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
