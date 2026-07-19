import test from 'tape-six';

import {get, has, set, remove, forceSet} from '../src/path.js';

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

test('Path: forceSet() errors', t => {
  t.throws(() => forceSet(null, 'a', 1));
  t.throws(() => forceSet(42, 'a', 1));
  t.throws(() => forceSet({}, [], 1));
});

test('Path: set() with non-existent path', t => {
  const nothing = Symbol();
  const object = {a: {b: 1}};

  t.equal(set(object, 'a.c.d', 2, {defaultValue: nothing}), nothing);
  t.equal(set(object, 'x.y', 2, {defaultValue: nothing}), nothing);
  t.deepEqual(object, {a: {b: 1}});
});

test('Path: has()', t => {
  const object = {a: {b: {c: undefined}}};

  t.equal(has(object, 'a.b.c'), true);
  t.equal(has(object, 'a.b.d'), false);
  t.equal(has(object, 'a.B.c'), false);
  t.equal(has(object, ['a', 'b']), true);
  t.equal(has(object, 'a/b', {delimiter: '/'}), true);
  t.equal(has(object, []), true);
  t.equal(has({}, 'a'), false);

  t.equal(get(object, 'a.b.c'), undefined);
  t.equal(has(object, 'a.b.c'), true);
});

test('Path: remove() edge cases', t => {
  const nothing = Symbol();

  t.equal(remove({}, 'a.b', {defaultValue: nothing}), nothing);
  t.equal(remove({a: 1}, 'a.b', {defaultValue: nothing}), nothing);
  t.equal(remove({}, '', {defaultValue: nothing}), nothing);
});
