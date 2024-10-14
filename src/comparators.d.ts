/**
 * Adapt a less function to a compare function.
 *
 * @param lessFn a function that returns true if the first argument is less than the second
 * @returns a function that returns a negative value if the first argument is less than the second, a positive value if the first argument is greater than the second, and 0 if the arguments are equal
 */
export function compareFromLess(lessFn: (a: any, b: any) => boolean): (a: any, b: any) => number;

/**
 * Adapt a compare function to a less function.
 *
 * @param compareFn a function that returns a number (a negative value if the first argument is less than the second, a positive value if the first argument is greater than the second, and 0 if the arguments are equal)
 * @returns a function that returns true if the first argument is less than the second
 */
export function lessFromCompare(compareFn: (a: any, b: any) => number): (a: any, b: any) => boolean;

/**
 * Adapt a less function to an equal function.
 *
 * @param lessFn a function that returns true if the first argument is less than the second
 * @returns a function that returns true if the first argument is equal to the second
 */
export function equalFromLess(lessFn: (a: any, b: any) => boolean): (a: any, b: any) => boolean;

/**
 * Reverses a less function.
 *
 * @param lessFn a function that returns true if the first argument is less than the second
 * @returns a function that returns true if the first argument is greater or equal than the second
 */
export function reverseLess(lessFn: (a: any, b: any) => boolean): (a: any, b: any) => boolean;

/**
 * Reverses a compare function.
 *
 * @param compareFn a function that returns a number (a negative value if the first argument is less than the second, a positive value if the first argument is greater than the second, and 0 if the arguments are equal)
 * @returns a function that returns a number reversing the comparison (a negative value if the first argument is greater than the second, a positive value if the first argument is less than the second, and 0 if the arguments are equal)
 */
export function reverseCompare(compareFn: (a: any, b: any) => number): (a: any, b: any) => number;
