/**
 * Returns an iterator over the prototypes of an object.
 *
 * @param object the object to get the prototypes from.
 * @param skipSelf if truthy, the current object will not be yielded.
 * @returns an iterator over the prototypes of the object.
 * @remarks The walk stops before `Object.prototype` — neither it nor `null` is ever yielded.
 */
export function prototypes(object: object, skipSelf?: boolean): Generator<object, void, unknown>;

/**
 * Gets a property descriptor from an object including inherited ones.
 *
 * @param object the object to get the descriptor from.
 * @param name the name of the property to get the descriptor for.
 * @returns the descriptor if it exists, undefined otherwise.
 * @remarks Built on {@link prototypes()}, which excludes `Object.prototype` from the walk —
 *   properties defined there (`toString`, `hasOwnProperty`, …) are not found.
 */
export function getPropertyDescriptor(
  object: object,
  name: string | symbol
): PropertyDescriptor | undefined;
