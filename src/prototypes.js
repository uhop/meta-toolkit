'use strict';

export function* prototypes(object, skipSelf) {
  while (object && object !== Object.prototype) {
    if (skipSelf) {
      skipSelf = false;
    } else {
      yield object;
    }
    object = Object.getPrototypeOf(object);
  }
}

export const getPropertyDescriptor = (object, name) => {
  for (const proto of prototypes(object)) {
    const descriptor = Object.getOwnPropertyDescriptor(proto, name);
    if (descriptor) return descriptor;
  }
};
