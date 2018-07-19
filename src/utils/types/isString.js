/**
 * Determine if value is a string.
 *
 * @param {*} value
 * @return {boolean}
 */
export default function isString(value) {
    return typeof value === "string" || value instanceof String;
}
