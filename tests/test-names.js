'use strict';

import test from 'tape-six';

import {
  capitalize,
  toCamelCase,
  fromCamelCase,
  toPascalCase,
  fromPascalCase,
  toAllCapsSnakeCase,
  toSnakeCase,
  fromSnakeCase,
  toKebabCase,
  fromKebabCase
} from '../src/names.js';

test('Names: capitalize', t => {
  t.equal(capitalize('foo'), 'Foo');
  t.equal(capitalize('FOO'), 'Foo');
  t.equal(capitalize(''), '');
  t.equal(capitalize('fOo'), 'Foo');
});

test('Names: camel case', t => {
  t.deepEqual(fromCamelCase('fooBarBaz'), ['foo', 'Bar', 'Baz']);
  t.deepEqual(fromCamelCase('foo'), ['foo']);
  t.deepEqual(fromCamelCase(''), ['']);

  t.deepEqual(toCamelCase(['foo', 'Bar', 'Baz']), 'fooBarBaz');
  t.deepEqual(toCamelCase(['foo', 'bAr', 'bAZ']), 'fooBarBaz');
  t.deepEqual(toCamelCase(['foo']), 'foo');
  t.deepEqual(toCamelCase(['']), '');
});

test('Names: pascal case', t => {
  t.deepEqual(fromPascalCase('FooBarBaz'), ['Foo', 'Bar', 'Baz']);
  t.deepEqual(fromPascalCase('Foo'), ['Foo']);
  t.deepEqual(fromPascalCase(''), ['']);

  t.deepEqual(toPascalCase(['Foo', 'Bar', 'Baz']), 'FooBarBaz');
  t.deepEqual(toPascalCase(['foo', 'bAr', 'bAZ']), 'FooBarBaz');
  t.deepEqual(toPascalCase(['foo']), 'Foo');
  t.deepEqual(toPascalCase(['']), '');
});

test('Names: snake case', t => {
  t.deepEqual(fromSnakeCase('foo_bar_baz'), ['foo', 'bar', 'baz']);
  t.deepEqual(fromSnakeCase('foo'), ['foo']);
  t.deepEqual(fromSnakeCase(''), ['']);

  t.deepEqual(toSnakeCase(['foo', 'bar', 'baz']), 'foo_bar_baz');
  t.deepEqual(toSnakeCase(['Foo', 'bAr', 'bAZ']), 'foo_bar_baz');
  t.deepEqual(toSnakeCase(['foo']), 'foo');
  t.deepEqual(toSnakeCase(['']), '');

  t.deepEqual(toAllCapsSnakeCase(['foo', 'bar', 'baz']), 'FOO_BAR_BAZ');
  t.deepEqual(toAllCapsSnakeCase(['Foo', 'bAr', 'bAZ']), 'FOO_BAR_BAZ');
  t.deepEqual(toAllCapsSnakeCase(['foo']), 'FOO');
  t.deepEqual(toAllCapsSnakeCase(['']), '');
});

test('Names: kebab case', t => {
  t.deepEqual(fromKebabCase('foo-bar-baz'), ['foo', 'bar', 'baz']);
  t.deepEqual(fromKebabCase('foo'), ['foo']);
  t.deepEqual(fromKebabCase(''), ['']);

  t.deepEqual(toKebabCase(['foo', 'bar', 'baz']), 'foo-bar-baz');
  t.deepEqual(toKebabCase(['Foo', 'bAr', 'bAZ']), 'foo-bar-baz');
  t.deepEqual(toKebabCase(['foo']), 'foo');
  t.deepEqual(toKebabCase(['']), '');
});
