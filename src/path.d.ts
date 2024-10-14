interface PathOptions {
  delimiter?: string | RegExp;
  defaultValue?: any;
}

export function get(
  object: object,
  path: string | (string | symbol)[],
  options?: PathOptions = {delimiter = '.'}
): any;
export function set(
  object: object,
  path: string | (string | symbol)[],
  value: any,
  options?: PathOptions = {delimiter = '.'}
): any;
export function forceSet(
  object: object,
  path: string | (string | symbol)[],
  value: any,
  options?: PathOptions = {delimiter = '.'}
): any;
export function remove(
  object: object,
  path: string | (string | symbol)[],
  options?: PathOptions = {delimiter = '.'}
): any;
