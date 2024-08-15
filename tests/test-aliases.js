'use strict';

import test from 'tape-six';

import {addAlias, addAliases} from 'meta-toolkit/aliases.js';

test('Aliases: addAlias()', t => {
  const foo = Symbol(),
    object = {
      [foo]: 42,
      get bar() {
        return this[foo];
      }
    },
    key = Symbol();

  addAlias(object, foo, 'foo1, foo2');
  addAlias(object, 'bar', ['bar1', 'bar2', key]);

  t.equal(object[foo], 42);
  t.equal(object.foo1, 42);
  t.equal(object.foo2, 42);

  t.equal(object.bar, 42);
  t.equal(object.bar1, 42);
  t.equal(object.bar2, 42);

  t.equal(object[key], 42);
});

test('Aliases: addAliases()', t => {
  const foo = Symbol(),
    object = {
      [foo]: 42,
      get bar() {
        return this[foo];
      }
    },
    key = Symbol();

  addAliases(object, {
    [foo]: 'foo1, foo2',
    bar: ['bar1', 'bar2', key]
  });

  t.equal(object[foo], 42);
  t.equal(object.foo1, 42);
  t.equal(object.foo2, 42);

  t.equal(object.bar, 42);
  t.equal(object.bar1, 42);
  t.equal(object.bar2, 42);

  t.equal(object[key], 42);
});
