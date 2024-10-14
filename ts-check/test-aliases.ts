'use strict';

import {addAlias, addAliases} from '../src/aliases.js';

{
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
}

{
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
}
