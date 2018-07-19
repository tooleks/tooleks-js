/**
 * Determine if value is a boolean.
 *
 * @param {*} value
 * @return {boolean}
 */
export default function isBoolean(value) {
    return typeof value === "boolean" || value instanceof Boolean;
}
