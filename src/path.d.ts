/**
 * The path options interface.
 */
interface PathOptions {
  /** The delimiter to use. */
  delimiter?: string | RegExp;
  /** The default value. */
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
export function get(
  object: object,
  path: string | (string | symbol)[],
  options?: PathOptions = {delimiter = '.'}
): any;

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
 * @returns the value that was set, or the value at the given path if the path already existed.
 */
export function set(
  object: object,
  path: string | (string | symbol)[],
  value: any,
  options?: PathOptions = {delimiter = '.'}
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
 * @returns the value that was set.
 * @remarks The path is created if it does not exist by creating empty objects `{}` as needed.
 */
export function forceSet(
  object: object,
  path: string | (string | symbol)[],
  value: any,
  options?: PathOptions = {delimiter = '.'}
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
  options?: PathOptions = {delimiter = '.'}
): any;
