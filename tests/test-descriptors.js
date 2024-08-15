import test from 'tape-six';

import {makeGetter, makeSetter, makeAccessors, addDescriptor, addDescriptors} from 'meta-toolkit/descriptors.js';

test('Descriptors: makeGetter()', t => {
  const g = () => 42;
  const descriptor = makeGetter(g);

  t.equal(typeof descriptor.get, 'function');
  t.equal(descriptor.get, g);
  t.equal(descriptor.set, undefined);
  t.equal(descriptor.enumerable, false);
  t.equal(descriptor.configurable, true);
});

test('Descriptors: makeSetter()', t => {
  const s = v => void v;
  const descriptor = makeSetter(s);

  t.equal(descriptor.get, undefined);
  t.equal(typeof descriptor.set, 'function');
  t.equal(descriptor.set, s);
  t.equal(descriptor.enumerable, false);
  t.equal(descriptor.configurable, true);
});

test('Descriptors: makeAccessors()', t => {
  const g = () => 42;
  const s = v => void v;
  const descriptor = makeAccessors(g, s);

  t.equal(descriptor.get, g);
  t.equal(descriptor.set, s);
  t.equal(descriptor.enumerable, false);
  t.equal(descriptor.configurable, true);
});

test('Descriptors: default descriptor', t => {
  const g = () => 42;
  const descriptor = makeGetter(g, {enumerable: true, configurable: false});

  t.equal(descriptor.get, g);
  t.equal(descriptor.set, undefined);
  t.equal(descriptor.enumerable, true);
  t.equal(descriptor.configurable, false);
});

test('Descriptors: addDescriptor()', t => {
  const target = {};

  addDescriptor(
    target,
    'foo',
    makeGetter(() => 42)
  );
  t.equal(target.foo, 42);

  addDescriptor(
    target,
    'foo, bar',
    makeGetter(() => 33)
  );
  t.equal(target.foo, 42);
  t.equal(target.bar, 33);

  addDescriptor(
    target,
    ['foo', 'bar'],
    makeGetter(() => 99),
    true
  );
  t.equal(target.foo, 99);
  t.equal(target.bar, 99);
});

test('Descriptors: addDescriptors()', t => {
  const target = {};

  addDescriptors(target, {foo: makeGetter(() => 42), bar: makeGetter(() => 33)});
  t.equal(target.foo, 42);
  t.equal(target.bar, 33);
});
