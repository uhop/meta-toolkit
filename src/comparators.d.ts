/**
 * Adapt a less function to a compare function.
 *
 * @param lessFn a function that returns true if the first argument is less than the second
 * @returns a function that returns a negative value if the first argument is less than the second, a positive value if the first argument is greater than the second, and 0 if the arguments are equal
 */
export function compareFromLess<T = any>(lessFn: (a: T, b: T) => boolean): (a: T, b: T) => number;

/**
 * Adapt a compare function to a less function.
 *
 * @param compareFn a function that returns a number (a negative value if the first argument is less than the second, a positive value if the first argument is greater than the second, and 0 if the arguments are equal)
 * @returns a function that returns true if the first argument is less than the second
 */
export function lessFromCompare<T = any>(
  compareFn: (a: T, b: T) => number
): (a: T, b: T) => boolean;

/**
 * Adapt a less function to an equal function.
 *
 * @param lessFn a function that returns true if the first argument is less than the second
 * @returns a function that returns true if the first argument is equal to the second
 */
export function equalFromLess<T = any>(lessFn: (a: T, b: T) => boolean): (a: T, b: T) => boolean;

/**
 * Adapt a compare function to an equal function.
 *
 * @param compareFn a function that returns a number (a negative value if the first argument is less than the second, a positive value if the first argument is greater than the second, and 0 if the arguments are equal)
 * @returns a function that returns true if the first argument is equal to the second
 */
export function equalFromCompare<T = any>(
  compareFn: (a: T, b: T) => number
): (a: T, b: T) => boolean;

/**
 * Reverses a less function.
 *
 * @param lessFn a function that returns true if the first argument is less than the second
 * @returns a function that returns true if the first argument is greater than the second
 */
export function reverseLess<T = any>(lessFn: (a: T, b: T) => boolean): (a: T, b: T) => boolean;

/**
 * Reverses a compare function.
 *
 * @param compareFn a function that returns a number (a negative value if the first argument is less than the second, a positive value if the first argument is greater than the second, and 0 if the arguments are equal)
 * @returns a function that returns a number reversing the comparison (a negative value if the first argument is greater than the second, a positive value if the first argument is less than the second, and 0 if the arguments are equal)
 */
export function reverseCompare<T = any>(compareFn: (a: T, b: T) => number): (a: T, b: T) => number;
