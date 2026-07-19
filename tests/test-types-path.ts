import test from 'tape-six';

import {get, has, set, forceSet, remove} from '../src/path.js';

test('Types: path — get signatures', t => {
  const _r1: any = get({}, 'a.b');
  const _r2: any = get({}, ['a', 'b']);
  const _r3: any = get({}, [Symbol(), 'a']);
  const _r4: any = get({}, 'a', {delimiter: '/'});
  const _r5: any = get({}, 'a', {defaultValue: 0});
  const _r6: any = get({}, 'a', {delimiter: '.', defaultValue: null});
  t.pass();
});

test('Types: path — has signatures', t => {
  const _r1: boolean = has({}, 'a.b');
  const _r2: boolean = has({}, ['a', Symbol()]);
  const _r3: boolean = has({}, 'a/b', {delimiter: '/'});
  t.pass();
});

test('Types: path — set signatures', t => {
  const _r1: any = set({}, 'a', 1);
  const _r2: any = set({}, ['a'], 1);
  const _r3: any = set({}, 'a/b', 1, {delimiter: '/'});
  const _r4: any = set({}, 'a', 1, {defaultValue: null});
  t.pass();
});

test('Types: path — forceSet signatures', t => {
  const _r1: any = forceSet({}, 'a.b', 1);
  const _r2: any = forceSet({}, ['a', 'b'], 1);
  const _r3: any = forceSet({}, 'a/b', 1, {delimiter: '/'});
  t.pass();
});

test('Types: path — remove signatures', t => {
  const _r1: any = remove({}, 'a');
  const _r2: any = remove({}, ['a']);
  const _r3: any = remove({}, 'a', {delimiter: '/'});
  const _r4: any = remove({}, 'a', {defaultValue: null});
  t.pass();
});
