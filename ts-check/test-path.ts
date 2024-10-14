'use strict';

import {get, set, remove, forceSet} from '../src/path.js';

{
  const object = {};

  forceSet(object, 'a.b.c', 1);
  remove(object, 'a.b');
  set(object, 'a/b', 1, {delimiter: '/'});
  forceSet(object, ['a', 'b', 'c'], 3);

  const nothing = Symbol();

  get(object, 'a.b.c', {defaultValue: nothing});
  get(object, 'a.B.c', {defaultValue: nothing});
  get(object, 'a.b.d', {defaultValue: nothing});

  remove(object, 'a');
}
