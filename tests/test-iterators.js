'use strict';

import test from 'tape-six';

import {augmentIterator, normalizeIterator, mapIterator, filterIterator} from '../src/iterators.js';

const range = (from, to) => {
  let index = from;
  return {
    next() {
      if (index >= to) return {done: true};
      return {value: index++, done: false};
    }
  };
};

test('Iterators: augmentIterator()', t => {
  const iterator = range(0, 3);
  t.equal(typeof iterator[Symbol.iterator], 'undefined');

  const augmented = augmentIterator(iterator);
  t.equal(typeof augmented[Symbol.iterator], 'function');
  t.equal(augmented[Symbol.iterator](), iterator);
});

test('Iterators: normalizeIterator()', t => {
  const iterator = range(0, 3);
  t.equal(typeof iterator[Symbol.iterator], 'undefined');

  const normalized = normalizeIterator(iterator);
  t.equal(typeof normalized[Symbol.iterator], 'function');

  t.deepEqual([...normalized], [0, 1, 2]);
});

test('Iterators: mapIterator()', t => {
  const iterator = normalizeIterator(range(0, 3));
  const mapped = mapIterator(iterator, v => v * 2);

  t.deepEqual([...mapped], [0, 2, 4]);
});

test('Iterators: filterIterator()', t => {
  const iterator = normalizeIterator(range(0, 3));
  const filtered = filterIterator(iterator, v => v % 2 == 0); // Only even numbers

  t.deepEqual([...filtered], [0, 2]);
});
