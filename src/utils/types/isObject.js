/**
 * Determine if value is an object and not null.
 *
 * @param {*} value
 * @param {boolean} value
 * @return {boolean}
 */
export default function isObject(value) {
    return typeof value === "object" && value !== null;
}
