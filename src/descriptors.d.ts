export const defaultDescriptor = {configurable: true, enumerable: false};

export function makeGetter(
  getter: () => any,
  initDescriptor?: PropertyDescriptor = defaultDescriptor
): PropertyDescriptor;
export function makeSetter(
  setter: (value: any) => void,
  initDescriptor?: PropertyDescriptor = defaultDescriptor
): PropertyDecorator;
export function makeAccessors(
  getter: () => any,
  setter: (value: any) => void,
  initDescriptor?: PropertyDescriptor = defaultDescriptor
): PropertyDescriptor;

export function addDescriptor(
  target: object,
  names: string | symbol | (string | symbol)[],
  descriptor: PropertyDescriptor,
  force: boolean
): object;

export interface DescriptorDict {
  [name: string | symbol]: PropertyDescriptor;
}
export function addDescriptors(target: object, dict: DescriptorDict, force: boolean): object;

export function addAccessor(
  target: object,
  names: string | string[],
  getter: () => any,
  setter: (value: any) => void,
  force: boolean
): object;

export interface GetterDict {
  [name: string | symbol]: () => any;
}
export function addGetters(target: object, dict: GetterDict, force: boolean): object;

export interface AliasDict {
  [name: string | symbol]: string | symbol | (string | symbol)[];
}
export function copyDescriptors(
  target: object,
  source: object,
  names: string | symbol | (string | symbol)[] | AliasDict,
  force: boolean
): object;
