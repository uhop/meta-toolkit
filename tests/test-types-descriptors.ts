import test from 'tape-six';

import {
  defaultDescriptor,
  makeGetter,
  makeSetter,
  makeAccessors,
  addDescriptor,
  addDescriptors,
  addAccessor,
  addGetters,
  copyDescriptors
} from '../src/descriptors.js';
import type {DescriptorDict, GetterDict, AliasDict} from '../src/descriptors.js';

test('Types: descriptors — defaultDescriptor shape', t => {
  const c: true = defaultDescriptor.configurable;
  const e: false = defaultDescriptor.enumerable;
  t.pass();
});

test('Types: descriptors — descriptor factories', t => {
  const g: PropertyDescriptor = makeGetter(() => 42);
  const s: PropertyDescriptor = makeSetter((_v: any) => {});
  const a: PropertyDescriptor = makeAccessors(() => 42, (_v: any) => {});

  const g2: PropertyDescriptor = makeGetter(() => 42, {enumerable: true});
  const s2: PropertyDescriptor = makeSetter((_v: any) => {}, {enumerable: true});
  const a2: PropertyDescriptor = makeAccessors(() => 42, (_v: any) => {}, {enumerable: true});
  t.pass();
});

test('Types: descriptors — addDescriptor name forms', t => {
  const obj = {};
  const r1: object = addDescriptor(obj, 'foo', {value: 1});
  const r2: object = addDescriptor(obj, Symbol(), {value: 1});
  const r3: object = addDescriptor(obj, ['a', Symbol()], {value: 1});
  const r4: object = addDescriptor(obj, 'a, b', {value: 1}, true);
  t.pass();
});

test('Types: descriptors — addDescriptors with DescriptorDict', t => {
  const dict: DescriptorDict = {foo: {value: 1}};
  const r: object = addDescriptors({}, dict);
  const r2: object = addDescriptors({}, dict, true);
  t.pass();
});

test('Types: descriptors — addAccessor signature', t => {
  const r: object = addAccessor({}, 'x', () => 1, (_v: any) => {});
  const r2: object = addAccessor({}, ['x', 'y'], () => 1, (_v: any) => {}, true);
  t.pass();
});

test('Types: descriptors — addGetters with GetterDict', t => {
  const dict: GetterDict = {foo: () => 42};
  const r: object = addGetters({}, dict);
  const r2: object = addGetters({}, dict, true);
  t.pass();
});

test('Types: descriptors — copyDescriptors name forms', t => {
  const src = {a: 1, b: 2};
  const r1: object = copyDescriptors({}, src, 'a, b');
  const r2: object = copyDescriptors({}, src, ['a', 'b']);
  const r3: object = copyDescriptors({}, src, Symbol());
  const dict: AliasDict = {a: 'x, y'};
  const r4: object = copyDescriptors({}, src, dict);
  const r5: object = copyDescriptors({}, src, 'a', true);
  t.pass();
});
