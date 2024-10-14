'use strict';

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

{
  const baz = new Baz();

  prototypes(baz);
  prototypes(baz, true);
}

{
  const baz = new Baz();

  getPropertyDescriptor(baz, 'foo');
}
