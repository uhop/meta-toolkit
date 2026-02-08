# Meta toolkit [![NPM version][npm-img]][npm-url]

[npm-img]: https://img.shields.io/npm/v/meta-toolkit.svg
[npm-url]: https://npmjs.org/package/meta-toolkit

Meta toolkit is a toolkit to help with meta programming and OOP. It is a no-dependency,
no-nonsense collection of small bits my projects accumulated over the years. They deal with
helping to generate classes, objects, prototypes, iterators, and more.

* Name mangling (`meta-toolkit/names.js`) provides a conversion from compound names
  such as `foo-bar` to `['foo', 'bar']` and from `['foo', 'bar']` to `fooBar` and vice versa.
  * Used to generated file names, method names, and so on.
  * The following naming schemas are supported out of box:
    * `camelCase` &mdash; `toCamelCase()`, `fromCamelCase()`.
    * `PascalCase` &mdash; `toPascalCase()`, `fromPascalCase()`.
    * `snake_case` &mdash; `toSnakeCase()`, `fromSnakeCase()`.
      * `SNAKE_CASE` &mdash; `toAllCapsSnakeCase()`.
    * `kebab-case` &mdash; `toKebabCase()`, `fromKebabCase()`.
* Descriptor manipulation (`meta-toolkit/descriptors.js`) provides a set of helpers used to generate
  various accessors dynamically and share them between different objects/prototypes:
  * Create descriptors &mdash; `makeGetter()`, `makeSetter()`, `makeAccessors()`.
  * Add descriptors &mdash; `addDescriptor()`, `addDescriptors()`, `addAccessor()`, `addGetters()`.
  * Copy descriptors &mdash; `copyDescriptors()`.
* Aliases (`meta-toolkit/aliases.js`) provides a set of helpers to alias existing properties:
  * Alias properties &mdash; `addAlias()`, `addAliases()`.
* Prototypes (`meta-toolkit/prototypes.js`) provides a set of helpers to inspect prototypes:
  * Iterate over prototypes &mdash; `prototypes()`.
  * `getPropertyDescriptor()` &mdash; similar to `getOwnPropertyDescriptor()`, but for all prototypes
    not just the current object.
* Iterators (`meta-toolkit/iterators.js`) provides a set of helpers simplify creating custom iterators:
  * Augment iterable with an iterator interface &mdash; `augmentIterator()`, `normalizeIterator()`.
  * Add array-like methods if not present &mdash; `mapIterator()`, `filterIterator()`.
* Path (`meta-toolkit/path.js`) provides a set of helpers to work with embedded objects in a simple way:
  * Get value from a nested object by path &mdash; `get()`.
  * Set value in a nested object by path &mdash; `set()`.
* Options (`meta-toolkit/options.js`) provides a set of helpers to organize options for constructors:
  * Copy options according to some defaults &mdash; `copyOptions()`.
* Comparators (`meta-toolkit/comparators.js`) provides a set of helpers to convert between different
  types of comparator functions:
  * Create a compare function from a less function and vice versa &mdash; `compareFromLess()`,
    `lessFromCompare()`.
  * Create an equality function from a less function &mdash; `equalFromLess()`.
  * Reverse comparators &mdash; `reverseCompare()`, `reverseLess()`.

See the full documentation in the [wiki](https://github.com/uhop/meta-toolkit/wiki).

## Examples

Generating names:

```js
import {toCamelCase, toPascalCase, toSnakeCase,
  toAllCapsSnakeCase, fromKebabCase} from 'meta-toolkit/names.js';

const names = fromKebabCase('foo-bar-baz');

console.log(toCamelCase(names));        // fooBarBaz
console.log(toPascalCase(names));       // FooBarBaz
console.log(toSnakeCase(names));        // foo_bar_baz
console.log(toAllCapsSnakeCase(names)); // FOO_BAR_BAZ
```

Aliasing properties:

```js
import {addAliases} from 'meta-toolkit/aliases.js';

class Foo {
  constructor() { this.value = 0; }
  get double() { return this.value * 2; }
  line(a, b) { return a * this.value + b; }
}
addAliases(Foo.prototype, {
  double: 'x2, duplicate',
  line: 'linear'
});

const f = new Foo(2);

console.log(f.double);       // 4
console.log(f.x2);           // 4
console.log(f.linear(1, 2)); // 4
```

Object manipulation with paths:

```js
import {set, get, remove, forceSet} from 'meta-toolkit/path.js';

const object = {};

forceSet(object, 'a.b.c', 1); // object = {a: {b: {c: 1}}}

get(object, 'a.b.c');         // 1
get(object, 'a');             // {b: {c: 1}}

set(object, 'a.b.c', 2);      // object = {a: {b: {c: 2}}}
set(object, 'a.b.d', 3);      // object = {a: {b: {c: 2, d: 3}}}

remove(object, 'a.b.c');      // object = {a: {b: {d: 3}}}
remove(object, 'a.b');        // object = {a: {}}
```

## License

BSD 3-Clause "New" or "Revised" License. See the LICENSE file for details.

## Release History

* 1.1.6 *Updated dev dependencies.*
* 1.1.5 *Updated dev dependencies.*
* 1.1.4 *Updated dev dependencies.*
* 1.1.3 *Technical release: added `types` to `package.json`.*
* 1.1.2 *Added TS types.*
* 1.1.1 *Updated deps.*
* 1.1.0 *Added comparator utilities.*
* 1.0.0 *Initial release.*
