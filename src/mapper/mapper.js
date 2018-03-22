"use strict";

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
     * @param {String} from
     * @param {String} to
     * @param {Function} resolver
     * @return {void}
     */
    registerResolver(from, to, resolver) {
        if (typeof from !== "string") {
            throw new TypeError("From parameter should be a string.");
        }
        if (typeof to !== "string") {
            throw new TypeError("To parameter should be a string.");
        }
        if (typeof resolver !== "function") {
            throw new TypeError("Resolver parameter should be a string.");
        }
        if (typeof this._resolvers[from] === "undefined") {
            this._resolvers[from] = {};
        }
        this._resolvers[from][to] = resolver;
    }

    /**
     * Remove the resolver function for from-to mapping.
     *
     * @param {String} from
     * @param {String} to
     * @return {void}
     */
    removeResolver(from, to) {
        delete this._resolvers[from][to];
    }

    /**
     * Assert that the resolver function for from-to mapping exists.
     *
     * @param {String} from
     * @param {String} to
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
     * @param {String} from
     * @param {String} to
     * @return {Boolean}
     */
    hasResolver(from, to) {
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
     * @param {String} from
     * @param {String} to
     * @return {*}
     */
    map(value, from, to) {
        this._assertResolver(from, to);
        const resolver = this.getResolvers()[from][to];
        return resolver(value);
    }
}

module.exports = Mapper;
