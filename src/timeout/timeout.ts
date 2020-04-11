/**
 * Returns a Promise that will be resolved after the specified time in milliseconds.
 */
export default function timeout(timeout: number = 0): Promise<void> {
  return new Promise<void>((resolve) => {
    setTimeout(resolve, timeout);
  });
}
