import type {AliasDict} from './descriptors';

export function addAlias(
  object: object,
  name: string | symbol,
  aliases: string | symbol | (string | symbol)[],
  force?: boolean
): object;

export function addAliases(
  object: object,
  dict: string | symbol | (string | symbol)[] | AliasDict,
  force?: boolean
): object;
