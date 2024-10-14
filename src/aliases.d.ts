import type {AliasDict} from './descriptors';

/**
 * Adds one or more aliases for a property of an object.
 *
 * @param object target object
 * @param name name or symbol of the property to alias
 * @param aliases name(s) to use as aliases. It can be a symbol, an array of strings or symbols, or a comma-separated string of names.
 * @param force if truthy, then the alias will be added even if it is already there
 * @returns the target object
 */
export function addAlias(
  object: object,
  name: string | symbol,
  aliases: string | symbol | (string | symbol)[],
  force?: boolean
): object;

/**
 * Adds multiple aliases for multiple properties of an object.
 *
 * @param object target object
 * @param dict dictionary where the keys are the names of the properties to alias and the values are the aliases.
 *   It can be a string containing a comma-separated list of names, a symbol, an array of strings or symbols, or an object with
 *   keys as strings or symbols and values as strings or symbols.
 * @param force if truthy, then the alias will be added even if it is already there
 * @returns the target object
 */
export function addAliases(
  object: object,
  dict: string | symbol | (string | symbol)[] | AliasDict,
  force?: boolean
): object;
