'use strict';

import {
  makeGetter,
  makeSetter,
  makeAccessors,
  addDescriptor,
  addDescriptors,
  addAccessor,
  addGetters,
  copyDescriptors
} from '../src/descriptors.js';

{
  const g = () => 42;
  const descriptor = makeGetter(g);
}

{
  const s = (v: any) => void v;
  const descriptor = makeSetter(s);
}

{
  const g = () => 42;
  const s = (v: any) => void v;
  const descriptor = makeAccessors(g, s);
}

{
  const g = () => 42;
  const descriptor = makeGetter(g, {enumerable: true, configurable: false});
}

{
  const target = {};

  addDescriptor(
    target,
    'foo',
    makeGetter(() => 42)
  );

  addDescriptor(
    target,
    'foo, bar',
    makeGetter(() => 33)
  );

  addDescriptor(
    target,
    ['foo', 'bar'],
    makeGetter(() => 99),
    true
  );
}

{
  const target = {};

  addDescriptors(target, {foo: makeGetter(() => 42), bar: makeGetter(() => 33)});
}

{
  let x = 42;

  const target = {};
  const g = () => x;
  const s = (v: number) => (x = v);

  addAccessor(target, 'foo', g, s);

  // target.foo = 33;
}

{
  const target = {};

  addGetters(target, {foo: () => 42, 'bar, baz': () => 33});
}

{
  const target = {foo: 42};
  const source = {
    foo: 123,
    bar: 33,
    get baz() {
      return 99;
    },
    quux() {
      return 1001;
    }
  };

  copyDescriptors(target, source, 'foo, bar, baz, quux');
}
