"use strict";

/**
 * Assert "from" parameter.
 *
 * @param {*} from
 * @return {void}
 * @throws TypeError
 */
function assertFromParameter(from) {
    if (typeof from !== "string") {
        throw new TypeError("The \"from\" parameter should be a string.");
    }
}

/**
 * Assert "to" parameter.
 *
 * @param {*} to
 * @return {void}
 * @throws TypeError
 */
function assertToParameter(to) {
    if (typeof to !== "string") {
        throw new TypeError("The \"to\" parameter should be a string.");
    }
}

/**
 * Assert "resolver" parameter.
 *
 * @param {*} resolver
 * @return {void}
 * @throws TypeError
 */
function assertResolverParameter(resolver) {
    if (typeof resolver !== "function") {
        throw new TypeError("The \"resolver\" parameter should be a function.");
    }
}

/**
 * Mapper class.
 */
class Mapper {

    /**
     * Mapper constructor.
     */
    constructor() {
        this._resolvers = {};
    }

    /**
     * Get a list of resolvers.
     *
     * @return {Object}
     */
    getResolvers() {
        return this._resolvers;
    }

    /**
     * Register the resolver function for from-to mapping.
     *
     * @param {string} from
     * @param {string} to
     * @param {Function} resolver
     * @return {Mapper}
     */
    registerResolver(from, to, resolver) {
        assertFromParameter(from);
        assertToParameter(to);
        assertResolverParameter(resolver);
        if (typeof this._resolvers[from] === "undefined") {
            this._resolvers[from] = {};
        }
        this._resolvers[from][to] = resolver;
        return this;
    }

    /**
     * Remove the resolver function for from-to mapping.
     *
     * @param {string} from
     * @param {string} to
     * @return {Mapper}
     */
    removeResolver(from, to) {
        assertFromParameter(from);
        assertToParameter(to);
        if (this.hasResolver(from, to)) {
            delete this._resolvers[from][to];
        }
        return this;
    }

    /**
     * Assert that the resolver function for from-to mapping exists.
     *
     * @param {string} from
     * @param {string} to
     * @return {void}
     * @private
     */
    _assertResolver(from, to) {
        if (typeof this.getResolvers()[from] === "undefined") {
            throw new Error(`Resolver for "${from}" not found.`);
        }
        if (typeof this.getResolvers()[from][to] === "undefined") {
            throw new Error(`Resolver for "${to}" not found.`);
        }
    }

    /**
     * Determine that the resolver function for from-to mapping is registered.
     *
     * @param {string} from
     * @param {string} to
     * @return {boolean}
     */
    hasResolver(from, to) {
        assertFromParameter(from);
        assertToParameter(to);
        try {
            this._assertResolver(from, to);
            return true;
        } catch (error) {
            return false;
        }
    }

    /**
     * Map value by using from-to resolver function.
     *
     * @param {*} value
     * @param {string} from
     * @param {string} to
     * @return {*}
     */
    map(value, from, to) {
        assertFromParameter(from);
        assertToParameter(to);
        this._assertResolver(from, to);
        const resolver = this.getResolvers()[from][to];
        return resolver(value);
    }
}

module.exports = Mapper;
