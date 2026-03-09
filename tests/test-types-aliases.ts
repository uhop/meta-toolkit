import test from 'tape-six';

import {addAlias, addAliases} from '../src/aliases.js';
import type {AliasDict} from '../src/descriptors.js';

test('Types: aliases — addAlias name forms', t => {
  const obj = {foo: 1};
  const r1: object = addAlias(obj, 'foo', 'bar');
  const r2: object = addAlias(obj, 'foo', 'a, b');
  const r3: object = addAlias(obj, Symbol(), ['x', Symbol()]);
  const r4: object = addAlias(obj, 'foo', 'bar', true);
  t.pass();
});

test('Types: aliases — addAliases with AliasDict', t => {
  const obj = {foo: 1, bar: 2};
  const dict: AliasDict = {foo: 'f', bar: ['b1', 'b2']};
  const r1: object = addAliases(obj, dict);
  const r2: object = addAliases(obj, dict, true);
  t.pass();
});
