// @ts-self-types="./aliases.d.ts"

import {copyDescriptors, addDescriptor} from './descriptors.js';

/**
 * Adds one or more aliases for a property of an object.
 *
 * @param {object} object target object
 * @param {string|symbol} name name or symbol of the property to alias
 * @param {string|symbol|(string|symbol)[]} aliases name(s) to use as aliases — a symbol, an array, or a comma-separated string
 * @param {boolean} [force] if truthy, the alias will be added even if it already exists
 * @returns {object} the target object
 */
export const addAlias = (object, name, aliases, force) =>
  addDescriptor(object, aliases, Object.getOwnPropertyDescriptor(object, name), force);

/**
 * Adds multiple aliases for multiple properties of an object.
 *
 * @param {object} object target object
 * @param {string|symbol|(string|symbol)[]|Object} dict dictionary mapping source property names to alias names
 * @param {boolean} [force] if truthy, the alias will be added even if it already exists
 * @returns {object} the target object
 */
export const addAliases = (object, dict, force) => copyDescriptors(object, object, dict, force);
