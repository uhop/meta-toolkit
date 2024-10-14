'use strict';

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

{
  capitalize('foo') === 'Foo';
  capitalize('FOO') === 'Foo';
  capitalize('') === '';
  capitalize('fOo') === 'Foo';
}

{
  fromCamelCase('fooBarBaz'), ['foo', 'Bar', 'Baz'];
  fromCamelCase('foo'), ['foo'];
  fromCamelCase(''), [''];

  toCamelCase(['foo', 'Bar', 'Baz']) === 'fooBarBaz';
  toCamelCase(['foo', 'bAr', 'bAZ']) === 'fooBarBaz';
  toCamelCase(['foo']) === 'foo';
  toCamelCase(['']) === '';
}

{
  fromPascalCase('FooBarBaz'), ['Foo', 'Bar', 'Baz'];
  fromPascalCase('Foo'), ['Foo'];
  fromPascalCase(''), [''];

  toPascalCase(['Foo', 'Bar', 'Baz']) === 'FooBarBaz';
  toPascalCase(['foo', 'bAr', 'bAZ']) === 'FooBarBaz';
  toPascalCase(['foo']) === 'Foo';
  toPascalCase(['']) === '';
}

{
  fromSnakeCase('foo_bar_baz'), ['foo', 'bar', 'baz'];
  fromSnakeCase('foo'), ['foo'];
  fromSnakeCase(''), [''];

  toSnakeCase(['foo', 'bar', 'baz']) === 'foo_bar_baz';
  toSnakeCase(['Foo', 'bAr', 'bAZ']) === 'foo_bar_baz';
  toSnakeCase(['foo']) === 'foo';
  toSnakeCase(['']) === '';

  toAllCapsSnakeCase(['foo', 'bar', 'baz']) === 'FOO_BAR_BAZ';
  toAllCapsSnakeCase(['Foo', 'bAr', 'bAZ']) === 'FOO_BAR_BAZ';
  toAllCapsSnakeCase(['foo']) === 'FOO';
  toAllCapsSnakeCase(['']) === '';
}

{
  fromKebabCase('foo-bar-baz'), ['foo', 'bar', 'baz'];
  fromKebabCase('foo'), ['foo'];
  fromKebabCase(''), [''];

  toKebabCase(['foo', 'bar', 'baz']) === 'foo-bar-baz';
  toKebabCase(['Foo', 'bAr', 'bAZ']) === 'foo-bar-baz';
  toKebabCase(['foo']) === 'foo';
  toKebabCase(['']) === '';
}
