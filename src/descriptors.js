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

const addFromDict = (target, dict, make, force) => {
  for (const [names, value] of Object.entries(dict)) {
    addDescriptor(target, names, make(value), force);
  }
  for (const symbol of Object.getOwnPropertySymbols(dict)) {
    const descriptor = Object.getOwnPropertyDescriptor(dict, symbol);
    if (!descriptor || !descriptor.enumerable) continue;
    addDescriptor(target, [symbol], make(dict[symbol]), force);
  }
  return target;
};

export const addDescriptors = (target, dict, force) => addFromDict(target, dict, d => d, force);

export const addAccessor = (target, names, getter, setter, force) =>
  addDescriptor(target, names, makeAccessors(getter, setter), force);

export const addAccessors = (target, dict, force) =>
  addFromDict(target, dict, pair => makeAccessors(pair.get, pair.set), force);

export const addGetter = (target, names, getter, force) =>
  addDescriptor(target, names, makeGetter(getter), force);

export const addGetters = (target, dict, force) => addFromDict(target, dict, makeGetter, force);

export const addSetter = (target, names, setter, force) =>
  addDescriptor(target, names, makeSetter(setter), force);

export const addSetters = (target, dict, force) => addFromDict(target, dict, makeSetter, force);

export const addProtoDescriptor = (Class, names, descriptor, force) =>
  addDescriptor(Class.prototype, names, descriptor, force);

export const addProtoDescriptors = (Class, dict, force) =>
  addDescriptors(Class.prototype, dict, force);

export const addProtoAccessor = (Class, names, getter, setter, force) =>
  addAccessor(Class.prototype, names, getter, setter, force);

export const addProtoAccessors = (Class, dict, force) => addAccessors(Class.prototype, dict, force);

export const addProtoGetter = (Class, names, getter, force) =>
  addGetter(Class.prototype, names, getter, force);

export const addProtoGetters = (Class, dict, force) => addGetters(Class.prototype, dict, force);

export const addProtoSetter = (Class, names, setter, force) =>
  addSetter(Class.prototype, names, setter, force);

export const addProtoSetters = (Class, dict, force) => addSetters(Class.prototype, dict, force);

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
