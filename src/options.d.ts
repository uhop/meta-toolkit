/**
 * Merges defaults with custom sources and returns the result.
 *
 * @param target the target object. If it is undefined or `null`, a new object will be created.
 * @param defaults the default options. They will be copied to the target first skipping undefined values.
 * @param sources an array of objects to merge with `target` in the defined order. Only keys defined in `defaults` will be copied.
 * @returns the target object.
 * @remarks Only string keys are copied.
 */
export function copyOptions(target: object, defaults: object, ...sources: object[]): object;
