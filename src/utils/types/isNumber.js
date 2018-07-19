/**
 * Determine if value is a number.
 *
 * @param {*} value
 * @return {boolean}
 */
export default function isNumber(value) {
    return typeof value === "number" || value instanceof Number;
}
