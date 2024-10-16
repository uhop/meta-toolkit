// @ts-self-types="./names.d.ts"

'use strict';

export const capitalize = name => (name ? name[0].toUpperCase() + name.slice(1).toLowerCase() : name);

export const fromCamelCase = name => name.split(/(?=[A-Z])/g);
export const toCamelCase = names => names.map((name, index) => (index ? capitalize(name) : name.toLowerCase())).join('');

export const fromPascalCase = name => name.split(/(?=[A-Z])/g);
export const toPascalCase = names => names.map(name => capitalize(name)).join('');

export const fromSnakeCase = name => name.split('_');
export const toSnakeCase = names => names.map(name => name.toLowerCase()).join('_');
export const toAllCapsSnakeCase = names => names.map(name => name.toUpperCase()).join('_');

export const fromKebabCase = name => name.split('-');
export const toKebabCase = names => names.map(name => name.toLowerCase()).join('-');
