// @ts-self-types="./descriptors.d.ts"

export const defaultDescriptor = {configurable: true, enumerable: false};

export const makeGetter = (getter, initDescriptor = defaultDescriptor) =>
  typeof getter == 'function' ? {...initDescriptor, get: getter} : {...initDescriptor};

export const makeSetter = (setter, initDescriptor = defaultDescriptor) =>
  typeof setter == 'function' ? {...initDescriptor, set: setter} : {...initDescriptor};

export const makeAccessors = (getter, setter, initDescriptor = defaultDescriptor) => ({
  ...initDescriptor,
  ...(typeof getter == 'function' && {get: getter}),
  ...(typeof setter == 'function' && {set: setter})
});

export const addDescriptor = (target, names, descriptor, force) => {
  if (!descriptor) return target;
  if (typeof names == 'string') names = names.split(',').map(s => s.trim());
  if (!Array.isArray(names)) names = [names];
  for (const name of names) {
    if (!force && Object.hasOwn(target, name)) continue;
    Object.defineProperty(target, name, descriptor);
  }
  return target;
};

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

export const addAccessor = (target, names, getter, setter, force) =>
  addDescriptor(target, names, makeAccessors(getter, setter), force);

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

export const copyDescriptors = (target, source, names, force) => {
  switch (typeof names) {
    case 'string':
      names = names.split(',').map(s => s.trim());
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
