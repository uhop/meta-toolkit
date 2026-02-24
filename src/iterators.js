// @ts-self-types="./iterators.d.ts"

/**
 * Augments an iterator with an iterable interface if it is not defined.
 *
 * @param {Iterator} iterator an iterator object
 * @returns {IterableIterator} the augmented iterator
 */
export const augmentIterator = iterator => {
  if (!iterator.hasOwnProperty(Symbol.iterator)) {
    iterator[Symbol.iterator] = function () {
      return this;
    };
  }
  return iterator;
};

/**
 * Normalizes an iterator using `Iterator.from()` when available, otherwise `augmentIterator`.
 *
 * @param {Iterator} iterator an iterator object
 * @returns {IterableIterator} the normalized iterator
 */
let normalizeIterator = augmentIterator;
if (typeof globalThis.Iterator?.from == 'function') {
  normalizeIterator = iterator => Iterator.from(iterator);
}
export {normalizeIterator};

/**
 * Lazily maps values from an iterable to new values.
 *
 * @param {Iterable} iterator an iterable object
 * @param {function(any, number): any} callbackFn a function producing each new value from (value, index)
 * @returns {IterableIterator} an iterator emitting the mapped values
 */
export const mapIterator = (iterator, callbackFn) => {
  if (typeof iterator?.map == 'function') return iterator.map(callbackFn);
  return {
    [Symbol.iterator]: () => {
      const it = iterator[Symbol.iterator]();
      let index = 0;
      return normalizeIterator({
        next: () => {
          const result = it.next();
          if (result.done) return result;
          return {value: callbackFn(result.value, index++)};
        }
      });
    }
  };
};

/**
 * Lazily filters values from an iterable.
 *
 * @param {Iterable} iterator an iterable object
 * @param {function(any, number): boolean} callbackFn a predicate receiving (value, index)
 * @returns {IterableIterator} an iterator emitting only values for which callbackFn returns true
 */
export const filterIterator = (iterator, callbackFn) => {
  if (typeof iterator?.filter == 'function') return iterator.filter(callbackFn);
  return {
    [Symbol.iterator]: () => {
      const it = iterator[Symbol.iterator]();
      let index = 0;
      return normalizeIterator({
        next: () => {
          for (;;) {
            const result = it.next();
            if (result.done) return result;
            if (callbackFn(result.value, index++)) return result;
          }
        }
      });
    }
  };
};
