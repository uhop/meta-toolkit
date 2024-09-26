'use strict';

import test from 'tape-six';

import {copyOptions} from '../src/options.js';

test('Options: copyOptions()', t => {
  const object = {foo: 1, bar: 2, baz: 3};

  copyOptions(object, {foo: 10}, {foo: 100, bar: 200});
  t.deepEqual(object, {foo: 100, bar: 2, baz: 3});

  copyOptions(object, {foo: 10}, {bar: 200, baz: 300});
  t.deepEqual(object, {foo: 10, bar: 2, baz: 3});

  copyOptions(object, {foo: 10, quux: void 0}, {foo: 1, baz: 300});
  t.deepEqual(object, {foo: 1, bar: 2, baz: 3});

  copyOptions(object, {foo: 10, quux: void 0}, {quux: 4});
  t.deepEqual(object, {foo: 10, bar: 2, baz: 3, quux: 4});

  copyOptions(object, {foo: 10, bar: 20}, {foo: 100}, {bar: 200});
  t.deepEqual(object, {foo: 100, bar: 200, baz: 3, quux: 4});

  const newObject = copyOptions({}, {foo: 0, bar: 0}, object);
  t.deepEqual(newObject, {foo: 100, bar: 200});
});
