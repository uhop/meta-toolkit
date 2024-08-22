'use strict';

import test from 'tape-six';

import {compareFromLess, lessFromCompare, equalFromLess, reverseLess, reverseCompare} from 'meta-toolkit/comparators.js';

test('Comparators: compareFromLess()', t => {
  t.ok(compareFromLess((a, b) => a < b)(1, 2) < 0);
  t.ok(compareFromLess((a, b) => a < b)(2, 1) > 0);
  t.ok(compareFromLess((a, b) => a < b)(2, 2) == 0);
});

test('Comparators: lessFromCompare()', t => {
  t.equal(lessFromCompare((a, b) => a - b)(1, 2), true);
  t.equal(lessFromCompare((a, b) => a - b)(2, 1), false);
  t.equal(lessFromCompare((a, b) => a - b)(2, 2), false);
});

test('Comparators: equalFromLess()', t => {
  t.equal(equalFromLess((a, b) => a < b)(1, 2), false);
  t.equal(equalFromLess((a, b) => a < b)(2, 1), false);
  t.equal(equalFromLess((a, b) => a < b)(2, 2), true);
});

test('Comparators: reverseLess()', t => {
  t.equal(reverseLess((a, b) => a < b)(1, 2), false);
  t.equal(reverseLess((a, b) => a < b)(2, 1), true);
  t.equal(reverseLess((a, b) => a < b)(2, 2), false);

  t.equal(((a, b) => !(a < b))(1, 2), false);
  t.equal(((a, b) => !(a < b))(2, 1), true);
  t.equal(((a, b) => !(a < b))(2, 2), true);
});

test('Comparators: reverseCompare()', t => {
  t.ok(reverseCompare((a, b) => a - b)(1, 2) > 0);
  t.ok(reverseCompare((a, b) => a - b)(2, 1) < 0);
  t.ok(reverseCompare((a, b) => a - b)(2, 2) == 0);

  t.ok(-((a, b) => a - b)(1, 2) > 0);
  t.ok(-((a, b) => a - b)(2, 1) < 0);
  t.ok(-((a, b) => a - b)(2, 2) == 0);
});
