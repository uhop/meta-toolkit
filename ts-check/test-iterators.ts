'use strict';

import {augmentIterator, normalizeIterator, mapIterator, filterIterator} from '../src/iterators.js';

const range = (from: number, to: number): Iterator<number> => {
  let index = from;
  return {
    next(): IteratorResult<number> {
      if (index >= to) return {done: true, value: undefined};
      return {value: index++, done: false};
    }
  };
};

{
  const iterator = range(0, 3);
  const augmented = augmentIterator(iterator);
}

{
  const iterator = range(0, 3);
  const normalized = normalizeIterator(iterator);
}

{
  const iterator = normalizeIterator(range(0, 3));
  const mapped = mapIterator(iterator, v => v * 2);
}

{
  const iterator = normalizeIterator(range(0, 3));
  const filtered = filterIterator(iterator, v => v % 2 == 0); // Only even numbers
}
