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

See the full documentation in the [wiki](https://github.com/uhop/meta-toolkit/wiki).

## License

BSD 3-Clause "New" or "Revised" License. See the LICENSE file for details.

## Release History

* 1.0.1 *Initial release.*
