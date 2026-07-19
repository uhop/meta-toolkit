/**
 * Augments an iterator with an iterable interface if it does not have an own one.
 *
 * @param iterator An iterator object.
 * @returns The same iterator, now iterable.
 * @remarks Mutates the argument: adds an own `[Symbol.iterator]() { return this; }` when missing.
 */
export function augmentIterator<T = any>(iterator: Iterator<T>): IterableIterator<T>;

/**
 * Normalizes an iterator by augmenting it with an iterable interface if it is not defined.
 *
 * @param iterator An iterator object.
 * @returns The normalized iterator.
 * @remarks Uses the builtin `Iterator.from()` when available, falling back to {@link augmentIterator()}.
 *   On runtimes with native iterator helpers the result exposes the full helper family —
 *   `normalizeIterator(it).take(3)`, `.drop()`, `.flatMap()`, etc. — which is the recommended
 *   route to helpers this module does not wrap itself.
 */
export function normalizeIterator<T = any>(iterator: Iterator<T>): IterableIterator<T>;

/**
 * Maps values from an iterable or iterator to new values.
 *
 * @param iterable An iterable or iterator object.
 * @param callbackFn A function that produces an element of the new iterator,
 *        taking two arguments:
 *        `value`: the next value from the input iterator,
 *        `index`: the current index in the input iterator.
 * @returns A lazy, single-use iterable iterator that emits the values returned by `callbackFn`.
 * @remarks Delegates to the native `Iterator.prototype.map()` when available.
 *   The result is always lazy and single-use. `return()` is forwarded to the source,
 *   so an early exit (e.g. `break` in `for...of`) closes the source iterator.
 */
export function mapIterator<T = any, R = any>(
  iterable: Iterable<T> | Iterator<T>,
  callbackFn: (value: T, index: number) => R
): IterableIterator<R>;

/**
 * Filters values from an iterable or iterator.
 *
 * @param iterable An iterable or iterator object.
 * @param callbackFn A function that determines whether an element of the input iterator
 *        is included in the output iterator, taking two arguments:
 *        `value`: the next value from the input iterator,
 *        `index`: the current index in the input iterator.
 * @returns A lazy, single-use iterable iterator that emits the values from the input iterator
 *        for which the callback function returns true.
 * @remarks Delegates to the native `Iterator.prototype.filter()` when available.
 *   The result is always lazy and single-use. `return()` is forwarded to the source,
 *   so an early exit (e.g. `break` in `for...of`) closes the source iterator.
 */
export function filterIterator<T = any>(
  iterable: Iterable<T> | Iterator<T>,
  callbackFn: (value: T, index: number) => boolean
): IterableIterator<T>;
