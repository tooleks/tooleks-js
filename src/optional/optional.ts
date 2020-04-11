/**
 * Calls the given function.
 * Returns default value if the given function returns `undefined` or `null`.
 * Returns default value if the given function throws an error.
 */
export default function optional(func: Function, defaultValue: any = null): any {
  try {
    const value = func();
    if (value != null) {
      return value;
    }
    return defaultValue;
  } catch (error) {
    return defaultValue;
  }
}
