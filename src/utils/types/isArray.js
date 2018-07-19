/**
 * Determine if value is an array.
 *
 * @param {*} value
 * @return {boolean}
 */
export default function isArray(value) {
    return Array.isArray(value) || value instanceof Array;
}
