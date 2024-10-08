'use strict';

import test from 'tape-six';

import {get, set, remove, forceSet} from '../src/path.js';

test('Path', t => {
  const object = {};

  forceSet(object, 'a.b.c', 1);
  t.deepEqual(object, {a: {b: {c: 1}}});

  t.equal(set(object, 'a.b.c', 2), 1);
  t.deepEqual(object, {a: {b: {c: 2}}});

  t.equal(get(object, 'a.b.c'), 2);

  t.deepEqual(remove(object, 'a.b'), {c: 2});
  t.deepEqual(object, {a: {}});

  set(object, 'a/b', 1, {delimiter: '/'});
  t.deepEqual(object, {a: {b: 1}});

  forceSet(object, ['a', 'b', 'c'], 3);
  t.deepEqual(object, {a: {b: {c: 3}}});

  const nothing = Symbol();

  t.equal(get(object, 'a.b.c', {defaultValue: nothing}), 3);
  t.equal(get(object, 'a.B.c', {defaultValue: nothing}), nothing);
  t.equal(get(object, 'a.b.d', {defaultValue: nothing}), nothing);

  t.deepEqual(remove(object, 'a'), {b: {c: 3}});
});
