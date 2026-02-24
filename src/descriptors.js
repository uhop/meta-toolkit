// @ts-self-types="./descriptors.d.ts"

/** Default descriptor for getters and setters: `{configurable: true, enumerable: false}`. */
// @type {PropertyDescriptor}
export const defaultDescriptor = {configurable: true, enumerable: false};

/**
 * Creates a getter descriptor.
 *
 * @param {function(): any} getter a function with no arguments that returns a value
 * @param {PropertyDescriptor} [initDescriptor=defaultDescriptor] base descriptor for default values
 * @returns {PropertyDescriptor} a descriptor with the provided getter
 */
export const makeGetter = (getter, initDescriptor = defaultDescriptor) => {
  const descriptor = {...initDescriptor};
  if (typeof getter == 'function') descriptor.get = getter;
  return descriptor;
};

/**
 * Creates a setter descriptor.
 *
 * @param {function(any): void} setter a function with one argument that sets a value
 * @param {PropertyDescriptor} [initDescriptor=defaultDescriptor] base descriptor for default values
 * @returns {PropertyDescriptor} a descriptor with the provided setter
 */
export const makeSetter = (setter, initDescriptor = defaultDescriptor) => {
  const descriptor = {...initDescriptor};
  if (typeof setter == 'function') descriptor.set = setter;
  return descriptor;
};

/**
 * Creates a getter and setter descriptor.
 *
 * @param {function(): any} getter a function with no arguments that returns a value
 * @param {function(any): void} setter a function with one argument that sets a value
 * @param {PropertyDescriptor} [initDescriptor=defaultDescriptor] base descriptor for default values
 * @returns {PropertyDescriptor} a descriptor with the provided getter and setter
 */
export const makeAccessors = (getter, setter, initDescriptor = defaultDescriptor) => {
  const descriptor = {...initDescriptor};
  if (typeof getter == 'function') descriptor.get = getter;
  if (typeof setter == 'function') descriptor.set = setter;
  return descriptor;
};

/**
 * Adds a descriptor to an object under one or more names.
 *
 * @param {object} target the object to add the descriptor to
 * @param {string|symbol|(string|symbol)[]} names a comma-separated string, symbol, or array of names
 * @param {PropertyDescriptor} descriptor the descriptor object
 * @param {boolean} [force] if truthy, overwrite existing properties
 * @returns {object} the target object
 */
export const addDescriptor = (target, names, descriptor, force) => {
  if (!descriptor) return target;
  if (typeof names == 'string') names = names.trim().split(/\s*,\s*/);
  if (!Array.isArray(names)) names = [names];
  for (const name of names) {
    if (!force && target.hasOwnProperty(name)) continue;
    Object.defineProperty(target, name, descriptor);
  }
  return target;
};

/**
 * Adds descriptors to an object defined by a dictionary.
 *
 * @param {object} target the object to add descriptors to
 * @param {Object<string|symbol, PropertyDescriptor>} dict keys are names (comma-separated string or symbol), values are descriptors
 * @param {boolean} [force] if truthy, overwrite existing properties
 * @returns {object} the target object
 */
export const addDescriptors = (target, dict, force) => {
  for (const [names, descriptor] of Object.entries(dict)) {
    addDescriptor(target, names, descriptor, force);
  }
  for (const symbol of Object.getOwnPropertySymbols(dict)) {
    const descriptor = Object.getOwnPropertyDescriptor(dict, symbol);
    if (!descriptor || !descriptor.enumerable) continue;
    addDescriptor(target, [symbol], dict[symbol], force);
  }
  return target;
};

/**
 * Adds an accessor (getter and setter) to an object.
 *
 * @param {object} target the object to add the accessor to
 * @param {string|symbol|(string|symbol)[]} names a comma-separated string, symbol, or array of names
 * @param {function(): any} getter a function with no arguments that returns a value
 * @param {function(any): void} setter a function with one argument that sets a value
 * @param {boolean} [force] if truthy, overwrite existing properties
 * @returns {object} the target object
 */
export const addAccessor = (target, names, getter, setter, force) =>
  addDescriptor(target, names, makeAccessors(getter, setter), force);

/**
 * Adds getters to an object defined by a dictionary.
 *
 * @param {object} target the object to add getters to
 * @param {Object<string|symbol, function(): any>} dict keys are names (comma-separated string or symbol), values are getter functions
 * @param {boolean} [force] if truthy, overwrite existing properties
 * @returns {object} the target object
 */
export const addGetters = (target, dict, force) => {
  for (const [names, getter] of Object.entries(dict)) {
    addDescriptor(target, names, makeGetter(getter), force);
  }
  for (const symbol of Object.getOwnPropertySymbols(dict)) {
    const descriptor = Object.getOwnPropertyDescriptor(dict, symbol);
    if (!descriptor || !descriptor.enumerable) continue;
    addDescriptor(target, [symbol], makeGetter(dict[symbol]), force);
  }
  return target;
};

/**
 * Copies descriptors from one object to another (it can be the same object).
 *
 * @param {object} target the object to copy descriptors to
 * @param {object} source the object to copy descriptors from
 * @param {string|symbol|(string|symbol)[]|Object} names names to copy, or an alias dict mapping source names to target names
 * @param {boolean} [force] if truthy, overwrite existing properties
 * @returns {object} the target object
 */
export const copyDescriptors = (target, source, names, force) => {
  switch (typeof names) {
    case 'string':
      names = names.trim().split(/\s*,\s*/);
      break;
    case 'symbol':
      names = [names];
      break;
  }
  if (Array.isArray(names)) {
    for (const name of names) {
      addDescriptor(target, [name], Object.getOwnPropertyDescriptor(source, name), force);
    }
  } else {
    for (const [name, aliases] of Object.entries(names)) {
      addDescriptor(target, aliases, Object.getOwnPropertyDescriptor(source, name), force);
    }
    for (const symbol of Object.getOwnPropertySymbols(names)) {
      const descriptor = Object.getOwnPropertyDescriptor(names, symbol);
      if (!descriptor || !descriptor.enumerable) continue;
      addDescriptor(target, names[symbol], Object.getOwnPropertyDescriptor(source, symbol), force);
    }
  }
  return target;
};
