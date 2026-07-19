// @ts-self-types="./iterators.d.ts"

export const augmentIterator = iterator => {
  if (!Object.hasOwn(iterator, Symbol.iterator)) {
    iterator[Symbol.iterator] = function () {
      return this;
    };
  }
  return iterator;
};

const nativeIterator = typeof globalThis.Iterator?.from == 'function' ? globalThis.Iterator : null;

export const normalizeIterator = nativeIterator
  ? iterator => nativeIterator.from(iterator)
  : augmentIterator;

const toIterator = iterable =>
  typeof iterable?.[Symbol.iterator] == 'function' ? iterable[Symbol.iterator]() : iterable;

export const mapIterator = (iterable, callbackFn) => {
  const it = toIterator(iterable);
  if (nativeIterator) return nativeIterator.from(it).map(callbackFn);
  let index = 0;
  return augmentIterator({
    next: () => {
      const result = it.next();
      if (result.done) return result;
      return {done: false, value: callbackFn(result.value, index++)};
    },
    return: value => {
      it.return?.(value);
      return {done: true, value};
    }
  });
};

export const filterIterator = (iterable, callbackFn) => {
  const it = toIterator(iterable);
  if (nativeIterator) return nativeIterator.from(it).filter(callbackFn);
  let index = 0;
  return augmentIterator({
    next: () => {
      for (;;) {
        const result = it.next();
        if (result.done) return result;
        if (callbackFn(result.value, index++)) return result;
      }
    },
    return: value => {
      it.return?.(value);
      return {done: true, value};
    }
  });
};
