// @ts-self-types="./comparators.d.ts"

/**
 * Adapts a less function to a compare function.
 *
 * @param {function(any, any): boolean} lessFn a function that returns true if the first argument is less than the second
 * @returns {function(any, any): number} a function that returns -1, 0, or 1
 */
export const compareFromLess = lessFn => (a, b) => (lessFn(a, b) ? -1 : lessFn(b, a) ? 1 : 0);
/**
 * Adapts a compare function to a less function.
 *
 * @param {function(any, any): number} compareFn a compare function returning a negative, zero, or positive number
 * @returns {function(any, any): boolean} a function that returns true if the first argument is less than the second
 */
export const lessFromCompare = compareFn => (a, b) => compareFn(a, b) < 0;

/**
 * Adapts a less function to an equal function.
 *
 * @param {function(any, any): boolean} lessFn a function that returns true if the first argument is less than the second
 * @returns {function(any, any): boolean} a function that returns true if the arguments are equal
 */
export const equalFromLess = lessFn => (a, b) => !(Boolean(lessFn(a, b)) ^ Boolean(lessFn(b, a)));

/**
 * Reverses a less function.
 *
 * @param {function(any, any): boolean} lessFn a function that returns true if the first argument is less than the second
 * @returns {function(any, any): boolean} a function with reversed argument order
 */
export const reverseLess = lessFn => (a, b) => lessFn(b, a);
/**
 * Reverses a compare function.
 *
 * @param {function(any, any): number} compareFn a compare function returning a negative, zero, or positive number
 * @returns {function(any, any): number} a function with reversed argument order
 */
export const reverseCompare = compareFn => (a, b) => compareFn(b, a);
