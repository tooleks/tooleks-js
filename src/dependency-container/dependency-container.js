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
 * Assert "options" parameter.
 *
 * @param {*} options
 * @return {void}
 * @throws TypeError
 */
function assertOptionsParameter(options) {
    if (typeof options !== "object" || options === null) {
        throw new TypeError("The \"options\" parameter should be an object.");
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
        const dependencies = binding.dependencies.map((dependency) => {
            if (typeof dependency === "string") {
                return this.get(dependency);
            } else if (typeof dependency === "function") {
                return dependency();
            }
            throw new TypeError("Invalid dependency type.");
        });
        return new binding.type(...dependencies);
    }

    /**
     * Returns true if the container can return an entry for the given identifier.
     * Returns false otherwise.
     *
     * @param {String} identifier
     * @return {Boolean}
     */
    has(identifier) {
        assertIdentifierParameter(identifier);
        return Object.prototype.hasOwnProperty.call(this._bindings, identifier);
    }

    /**
     * Finds an entry of the container by its identifier and returns it.
     *
     * @param identifier
     */
    get(identifier) {
        assertIdentifierParameter(identifier);
        if (!this.has(identifier)) {
            throw new Error(`The "${identifier}" binding not found.`);
        }
        const binding = this._bindings[identifier];
        if (binding.options.singleton && typeof binding.instance !== "undefined") {
            return binding.instance;
        }
        const instance = this._createInstance(binding);
        if (binding.options.singleton) {
            binding.instance = instance;
        }
        return instance;
    }

    /**
     * Register a new entry in the container.
     *
     * @param {String} identifier
     * @param {Function} type
     * @param {Array<String|Function>} dependencies
     * @param {Object} options
     * @return {DependencyContainer}
     */
    register(identifier, type, dependencies = [], options = {}) {
        assertIdentifierParameter(identifier);
        assertTypeParameter(type);
        assertDependenciesParameter(dependencies);
        assertOptionsParameter(options);
        if (type.length !== dependencies.length) {
            throw new Error(`Invalid number of dependencies were specified for ${identifier}.`);
        }
        const singleton = Boolean(options.singleton);
        this._bindings[identifier] = {type, dependencies, "options": {singleton}};
        return this;
    }
}

module.exports = DependencyContainer;
