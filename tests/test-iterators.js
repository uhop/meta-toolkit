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

test('Iterators: augmentIterator() idempotency', t => {
  const iterator = range(0, 3);
  const augmented = augmentIterator(iterator);
  const fn = augmented[Symbol.iterator];

  augmentIterator(augmented);
  t.equal(augmented[Symbol.iterator], fn);
});

test('Iterators: augmentIterator() skips already-iterable', t => {
  const original = function () {
    return this;
  };
  const iterator = range(0, 3);
  iterator[Symbol.iterator] = original;

  augmentIterator(iterator);
  t.equal(iterator[Symbol.iterator], original);
});

test('Iterators: augmentIterator() works on null-prototype iterators', t => {
  let index = 0;
  const iterator = Object.assign(Object.create(null), {
    next: () => (index < 2 ? {value: index++, done: false} : {done: true})
  });

  const augmented = augmentIterator(iterator);
  t.deepEqual([...augmented], [0, 1]);
});

test('Iterators: mapIterator() on an array is lazy, not eager', t => {
  const mapped = mapIterator([1, 2, 3], v => v * 2);

  t.notOk(Array.isArray(mapped));
  t.equal(typeof mapped.next, 'function');
  t.deepEqual([...mapped], [2, 4, 6]);
});

test('Iterators: filterIterator() on an array is lazy, not eager', t => {
  const filtered = filterIterator([1, 2, 3], v => v % 2 == 1);

  t.notOk(Array.isArray(filtered));
  t.equal(typeof filtered.next, 'function');
  t.deepEqual([...filtered], [1, 3]);
});

test('Iterators: mapIterator() result is lazy and single-use', t => {
  let produced = 0;
  function* source() {
    for (let i = 1; i <= 3; ++i) {
      ++produced;
      yield i;
    }
  }

  const mapped = mapIterator(source(), v => v * 2);
  t.equal(produced, 0);
  t.deepEqual([...mapped], [2, 4, 6]);
  t.deepEqual([...mapped], []);
});

test('Iterators: mapIterator() forwards return() on early exit', t => {
  let closed = false;
  function* source() {
    try {
      yield 1;
      yield 2;
      yield 3;
    } finally {
      closed = true;
    }
  }

  for (const value of mapIterator(source(), v => v)) {
    if (value === 2) break;
  }
  t.ok(closed);
});

test('Iterators: filterIterator() forwards return() on early exit', t => {
  let closed = false;
  function* source() {
    try {
      yield 1;
      yield 2;
      yield 3;
    } finally {
      closed = true;
    }
  }

  for (const value of filterIterator(source(), () => true)) {
    if (value === 2) break;
  }
  t.ok(closed);
});
