import { Duration } from "../types";

/**
 * @name sleep
 * @description
 * Returns a promise based setTimeout. Like Vue's nextTick, but with setTimeout
 * @param { number } [duration=0] - How long for the timeout
 * @param { (()=>void) } [callback] - An optional function. Passing a function here, the function will be executed after the duration has passed. This will terminate the use of .then
 * @returns { Promise<number> }
 * **/
export async function sleep(
  _duration?: Duration | (() => void),
  _callback?: () => void
): Promise<number> {
  const duration = (
    typeof _duration === "function"
      ? 0
      : // Check if _duration is a string and ends with a unit
      typeof _duration === "string" &&
        (_duration.endsWith("ms") ||
          _duration.endsWith("s") ||
          _duration.endsWith(""))
        ? // Parse the string to a number
          parseInt(_duration, 10)
        : // Use the value directly if it's already a number
        (_duration as number) >= 0
        ? _duration
        : 0
  ) as number | any;
  

  const callback = typeof _duration === "function" ? _duration : _callback;

  if (duration === Infinity) {
    return Promise.reject("Duration must be less than Infinity");
  }

  if (typeof callback === "function") {
    let timeout: any = undefined;
    timeout = setTimeout(() => {
      callback();

      clearTimeout(timeout);
    }, duration);

    return Promise.resolve(timeout);
  }

  return new Promise((resolve) => {
    let timeout: any = undefined;
    timeout = setTimeout(() => {
      resolve(timeout);

      clearTimeout(timeout);
    }, duration);
  });
}

/**
 * @name cancelSleep
 * @description
 * Cancels sleep above. Calling sleep to be canceled must include a function. let wait = sleep(1000, () => { ... });
 * @param { number } [id=0] - id of the sleep. See description
 * **/
export async function cancelSleep(id: number) {
  clearTimeout(id);
}
