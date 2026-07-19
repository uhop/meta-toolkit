import test from 'tape-six';

import {
  compareFromLess,
  lessFromCompare,
  equalFromLess,
  equalFromCompare,
  reverseLess,
  reverseCompare
} from '../src/comparators.js';

test('Types: comparators — compareFromLess', t => {
  const fn: (a: any, b: any) => number = compareFromLess((a, b) => a < b);
  t.pass();
});

test('Types: comparators — lessFromCompare', t => {
  const fn: (a: any, b: any) => boolean = lessFromCompare((a, b) => a - b);
  t.pass();
});

test('Types: comparators — equalFromLess', t => {
  const fn: (a: any, b: any) => boolean = equalFromLess((a, b) => a < b);
  t.pass();
});

test('Types: comparators — equalFromCompare', t => {
  const fn: (a: any, b: any) => boolean = equalFromCompare((a, b) => a - b);
  t.pass();
});

test('Types: comparators — generics propagate', t => {
  const cmp: (a: number, b: number) => number = compareFromLess((a: number, b: number) => a < b);
  const less: (a: string, b: string) => boolean = lessFromCompare((a: string, b: string) =>
    a.localeCompare(b)
  );
  const eq: (a: number, b: number) => boolean = equalFromCompare((a: number, b: number) => a - b);
  t.pass();
});

test('Types: comparators — reverseLess', t => {
  const fn: (a: any, b: any) => boolean = reverseLess((a, b) => a < b);
  t.pass();
});

test('Types: comparators — reverseCompare', t => {
  const fn: (a: any, b: any) => number = reverseCompare((a, b) => a - b);
  t.pass();
});
