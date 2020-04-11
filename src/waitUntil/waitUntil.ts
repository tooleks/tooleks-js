import TimeoutError from './TimeoutError';

/**
 * Returns a Promise that will be resolved when the given function will return truthy value.
 *
 * @throws TimeoutError
 */
export default function waitUntil(func: Function, timeout: number = 60 * 1000, interval: number = 1): Promise<any> {
  return new Promise<any>((resolve, reject) => {
    const intervalId = setInterval(() => {
      try {
        const result = func();
        if (result) {
          clearInterval(intervalId);
          clearTimeout(timeoutId);
          resolve(result);
        }
      } catch (error) {
        clearInterval(intervalId);
        clearTimeout(timeoutId);
        reject(error);
      }
    },                             interval);

    const timeoutId = setTimeout(() => {
      clearInterval(intervalId);
      reject(new TimeoutError(`Resolver function did not return truthy value during given timeout (${timeout}ms).`));
    },                           timeout);
  });
}
