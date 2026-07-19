/**
 * The delimiter options interface.
 */
export interface DelimiterOptions {
  /** The delimiter used to split string paths. Defaults to `'.'`. */
  delimiter?: string | RegExp;
}

/**
 * The path options interface.
 */
export interface PathOptions extends DelimiterOptions {
  /** The default value returned when the path cannot be resolved. */
  defaultValue?: any;
}

/**
 * Gets a value from an object by path.
 *
 * @param object the object to get from.
 * @param path the path to get from the object. Can be a string (delimited by options.delimiter)
 *             or an array of strings and symbols.
 * @param options an object with options. Supported options are:
 *                - delimiter: the delimiter to use. Defaults to '.'.
 *                - defaultValue: the default value to return if the path does not exist.
 * @returns the value at the given path, or options.defaultValue if the path does not exist.
 */
export function get(object: object, path: string | (string | symbol)[], options?: PathOptions): any;

/**
 * Checks whether a path exists in an object.
 *
 * @param object the object to check.
 * @param path the path to check in the object. Can be a string (delimited by options.delimiter)
 *             or an array of strings and symbols.
 * @param options an object with options. Supported options are:
 *                - delimiter: the delimiter to use. Defaults to '.'.
 * @returns true if every segment of the path exists, false otherwise.
 * @remarks Unlike {@link get()}, it distinguishes a missing path from a path holding `undefined`.
 *   An empty path refers to the object itself and returns true.
 */
export function has(
  object: object,
  path: string | (string | symbol)[],
  options?: DelimiterOptions
): boolean;

/**
 * Sets a value in an object by path.
 *
 * @param object the object to set a value in.
 * @param path the path to set in the object. Can be a string (delimited by options.delimiter)
 *             or an array of strings and symbols.
 * @param value the value to set.
 * @param options an object with options. Supported options are:
 *                - delimiter: the delimiter to use. Defaults to '.'.
 *                - defaultValue: the default value to return if the path does not exist.
 * @returns the previous value at the path, or options.defaultValue if the path did not exist.
 * @remarks Intermediate path segments must already exist; only the final segment is created.
 *   Use {@link forceSet()} to create intermediate objects as needed.
 */
export function set(
  object: object,
  path: string | (string | symbol)[],
  value: any,
  options?: PathOptions
): any;

/**
 * Sets a value in an object by path, creating the path if it does not exist.
 *
 * @param object the object to set a value in.
 * @param path the path to set in the object. Can be a string (delimited by options.delimiter)
 *             or an array of strings and symbols.
 * @param value the value to set.
 * @param options an object with options. Supported options are:
 *                - delimiter: the delimiter to use. Defaults to '.'.
 * @returns the previous value at the path.
 * @remarks The path is created if it does not exist by creating empty objects `{}` as needed.
 */
export function forceSet(
  object: object,
  path: string | (string | symbol)[],
  value: any,
  options?: DelimiterOptions
): any;

/**
 * Removes a value from an object by path.
 *
 * @param object the object to remove a value from.
 * @param path the path to remove from the object. Can be a string (delimited by options.delimiter)
 *             or an array of strings and symbols.
 * @param options an object with options. Supported options are:
 *                - delimiter: the delimiter to use. Defaults to '.'.
 *                - defaultValue: the default value to return if the path does not exist.
 * @returns the value that was removed, or options.defaultValue if the path did not exist.
 * @remarks The path is removed if it exists by deleting the final property from its parent.
 */
export function remove(
  object: object,
  path: string | (string | symbol)[],
  options?: PathOptions
): any;
