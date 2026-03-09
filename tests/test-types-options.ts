import test from 'tape-six';

import {copyOptions} from '../src/options.js';

test('Types: options — copyOptions signatures', t => {
  const r1: object = copyOptions({}, {foo: 1});
  const r2: object = copyOptions({}, {foo: 1}, {foo: 2});
  const r3: object = copyOptions({}, {foo: 1}, {foo: 2}, {foo: 3});
  t.pass();
});
