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

test('Types: names — from* return string[]', t => {
  const a: string[] = fromCamelCase('fooBar');
  const b: string[] = fromPascalCase('FooBar');
  const c: string[] = fromSnakeCase('foo_bar');
  const d: string[] = fromKebabCase('foo-bar');
  t.pass();
});

test('Types: names — to* accept string[] and return string', t => {
  const parts: string[] = ['foo', 'bar'];
  const a: string = toCamelCase(parts);
  const b: string = toPascalCase(parts);
  const c: string = toSnakeCase(parts);
  const d: string = toAllCapsSnakeCase(parts);
  const e: string = toKebabCase(parts);
  t.pass();
});

test('Types: names — capitalize accepts and returns string', t => {
  const a: string = capitalize('foo');
  t.pass();
});
