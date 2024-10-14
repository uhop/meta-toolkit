'use strict';

import {
  compareFromLess,
  lessFromCompare,
  equalFromLess,
  reverseLess,
  reverseCompare
} from '../src/comparators.js';

{
  compareFromLess((a, b) => a < b)(1, 2) < 0;
  compareFromLess((a, b) => a < b)(2, 1) > 0;
  compareFromLess((a, b) => a < b)(2, 2) == 0;
}

{
  lessFromCompare((a, b) => a - b)(1, 2);
  lessFromCompare((a, b) => a - b)(2, 1);
  lessFromCompare((a, b) => a - b)(2, 2);
}

{
  equalFromLess((a, b) => a < b)(1, 2);
  equalFromLess((a, b) => a < b)(2, 1);
  equalFromLess((a, b) => a < b)(2, 2);
}

{
  reverseLess((a, b) => a < b)(1, 2);
  reverseLess((a, b) => a < b)(2, 1);
  reverseLess((a, b) => a < b)(2, 2);

  ((a, b) => !(a < b))(1, 2);
  ((a, b) => !(a < b))(2, 1);
  ((a, b) => !(a < b))(2, 2);
}

{
  reverseCompare((a, b) => a - b)(1, 2) > 0;
  reverseCompare((a, b) => a - b)(2, 1) < 0;
  reverseCompare((a, b) => a - b)(2, 2) == 0;

  -((a, b) => a - b)(1, 2) > 0;
  -((a, b) => a - b)(2, 1) < 0;
  -((a, b) => a - b)(2, 2) == 0;
}
