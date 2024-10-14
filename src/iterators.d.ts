/**
 * Augments an iterator with an iterable interface if it is not defined.
 *
 * @param iterator An iterator object.
 * @returns The augmented iterator.
 */
export function augmentIterator<T = any>(iterator: Iterator<T>): IterableIterator<T>;

/**
 * Normalizes an iterator by augmenting it with an iterable interface if it is not defined.
 *
 * @param iterator An iterator object.
 * @returns The normalized iterator.
 * @remarks It can use a builtin `Iterator.from()` if it is defined or {@link augmentIterator()}.
 */
export function normalizeIterator<T = any>(iterator: Iterator<T>): IterableIterator<T>;

/**
 * Maps values from an iterable object to new values.
 *
 * @param iterator An iterable object.
 * @param callbackFn A function that produces an element of the new iterator,
 *        taking two arguments:
 *        `value`: the next value from the input iterator,
 *        `index`: the current index in the input iterator.
 * @returns An iterator that emits the values returned by `callbackFn`.
 * @remarks If `iterator.map()` is defined, it will be used.
 */
export function mapIterator<T = any, R = any>(
  iterator: Iterable<T>,
  callbackFn: (value: T, index: number) => R
): IterableIterator<R>;

/**
 * Filters values from an iterable object to new values.
 *
 * @param iterator An iterable object.
 * @param callbackFn A function that determines whether an element of the input iterator
 *        is included in the output iterator, taking two arguments:
 *        `value`: the next value from the input iterator,
 *        `index`: the current index in the input iterator.
 * @returns An iterator that emits the values from the input iterator for which the callback
 *        function returns true.
 * @remarks If `iterator.filter()` is defined, it will be used.
 */
export function filterIterator<T = any>(
  iterator: Iterable<T>,
  callbackFn: (value: T, index: number) => boolean
): IterableIterator<T>;
