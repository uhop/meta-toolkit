import test from 'tape-six';

import {prototypes, getPropertyDescriptor} from '../src/prototypes.js';

test('Types: prototypes — generator return type', t => {
  const gen: Generator<object, void, unknown> = prototypes({});
  const gen2: Generator<object, void, unknown> = prototypes({}, true);
  t.pass();
});

test('Types: prototypes — getPropertyDescriptor return type', t => {
  const d: PropertyDescriptor | undefined = getPropertyDescriptor({}, 'foo');
  const d2: PropertyDescriptor | undefined = getPropertyDescriptor({}, Symbol());
  t.pass();
});
