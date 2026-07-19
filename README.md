# Meta toolkit [![NPM version][npm-img]][npm-url]

[npm-img]: https://img.shields.io/npm/v/meta-toolkit.svg
[npm-url]: https://npmjs.org/package/meta-toolkit

Meta toolkit is a no-dependency, no-nonsense collection of small utilities for meta programming
and OOP that my projects accumulated over the years: generating classes, objects, prototypes,
iterators, and more.

- Name mangling (`meta-toolkit/names.js`) provides a conversion from compound names
  such as `foo-bar` to `['foo', 'bar']` and from `['foo', 'bar']` to `fooBar` and vice versa.
  - Used to generate file names, method names, and so on.
  - The following naming schemas are supported out of box:
    - `camelCase` &mdash; `toCamelCase()`, `fromCamelCase()`.
    - `PascalCase` &mdash; `toPascalCase()`, `fromPascalCase()`.
    - `snake_case` &mdash; `toSnakeCase()`, `fromSnakeCase()`.
      - `SNAKE_CASE` &mdash; `toAllCapsSnakeCase()`.
    - `kebab-case` &mdash; `toKebabCase()`, `fromKebabCase()`.
    - whitespace-separated words &mdash; `toWords()`, `toTitleCase()`, `fromWords()`.
- Descriptor manipulation (`meta-toolkit/descriptors.js`) — generate accessors dynamically
  and share them between objects/prototypes:
  - Create descriptors &mdash; `makeGetter()`, `makeSetter()`, `makeAccessors()`.
  - Add descriptors &mdash; `addDescriptor()`, `addDescriptors()`, `addAccessor()`, `addAccessors()`,
    `addGetter()`, `addGetters()`, `addSetter()`, `addSetters()`.
  - Class-prototype sugar &mdash; `addProtoDescriptor()`, `addProtoDescriptors()`,
    `addProtoAccessor()`, `addProtoAccessors()`, `addProtoGetter()`, `addProtoGetters()`,
    `addProtoSetter()`, `addProtoSetters()`.
  - `defaultDescriptor` &mdash; the default descriptor template.
  - Copy descriptors &mdash; `copyDescriptors()`.
- Aliases (`meta-toolkit/aliases.js`) — alias existing properties:
  - Alias properties &mdash; `addAlias()`, `addAliases()`, `addProtoAlias()`, `addProtoAliases()`.
- Prototypes (`meta-toolkit/prototypes.js`) — inspect prototypes:
  - Iterate over prototypes &mdash; `prototypes()`.
  - `getPropertyDescriptor()` &mdash; similar to `getOwnPropertyDescriptor()`, but for all prototypes
    not just the current object.
- Iterators (`meta-toolkit/iterators.js`) — simplify working with iterators:
  - Augment an iterator with an iterable interface &mdash; `augmentIterator()`, `normalizeIterator()`
    (the gateway to the native iterator helpers when the runtime has them).
  - Lazy transformation helpers &mdash; `mapIterator()`, `filterIterator()`.
- Path (`meta-toolkit/path.js`) — work with nested objects using paths:
  - Get a value from a nested object by path &mdash; `get()`.
  - Check that a path exists &mdash; `has()`.
  - Set a value in a nested object by path &mdash; `set()`, `forceSet()`.
  - Remove a value from a nested object by path &mdash; `remove()`.
- Options (`meta-toolkit/options.js`) — organize options for constructors:
  - Copy options according to some defaults &mdash; `copyOptions()`.
- Comparators (`meta-toolkit/comparators.js`) — convert between different comparator function styles:
  - Create a compare function from a less function and vice versa &mdash; `compareFromLess()`,
    `lessFromCompare()`.
  - Create an equality function from a less or compare function &mdash; `equalFromLess()`,
    `equalFromCompare()`.
  - Reverse comparators &mdash; `reverseCompare()`, `reverseLess()`.

Full documentation is in the **[wiki](https://github.com/uhop/meta-toolkit/wiki)** &mdash; browse the [index](https://github.com/uhop/meta-toolkit/wiki/Home), or [search it](https://uhop.github.io/wiki-search/app/?wiki=uhop/meta-toolkit) by name.

## Examples

Generating names:

```js
import {
  toCamelCase,
  toPascalCase,
  toSnakeCase,
  toAllCapsSnakeCase,
  fromKebabCase
} from 'meta-toolkit/names.js';

const names = fromKebabCase('foo-bar-baz');

console.log(toCamelCase(names)); // fooBarBaz
console.log(toPascalCase(names)); // FooBarBaz
console.log(toSnakeCase(names)); // foo_bar_baz
console.log(toAllCapsSnakeCase(names)); // FOO_BAR_BAZ
```

Aliasing properties:

```js
import {addAliases} from 'meta-toolkit/aliases.js';

class Foo {
  constructor() {
    this.value = 0;
  }
  get double() {
    return this.value * 2;
  }
  line(a, b) {
    return a * this.value + b;
  }
}
addAliases(Foo.prototype, {
  double: 'x2, duplicate',
  line: 'linear'
});

const f = new Foo();
f.value = 2;

console.log(f.double); // 4
console.log(f.x2); // 4
console.log(f.linear(1, 2)); // 4
```

Object manipulation with paths:

```js
import {set, get, remove, forceSet} from 'meta-toolkit/path.js';

const object = {};

forceSet(object, 'a.b.c', 1); // object = {a: {b: {c: 1}}}

get(object, 'a.b.c'); // 1
get(object, 'a'); // {b: {c: 1}}

set(object, 'a.b.c', 2); // object = {a: {b: {c: 2}}}
forceSet(object, 'a.b.d', 3); // object = {a: {b: {c: 2, d: 3}}}

remove(object, 'a.b.c'); // object = {a: {b: {d: 3}}}
remove(object, 'a.b'); // object = {a: {}}
```

> **Note on path safety.** `get()`, `set()`, `forceSet()`, and `remove()` walk user-supplied keys without sanitizing magic property names (`__proto__`, `constructor`, `prototype`). If you pass externally-sourced paths (e.g., from HTTP requests) directly to these functions, validate them at your application boundary first — the library does not.

## License

BSD 3-Clause "New" or "Revised" License. See the LICENSE file for details.

## Release History

- 1.2.0 _Added `addProtoAlias`/`addProtoAliases`/`addProtoGetter`/`addProtoGetters`/`addGetter`. Updated dev dependencies._
- 1.1.9 _Updated dev dependencies._
- 1.1.8 _Added TS typing tests, CJS test. Fixed `.d.ts` typings for strict mode. Improved docs and workflows. Updated dev dependencies._
- 1.1.7 _Added JSDoc to all source files. Fixed `addGetters()` bug with symbol keys. Improved docs. Added AI-friendly project files._
- 1.1.6 _Updated dev dependencies._
- 1.1.5 _Updated dev dependencies._
- 1.1.4 _Updated dev dependencies._
- 1.1.3 _Technical release: added `types` to `package.json`._
- 1.1.2 _Added TS types._
- 1.1.1 _Updated deps._
- 1.1.0 _Added comparator utilities._
- 1.0.0 _Initial release._

The full release notes are in the wiki: [Release notes](https://github.com/uhop/meta-toolkit/wiki/Release-notes).
