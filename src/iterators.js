'use strict';

export const augmentIterator = iterator => {
  if (!iterator.hasOwnProperty(Symbol.iterator)) {
    iterator[Symbol.iterator] = function () {
      return this;
    };
  }
  return iterator;
};

let normalizeIterator = augmentIterator;
if (typeof globalThis.Iterator?.from == 'function') {
  normalizeIterator = iterator => Iterator.from(iterator);
}
export {normalizeIterator};

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
