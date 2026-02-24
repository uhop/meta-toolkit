// @ts-self-types="./options.d.ts"

/**
 * Merges defaults with custom sources. Only keys present in defaults are copied from sources.
 *
 * @param {object} target the target object; if null/undefined a new object is created
 * @param {object} defaults the default options — copied to target first, skipping undefined values
 * @param {...object} sources objects to merge into target; only keys defined in defaults are copied
 * @returns {object} the target object
 */
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
