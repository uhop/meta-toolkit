// @ts-self-types="./path.d.ts"

const dereferable = {object: 1, function: 1};

/**
 * Gets a value from an object by path.
 *
 * @param {object} object the object to get from
 * @param {string|(string|symbol)[]} path dot-delimited string or array of keys
 * @param {object} [options] options
 * @param {string} [options.delimiter='.'] the delimiter for string paths
 * @param {any} [options.defaultValue] value returned if the path does not exist
 * @returns {any} the value at the given path, or defaultValue
 */
export const get = (object, path, {delimiter = '.', defaultValue} = {}) => {
  if (typeof path == 'string') {
    path = path.split(delimiter);
  }
  for (let i = 0; i < path.length; ++i) {
    if (!object || !dereferable[typeof object] || !(path[i] in object)) return defaultValue;
    object = object[path[i]];
  }
  return object;
};

/**
 * Sets a value in an object by path. The path must already exist.
 *
 * @param {object} object the object to set a value in
 * @param {string|(string|symbol)[]} path dot-delimited string or array of keys
 * @param {any} value the value to set
 * @param {object} [options] options
 * @param {string} [options.delimiter='.'] the delimiter for string paths
 * @param {any} [options.defaultValue] value returned if the path does not exist
 * @returns {any} the previous value, or defaultValue if the path did not exist
 */
export const set = (object, path, value, {delimiter = '.', defaultValue} = {}) => {
  if (typeof path == 'string') {
    path = path.split(delimiter);
  }
  let parent = null;
  for (let i = 0; i < path.length; ++i) {
    if (!object || !dereferable[typeof object] || (i + 1 < path.length && !(path[i] in object)))
      return defaultValue;
    parent = object;
    object = object[path[i]];
  }
  if (!parent) return defaultValue;
  parent[path[path.length - 1]] = value;
  return object;
};

/**
 * Sets a value in an object by path, creating intermediate objects as needed.
 *
 * @param {object} object the object to set a value in
 * @param {string|(string|symbol)[]} path dot-delimited string or array of keys
 * @param {any} value the value to set
 * @param {object} [options] options
 * @param {string} [options.delimiter='.'] the delimiter for string paths
 * @returns {any} the previous value at the path
 * @throws {TypeError} if the root object is not dereferenceable or the path is empty
 */
export const forceSet = (object, path, value, {delimiter = '.'} = {}) => {
  if (!object || !dereferable[typeof object]) throw new TypeError('Invalid object');
  if (typeof path == 'string') {
    path = path.split(delimiter);
  }
  let parent = null;
  for (let i = 0; i < path.length; ++i) {
    if (!object || !dereferable[typeof object]) {
      object = parent[path[i - 1]] = {};
    }
    parent = object;
    object = object[path[i]];
  }
  if (!parent) throw new TypeError('Empty path');
  parent[path[path.length - 1]] = value;
  return object;
};

/**
 * Removes a value from an object by path.
 *
 * @param {object} object the object to remove a value from
 * @param {string|(string|symbol)[]} path dot-delimited string or array of keys
 * @param {object} [options] options
 * @param {string} [options.delimiter='.'] the delimiter for string paths
 * @param {any} [options.defaultValue] value returned if the path does not exist
 * @returns {any} the removed value, or defaultValue if the path did not exist
 */
export const remove = (object, path, {delimiter = '.', defaultValue} = {}) => {
  if (typeof path == 'string') {
    path = path.split(delimiter);
  }
  if (!path.length) return defaultValue;
  let parent = null;
  for (let i = 0; i < path.length; ++i) {
    if (!object || !dereferable[typeof object] || !(path[i] in object)) return defaultValue;
    parent = object;
    object = object[path[i]];
  }
  delete parent[path[path.length - 1]];
  return object;
};
