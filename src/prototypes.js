'use strict';

const defaultPrototype = Object.prototype;

export function* prototypes(object) {
  while (object && object !== defaultPrototype) {
    yield object;
    object = Object.getPrototypeOf(object);
  }
}

export const getPropertyDescriptor = (object, name) => {
  for (const proto of prototypes(object)) {
    const descriptor = Object.getOwnPropertyDescriptor(proto, name);
    if (descriptor) return descriptor;
  }
};
