// @ts-self-types="./names.d.ts"

/**
 * Capitalizes a string: the first letter is uppercased, the rest are lowercased.
 *
 * @param {string} name the name to capitalize
 * @returns {string} the capitalized name
 */
export const capitalize = name =>
  name ? name[0].toUpperCase() + name.slice(1).toLowerCase() : name;

/**
 * Splits a camelCase name into an array of strings.
 *
 * @param {string} name the name to split
 * @returns {string[]} an array of strings
 */
export const fromCamelCase = name => name.split(/(?=[A-Z])/g);
/**
 * Joins an array of strings into a camelCase name.
 *
 * @param {string[]} names an array of strings
 * @returns {string} a camelCase name
 */
export const toCamelCase = names =>
  names.map((name, index) => (index ? capitalize(name) : name.toLowerCase())).join('');

/**
 * Splits a PascalCase name into an array of strings.
 *
 * @param {string} name the name to split
 * @returns {string[]} an array of strings
 */
export const fromPascalCase = name => name.split(/(?=[A-Z])/g);
/**
 * Joins an array of strings into a PascalCase name.
 *
 * @param {string[]} names an array of strings
 * @returns {string} a PascalCase name
 */
export const toPascalCase = names => names.map(name => capitalize(name)).join('');

/**
 * Splits a snake_case name into an array of strings.
 *
 * @param {string} name the name to split
 * @returns {string[]} an array of strings
 */
export const fromSnakeCase = name => name.split('_');
/**
 * Joins an array of strings into a snake_case name.
 *
 * @param {string[]} names an array of strings
 * @returns {string} a snake_case name
 */
export const toSnakeCase = names => names.map(name => name.toLowerCase()).join('_');
/**
 * Joins an array of strings into a SNAKE_CASE name.
 *
 * @param {string[]} names an array of strings
 * @returns {string} a SNAKE_CASE name
 */
export const toAllCapsSnakeCase = names => names.map(name => name.toUpperCase()).join('_');

/**
 * Splits a kebab-case name into an array of strings.
 *
 * @param {string} name the name to split
 * @returns {string[]} an array of strings
 */
export const fromKebabCase = name => name.split('-');
/**
 * Joins an array of strings into a kebab-case name.
 *
 * @param {string[]} names an array of strings
 * @returns {string} a kebab-case name
 */
export const toKebabCase = names => names.map(name => name.toLowerCase()).join('-');
