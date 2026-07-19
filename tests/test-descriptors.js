import test from 'tape-six';

import {
  makeGetter,
  makeSetter,
  makeAccessors,
  addDescriptor,
  addDescriptors,
  addAccessor,
  addAccessors,
  addGetter,
  addGetters,
  addSetter,
  addSetters,
  addProtoDescriptor,
  addProtoDescriptors,
  addProtoAccessor,
  addProtoAccessors,
  addProtoSetter,
  addProtoSetters,
  copyDescriptors
} from '../src/descriptors.js';

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

test('Descriptors: addAccessor()', t => {
  let x = 42;

  const target = {};
  const g = () => x;
  const s = v => (x = v);

  addAccessor(target, 'foo', g, s);
  t.equal(target.foo, 42);

  target.foo = 33;
  t.equal(target.foo, 33);
});

test('Descriptors: addGetters()', t => {
  const target = {};

  addGetters(target, {foo: () => 42, 'bar, baz': () => 33});
  t.equal(target.foo, 42);
  t.equal(target.bar, 33);
  t.equal(target.baz, 33);

  const sym = Symbol('sym');
  const target2 = {};
  addGetters(target2, {[sym]: () => 99});
  t.equal(target2[sym], 99);
});

test('Descriptors: addGetter()', t => {
  const target = {};

  addGetter(target, 'foo, bar', () => 42);
  t.equal(target.foo, 42);
  t.equal(target.bar, 42);
});

test('Descriptors: addSetter()', t => {
  let x = 0;
  const target = {};

  addSetter(target, 'foo, bar', v => (x = v));
  target.foo = 42;
  t.equal(x, 42);
  target.bar = 33;
  t.equal(x, 33);
  t.equal(target.foo, undefined);
});

test('Descriptors: addSetters()', t => {
  let x = 0,
    y = 0;
  const sym = Symbol('s');
  const target = {};

  addSetters(target, {foo: v => (x = v), [sym]: v => (y = v)});
  target.foo = 42;
  target[sym] = 99;
  t.equal(x, 42);
  t.equal(y, 99);
});

test('Descriptors: addAccessors()', t => {
  let x = 1;
  const target = {};

  addAccessors(target, {
    foo: {get: () => x, set: v => (x = v)},
    'bar, baz': {get: () => 2}
  });
  t.equal(target.foo, 1);
  target.foo = 42;
  t.equal(target.foo, 42);
  t.equal(target.bar, 2);
  t.equal(target.baz, 2);
});

test('Descriptors: addProto* family', t => {
  class A {}
  let x = 1,
    s = 0;

  addProtoDescriptor(
    A,
    'foo',
    makeGetter(() => 1)
  );
  addProtoDescriptors(A, {bar: makeGetter(() => 2)});
  addProtoAccessor(
    A,
    'baz',
    () => x,
    v => (x = v)
  );
  addProtoAccessors(A, {quux: {get: () => 4}});
  addProtoSetter(A, 'sink', v => (s = v));
  addProtoSetters(A, {drain: v => (s = -v)});

  const a = new A();
  t.equal(a.foo, 1);
  t.equal(a.bar, 2);
  t.equal(a.baz, 1);
  a.baz = 3;
  t.equal(a.baz, 3);
  t.equal(a.quux, 4);
  a.sink = 5;
  t.equal(s, 5);
  a.drain = 6;
  t.equal(s, -6);
});

test('Descriptors: addDescriptors() with symbol keys', t => {
  const sym = Symbol('s');
  const target = {};

  addDescriptors(target, {foo: makeGetter(() => 1), [sym]: makeGetter(() => 2)});
  t.equal(target.foo, 1);
  t.equal(target[sym], 2);
});

test('Descriptors: copyDescriptors()', t => {
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

  t.equal(target.foo, 42);
  t.equal(target.bar, 33);
  t.equal(target.baz, 99);
  t.equal(target.quux(), 1001);
});

test('Descriptors: copyDescriptors() with AliasDict', t => {
  const source = {
    foo: 1,
    get bar() {
      return 2;
    }
  };
  const target = {};

  copyDescriptors(target, source, {foo: 'f1, f2', bar: 'b'});
  t.equal(target.f1, 1);
  t.equal(target.f2, 1);
  t.equal(target.b, 2);
});

test('Descriptors: copyDescriptors() with symbol names', t => {
  const sym = Symbol('s');
  const source = {[sym]: 42, foo: 1};
  const target = {};

  copyDescriptors(target, source, [sym, 'foo']);
  t.equal(target[sym], 42);
  t.equal(target.foo, 1);
});

test('Descriptors: copyDescriptors() with force', t => {
  const source = {foo: 99};
  const target = {foo: 1};

  copyDescriptors(target, source, 'foo');
  t.equal(target.foo, 1);

  copyDescriptors(target, source, 'foo', true);
  t.equal(target.foo, 99);
});
