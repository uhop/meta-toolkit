'use strict';

import {copyOptions} from '../src/options.js';

{
  const object = {foo: 1, bar: 2, baz: 3};

  copyOptions(object, {foo: 10}, {foo: 100, bar: 200});

  copyOptions(object, {foo: 10}, {bar: 200, baz: 300});

  copyOptions(object, {foo: 10, quux: void 0}, {foo: 1, baz: 300});

  copyOptions(object, {foo: 10, quux: void 0}, {quux: 4});

  copyOptions(object, {foo: 10, bar: 20}, {foo: 100}, {bar: 200});

  const newObject = copyOptions({}, {foo: 0, bar: 0}, object);
}
