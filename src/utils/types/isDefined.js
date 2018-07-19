import isUndefined from "./isUndefined";

/**
 * Determine if value is not undefined.
 *
 * @param {*} value
 * @return {boolean}
 */
export default function isDefined(value) {
    return !isUndefined(value);
}
