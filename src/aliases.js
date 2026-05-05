// @ts-self-types="./aliases.d.ts"

import {copyDescriptors, addDescriptor} from './descriptors.js';

export const addAlias = (object, name, aliases, force) =>
  addDescriptor(object, aliases, Object.getOwnPropertyDescriptor(object, name), force);

export const addAliases = (object, dict, force) => copyDescriptors(object, object, dict, force);

export const addProtoAlias = (Class, name, aliases, force) =>
  addAlias(Class.prototype, name, aliases, force);

export const addProtoAliases = (Class, dict, force) => addAliases(Class.prototype, dict, force);
