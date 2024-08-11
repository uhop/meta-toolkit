'use strict';

export const defaultDescriptor = {configurable: true, enumerable: true};

export const makeGetter = (getter, defaultDescriptor = defaultDescriptor) => {
  const descriptor = {...defaultDescriptor};
  if (typeof getter == 'function') descriptor.get = getter;
  return descriptor;
};

export const makeSetter = (setter, defaultDescriptor = defaultDescriptor) => {
  const descriptor = {...defaultDescriptor};
  if (typeof setter == 'function') descriptor.set = setter;
  return descriptor;
};

export const makeAccessors = (getter, setter, defaultDescriptor = defaultDescriptor) => {
  const descriptor = {...defaultDescriptor};
  if (typeof getter == 'function') descriptor.get = getter;
  if (typeof setter == 'function') descriptor.set = setter;
  return descriptor;
};

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

export const addDescriptors = (target, dict, force) => {
  for (const [names, descriptor] of Object.entries(dict)) {
    addDescriptor(target, names, descriptor, force);
  }
  for (const symbol of Object.getOwnPropertySymbols(dict)) {
    const descriptor = Object.getOwnPropertyDescriptor(dict, symbol);
    if (!descriptor || !descriptor.enumerable) continue;
    addDescriptor(target, [symbol], dict[symbol], force);
  }
};

export const addAccessor = (target, names, getter, setter, force) => addDescriptor(target, names, makeAccessors(getter, setter), force);

export const addGetters = (target, dict, force) => {
  for (const [names, getter] of Object.entries(dict)) {
    addDescriptor(target, names, makeGetter(getter), force);
  }
  for (const symbol of Object.getOwnPropertySymbols(dict)) {
    const descriptor = Object.getOwnPropertyDescriptor(source, symbol);
    if (!descriptor || !descriptor.enumerable) continue;
    addDescriptor(target, [symbol], makeGetter(dict[symbol]), force);
  }
};

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
