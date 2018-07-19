import {isFunction, isString, isUndefined} from "../utils";

/**
 * Assert "from" parameter.
 *
 * @param {*} from
 * @return {void}
 * @throws TypeError
 */
function assertFromParameter(from) {
    if (!isString(from)) {
        throw new TypeError('The "from" parameter should be a string.');
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
    if (!isString(to)) {
        throw new TypeError('The "to" parameter should be a string.');
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
    if (!isFunction(resolver)) {
        throw new TypeError('The "resolver" parameter should be a function.');
    }
}

/**
 * Mapper class.
 */
export default class Mapper {
    /**
     * Mapper constructor.
     */
    constructor() {
        this._resolvers = {};
        this._assertResolver = this._assertResolver.bind(this);
        this.registerResolver = this.registerResolver.bind(this);
        this.hasResolver = this.hasResolver.bind(this);
        this.removeResolver = this.removeResolver.bind(this);
        this.map = this.map.bind(this);
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
        if (isUndefined(this._resolvers[from])) {
            throw new Error(`Resolver for "${from}" not found.`);
        }
        if (isUndefined(this._resolvers[from][to])) {
            throw new Error(`Resolver for "${to}" not found.`);
        }
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
        if (isUndefined(this._resolvers[from])) {
            this._resolvers[from] = {};
        }
        this._resolvers[from][to] = resolver;
        return this;
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
        const resolver = this._resolvers[from][to];
        return resolver(value);
    }
}
