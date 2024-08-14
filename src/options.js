'use strict';

export const copyOptions = (target, defaults, ...sources) => {
  target = target || {};
  const keys = Object.keys(defaults);
  for (const key of keys) {
    if (defaults[key] === undefined) continue;
    target[key] = defaults[key];
  }
  for (const source of sources) {
    if (!source || typeof source !== 'object') continue;
    for (const key of keys) {
      if (key in source) target[key] = source[key];
    }
  }
  return target;
};
