// @ts-self-types="./aliases.d.ts"

'use strict';

import {copyDescriptors, addDescriptor} from './descriptors.js';

export const addAlias = (object, name, aliases, force) => addDescriptor(object, aliases, Object.getOwnPropertyDescriptor(object, name), force);

export const addAliases = (object, dict, force) => copyDescriptors(object, object, dict, force);
