// @ts-self-types="./comparators.d.ts"

'use strict';

export const compareFromLess = lessFn => (a, b) => lessFn(a, b) ? -1 : lessFn(b, a) ? 1 : 0;
export const lessFromCompare = compareFn => (a, b) => compareFn(a, b) < 0;

export const equalFromLess = lessFn => (a, b) => !(Boolean(lessFn(a, b)) ^ Boolean(lessFn(b, a)));

export const reverseLess = lessFn => (a, b) => lessFn(b, a);
export const reverseCompare = compareFn => (a, b) => compareFn(b, a);
