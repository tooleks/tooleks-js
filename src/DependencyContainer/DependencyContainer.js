"use strict";

const {isArray, isBoolean, isDefined, isFunction, isString, isUndefined} = require("../utils");

/**
 * Assert "identifier" parameter.
 *
 * @param {*} identifier
 * @return {void}
 * @throws TypeError
 */
function assertIdentifierParameter(identifier) {
    if (!isString(identifier)) {
        throw new TypeError("The \"identifier\" parameter should be a string.");
    }
}

/**
 * Assert "type" parameter.
 *
 * @param {*} type
 * @return {void}
 * @throws TypeError
 */
function assertTypeParameter(type) {
    if (!isFunction(type)) {
        throw new TypeError("The \"type\" parameter should be a function.");
    }
}

/**
 * Assert "dependencies" parameter.
 *
 * @param {*} dependencies
 * @return {void}
 * @throws TypeError
 */
function assertDependenciesParameter(dependencies) {
    if (!isArray(dependencies)) {
        throw new TypeError("The \"dependencies\" parameter should be an array.");
    }
    dependencies.forEach((dependency) => {
        if (!isString(dependency) && !isFunction(dependency)) {
            throw new TypeError("The \"dependencies\" parameter should be an array of strings or functions.");
        }
    });
}

/**
 * Assert "singleton" parameter.
 *
 * @param {*} singleton
 * @return {void}
 * @throws TypeError
 */
function assertSingletonParameter(singleton) {
    if (!isBoolean(singleton)) {
        throw new TypeError("The \"singleton\" parameter should be a boolean.");
    }
}

/**
 * Assert "factory" parameter.
 *
 * @param {*} factory
 * @return {void}
 * @throws TypeError
 */
function assertFactoryParameter(factory) {
    if (!isBoolean(factory)) {
        throw new TypeError("The \"factory\" parameter should be a boolean.");
    }
}

/**
 * Assert "instance" parameter.
 *
 * @param {*} instance
 * @return {void}
 * @throws TypeError
 */
function assertInstanceParameter(instance) {
    if (isUndefined(instance)) {
        throw new TypeError("The \"instance\" parameter should not be an undefined.");
    }
}

/**
 * DependencyContainer class.
 */
class DependencyContainer {

    /**
     * DependencyContainer constructor.
     */
    constructor() {
        this._bindings = {};
        this._createInstance = this._createInstance.bind(this);
        this._resolveDependencies = this._resolveDependencies.bind(this);
        this.registerBinding = this.registerBinding.bind(this);
        this.registerInstance = this.registerInstance.bind(this);
        this.removeBinding = this.removeBinding.bind(this);
        this.has = this.has.bind(this);
        this.get = this.get.bind(this);
    }

    /**
     * Create an instance for a binding.
     *
     * @param {Object} binding
     * @return {*}
     * @private
     */
    _createInstance(binding) {
        const dependencies = this._resolveDependencies(binding.dependencies);
        let instance = null;
        if (binding.factory) {
            instance = binding.type(...dependencies);
        } else {
            instance = new binding.type(...dependencies);
        }
        return instance;
    }

    /**
     * Resolve all of dependencies for a binding.
     *
     * @param {Array<string|Function>} dependencies
     * @private
     */
    _resolveDependencies(dependencies) {
        return dependencies.map((dependency) => {
            if (isString(dependency)) {
                return this.get(dependency);
            } else if (isFunction(dependency)) {
                return dependency();
            }
            throw new TypeError("Invalid dependency type.");
        });
    }

    /**
     * Register a new binding in the container.
     *
     * @param {string} identifier
     * @param {Function|*} type
     * @param {Object} options
     * @param {Array<string|Function>} options.dependencies
     * @param {boolean} options.singleton
     * @param {boolean} options.factory
     * @return {DependencyContainer}
     */
    registerBinding(identifier, type, {dependencies = [], singleton = false, factory = false} = {}) {
        assertIdentifierParameter(identifier);
        assertTypeParameter(type);
        assertDependenciesParameter(dependencies);
        assertSingletonParameter(singleton);
        assertFactoryParameter(factory);

        // Check dependencies list length.
        if (type.length !== dependencies.length) {
            throw new Error(`Invalid number of dependencies were specified for "${identifier}".`);
        }

        // Check for circular dependencies.
        dependencies.forEach((dependency) => {
            if (dependency === identifier) {
                throw new Error(`Circular dependency detected. ${identifier} depends on itself.`);
            }

            if (isDefined(this._bindings[dependency])) {
                this._bindings[dependency].dependencies.forEach((innerDependency) => {
                    if (innerDependency === identifier) {
                        throw new Error("Circular dependency detected. " +
                                `"${identifier}" depends on "${dependency}" and vise versa.`, );
                    }
                });
            }
        });

        this._bindings[identifier] = {type, dependencies, singleton, factory};

        return this;
    }

    /**
     * Register an instance in the container.
     *
     * @param {string} identifier
     * @param {*} instance
     * @return {DependencyContainer}
     */
    registerInstance(identifier, instance) {
        assertIdentifierParameter(identifier);
        assertInstanceParameter(instance);
        this._bindings[identifier] = {instance, dependencies: [], singleton: true, factory: false};
        return this;
    }

    /**
     * Remove the binding from the container.
     *
     * @param {string} identifier
     * @return {DependencyContainer}
     */
    removeBinding(identifier) {
        assertIdentifierParameter(identifier);
        if (this.has(identifier)) {
            delete this._bindings[identifier];
        }
        return this;
    }

    /**
     * Return true if the container can return the binding for the given identifier.
     * Return false otherwise.
     *
     * @param {string} identifier
     * @return {boolean}
     */
    has(identifier) {
        assertIdentifierParameter(identifier);
        return Object.prototype.hasOwnProperty.call(this._bindings, identifier);
    }

    /**
     * Find the binding of the container by its identifier and return it.
     *
     * @param {string} identifier
     * @return {*}
     */
    get(identifier) {
        assertIdentifierParameter(identifier);
        if (!this.has(identifier)) {
            throw new Error(`The "${identifier}" binding not found.`);
        }
        const binding = this._bindings[identifier];
        if (isDefined(binding.instance)) {
            return binding.instance;
        }
        const instance = this._createInstance(binding);
        if (binding.singleton) {
            binding.instance = instance;
        }
        return instance;
    }
}

module.exports = DependencyContainer;
