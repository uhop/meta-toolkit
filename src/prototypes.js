// @ts-self-types="./prototypes.d.ts"

/**
 * Returns an iterator over the prototypes of an object, stopping before Object.prototype.
 *
 * @param {object} object the object to get the prototypes from
 * @param {boolean} [skipSelf] if truthy, the current object will not be yielded
 * @returns {Generator<object>} an iterator over the prototypes of the object
 */
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

/**
 * Gets a property descriptor from an object including inherited ones.
 *
 * @param {object} object the object to get the descriptor from
 * @param {string|symbol} name the name of the property to get the descriptor for
 * @returns {PropertyDescriptor|undefined} the descriptor if it exists, undefined otherwise
 */
export const getPropertyDescriptor = (object, name) => {
  for (const proto of prototypes(object)) {
    const descriptor = Object.getOwnPropertyDescriptor(proto, name);
    if (descriptor) return descriptor;
  }
};
