'use strict';

import test from 'tape-six';

import {prototypes, getPropertyDescriptor} from '../src/prototypes.js';

class Foo {
  foo() {}
}

class Bar extends Foo {
  bar() {}
}

class Baz extends Bar {
  baz() {}
}

test('Prototypes: prototypes()', t => {
  const baz = new Baz();

  t.deepEqual([...prototypes(baz)], [baz, Baz.prototype, Bar.prototype, Foo.prototype]);
  t.deepEqual(
    [...prototypes(baz)].map(p => p.constructor.name),
    ['Baz', 'Baz', 'Bar', 'Foo']
  );

  t.deepEqual([...prototypes(baz, true)], [Baz.prototype, Bar.prototype, Foo.prototype]);
  t.deepEqual(
    [...prototypes(baz, true)].map(p => p.constructor.name),
    ['Baz', 'Bar', 'Foo']
  );
});

test('Prototypes: getPropertyDescriptor()', t => {
  const baz = new Baz();

  t.equal(getPropertyDescriptor(baz, 'foo')?.value?.name, 'foo');
  t.equal(getPropertyDescriptor(baz, 'bar')?.value?.name, 'bar');
  t.equal(getPropertyDescriptor(baz, 'baz')?.value?.name, 'baz');

  t.notOk(getPropertyDescriptor(baz, 'quux'));
});
