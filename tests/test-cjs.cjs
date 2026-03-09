const {test} = require('tape-six');

const {capitalize, fromCamelCase, toCamelCase, toKebabCase} = require('../src/names.js');
const {addAlias} = require('../src/aliases.js');
const {get, set, forceSet, remove} = require('../src/path.js');
const {compareFromLess} = require('../src/comparators.js');

test('CJS: names', t => {
  t.deepEqual(fromCamelCase('fooBar'), ['foo', 'Bar'], 'fromCamelCase splits');
  t.equal(toCamelCase(['foo', 'bar']), 'fooBar', 'toCamelCase joins');
  t.equal(toKebabCase(['foo', 'bar']), 'foo-bar', 'toKebabCase joins');
  t.equal(capitalize('foo'), 'Foo', 'capitalize');
});

test('CJS: aliases', t => {
  const obj = {foo: 1};
  Object.defineProperty(obj, 'foo', {value: 1, configurable: true, enumerable: true});
  addAlias(obj, 'foo', 'bar');
  t.equal(obj.bar, 1, 'addAlias creates alias');
});

test('CJS: path', t => {
  const obj = {};
  forceSet(obj, 'a.b', 1);
  t.equal(get(obj, 'a.b'), 1, 'forceSet + get');
  set(obj, 'a.b', 2);
  t.equal(get(obj, 'a.b'), 2, 'set updates');
  remove(obj, 'a.b');
  t.deepEqual(obj, {a: {}}, 'remove deletes');
});

test('CJS: comparators', t => {
  const compare = compareFromLess((a, b) => a < b);
  t.equal(compare(1, 2), -1, 'less');
  t.equal(compare(2, 1), 1, 'greater');
  t.equal(compare(1, 1), 0, 'equal');
});
