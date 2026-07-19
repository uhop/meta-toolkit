import test from 'tape-six';

import {augmentIterator, normalizeIterator, mapIterator, filterIterator} from '../src/iterators.js';

test('Types: iterators — augmentIterator generic', t => {
  const it: Iterator<number> = {next: () => ({value: 1, done: false})};
  const r: IterableIterator<number> = augmentIterator(it);
  t.pass();
});

test('Types: iterators — normalizeIterator generic', t => {
  const it: Iterator<string> = {next: () => ({value: 'a', done: false})};
  const r: IterableIterator<string> = normalizeIterator(it);
  t.pass();
});

test('Types: iterators — mapIterator types', t => {
  const src: Iterable<number> = [1, 2, 3];
  const r: IterableIterator<string> = mapIterator(src, (v: number) => String(v));
  t.pass();
});

test('Types: iterators — filterIterator types', t => {
  const src: Iterable<number> = [1, 2, 3];
  const r: IterableIterator<number> = filterIterator(src, (v: number) => v > 1);
  t.pass();
});

test('Types: iterators — bare iterator inputs', t => {
  const it: Iterator<number> = {next: () => ({value: 1, done: false})};
  const m: IterableIterator<string> = mapIterator(it, (v: number) => String(v));
  const f: IterableIterator<number> = filterIterator(it, (v: number) => v > 0);
  t.pass();
});

test('Types: iterators — callback receives index', t => {
  const _m: Iterable<string> = mapIterator([1], (v: number, i: number) => `${v}:${i}`);
  const _f: Iterable<number> = filterIterator([1], (_v: number, i: number) => i === 0);
  t.pass();
});
