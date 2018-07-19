/**
 * Determine if value is a number or numeric string.
 *
 * @param {*} value
 * @return {boolean}
 */
export default function isNumeric(value) {
    return !isNaN(parseFloat(value)) && isFinite(value);
}
