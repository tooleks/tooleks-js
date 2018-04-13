"use strict";

/**
 * Assert "identifier" parameter.
 *
 * @param {*} identifier
 * @return {void}
 * @throws TypeError
 */
function assertIdentifierParameter(identifier) {
    if (typeof identifier !== "string") {
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
    if (typeof type !== "function") {
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
    if (!Array.isArray(dependencies)) {
        throw new TypeError("The \"dependencies\" parameter should be an array.");
    }
    dependencies.forEach((dependency) => {
        if (typeof dependency !== "string" && typeof dependency !== "function") {
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
    if (typeof singleton !== "boolean") {
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
    if (typeof factory !== "boolean") {
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
    if (typeof instance === "undefined") {
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
     * @param {Array<String|Function>} dependencies
     * @private
     */
    _resolveDependencies(dependencies) {
        return dependencies.map((dependency) => {
            if (typeof dependency === "string") {
                return this.get(dependency);
            } else if (typeof dependency === "function") {
                return dependency();
            }
            throw new TypeError("Invalid dependency type.");
        });
    }

    /**
     * Return true if the container can return the binding for the given identifier.
     * Return false otherwise.
     *
     * @param {String} identifier
     * @return {Boolean}
     */
    has(identifier) {
        assertIdentifierParameter(identifier);
        return Object.prototype.hasOwnProperty.call(this._bindings, identifier);
    }

    /**
     * Find the binding of the container by its identifier and return it.
     *
     * @param {String} identifier
     * @return {Object}
     */
    get(identifier) {
        assertIdentifierParameter(identifier);
        if (!this.has(identifier)) {
            throw new Error(`The "${identifier}" binding not found.`);
        }
        const binding = this._bindings[identifier];
        if (typeof binding.instance !== "undefined") {
            return binding.instance;
        }
        const instance = this._createInstance(binding);
        if (binding.singleton) {
            binding.instance = instance;
        }
        return instance;
    }

    /**
     * Register a new binding in the container.
     *
     * @param {String} identifier
     * @param {Function} type
     * @param {Object} options
     * @param {Array<String|Function>} options.dependencies
     * @param {Boolean} options.singleton
     * @param {Boolean} options.factory
     * @return {DependencyContainer}
     */
    registerBinding(identifier, type, {dependencies = [], singleton = false, factory = false} = {}) {
        assertIdentifierParameter(identifier);
        assertTypeParameter(type);
        assertDependenciesParameter(dependencies);
        assertSingletonParameter(singleton);
        assertFactoryParameter(factory);
        if (type.length !== dependencies.length) {
            throw new Error(`Invalid number of dependencies were specified for "${identifier}".`);
        }
        this._bindings[identifier] = {type, dependencies, singleton, factory};
        return this;
    }

    /**
     * Remove the binding from the container.
     *
     * @param {String} identifier
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
     * Register an instance in the container.
     *
     * @param {String} identifier
     * @param {*} instance
     * @return {DependencyContainer}
     */
    registerInstance(identifier, instance) {
        assertIdentifierParameter(identifier);
        assertInstanceParameter(instance);
        this._bindings[identifier] = {instance, singleton: true, factory: false};
        return this;
    }

    /**
     * Remove an instance from the container.
     *
     * @see removeBinding
     * @param {String} identifier
     * @return {DependencyContainer}
     */
    removeInstance(identifier) {
        assertIdentifierParameter(identifier);
        return this.removeBinding(identifier);
    }
}

module.exports = DependencyContainer;
