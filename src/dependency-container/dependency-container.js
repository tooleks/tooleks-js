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
     * Create a new instance of a binding.
     *
     * @param {Object} binding
     * @return {Object}
     * @private
     */
    _createInstance(binding) {
        const dependencies = this._resolveDependencies(binding.parameters.dependencies);
        return new binding.type(...dependencies);
    }

    /**
     * Resolve all of the dependencies from a binding.
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
        if (binding.parameters.singleton && typeof binding.instance !== "undefined") {
            return binding.instance;
        }
        const instance = this._createInstance(binding);
        if (binding.parameters.singleton) {
            binding.instance = instance;
        }
        return instance;
    }

    /**
     * Register a new binding in the container.
     *
     * @param {String} identifier
     * @param {Function} type
     * @param {Array<String|Function>} dependencies
     * @param {Boolean} singleton
     * @return {DependencyContainer}
     */
    registerBinding(identifier, type, {dependencies = [], singleton = false} = {}) {
        assertIdentifierParameter(identifier);
        assertTypeParameter(type);
        assertDependenciesParameter(dependencies);
        assertSingletonParameter(singleton);
        if (type.length !== dependencies.length) {
            throw new Error(`Invalid number of dependencies were specified for ${identifier}.`);
        }
        this._bindings[identifier] = {type, "parameters": {dependencies, singleton}};
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
        this._bindings[identifier] = {instance, "parameters": {"singleton": true}};
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
}

module.exports = DependencyContainer;
