/**
 * Returns an iterator over the prototypes of an object.
 *
 * @param object the object to get the prototypes from.
 * @param skipSelf if truthy, the current object will not be yielded.
 * @returns an iterator over the prototypes of the object.
 */
export function prototypes(object: object, skipSelf?: boolean): Generator<object, void, unknown>;

/**
 * Gets a property descriptor from an object including inherited ones.
 *
 * @param object the object to get the descriptor from.
 * @param name the name of the property to get the descriptor for.
 * @returns the descriptor if it exists, undefined otherwise.
 */
export function getPropertyDescriptor(
  object: object,
  name: string | symbol
): PropertyDescriptor | undefined;
