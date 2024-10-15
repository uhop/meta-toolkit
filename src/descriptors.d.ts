/**
 * Default descriptors for getters and setters: `{configurable: true, enumerable: false}`
 */
export const defaultDescriptor = {configurable: true, enumerable: false};

/**
 * Creates a getter descriptor.
 *
 * @param getter a function with no arguments that returns a value.
 * @param initDescriptor a descriptor that is used to set default values for getters.
 *                          Defaults to `{configurable: true, enumerable: false}`, which is available as the `defaultDescriptor`.
 * @returns a descriptor with a getter that calls the provided function, and other properties from the `initDescriptor`.
 */
export function makeGetter(
  getter: () => any,
  initDescriptor?: PropertyDescriptor = defaultDescriptor
): PropertyDescriptor;

/**
 * Creates a setter descriptor.
 *
 * @param setter a function with one argument that sets a value.
 * @param initDescriptor a descriptor that is used to set default values for setters.
 *                          Defaults to `{configurable: true, enumerable: false}`, which is available as the `defaultDescriptor`.
 * @returns a descriptor with a setter that calls the provided function, and other properties from the `initDescriptor`.
 */
export function makeSetter(
  setter: (value: any) => void,
  initDescriptor?: PropertyDescriptor = defaultDescriptor
): PropertyDecorator;

/**
 * Creates a getter and setter descriptor.
 *
 * @param getter a function with no arguments that returns a value.
 * @param setter a function with one argument that sets a value.
 * @param initDescriptor a descriptor that is used to set default values for getters and setters.
 *                          Defaults to `{configurable: true, enumerable: false}`, which is available as the `defaultDescriptor`.
 * @returns a descriptor with a getter and setter that call the provided functions, and other properties from the `initDescriptor`.
 */
export function makeAccessors(
  getter: () => any,
  setter: (value: any) => void,
  initDescriptor?: PropertyDescriptor = defaultDescriptor
): PropertyDescriptor;

/**
 * Adds a descriptor to an object.
 *
 * @param target the object to add the descriptor to.
 * @param names a string (a comma-separated list of names), symbol, or an array of strings and symbols that denotes the name of the descriptor.
 * @param descriptor the descriptor object.
 * @param force if truthy, the descriptor will be added even if it already exists in the target.
 * @returns the target object.
 */
export function addDescriptor(
  target: object,
  names: string | symbol | (string | symbol)[],
  descriptor: PropertyDescriptor,
  force?: boolean
): object;

/**
 * A dictionary that defines descriptors with their names.
 */
export interface DescriptorDict {
  /** A key is a name of a property (a symbol or a comma-separated list of names as a string) and a value is a descriptor object. */
  [name: string | symbol]: PropertyDescriptor;
}


/**
 * Adds descriptors to an object defined by a dictionary.
 *
 * @param target the object to add the descriptor to.
 * @param dict a dictionary {@link DescriptorDict} where the keys are the names of the descriptors to add and the values are the descriptors.
 * @param force if truthy, the descriptor will be added even if it already exists in the target.
 * @returns the target object.
 */
export function addDescriptors(target: object, dict: DescriptorDict, force?: boolean): object;

/**
 * Adds an accessor (getter and setter) to an object.
 *
 * @param target the object to add the accessor to.
 * @param names a string (a comma-separated list of names), symbol, or an array of strings and symbols that denotes the name of the accessor.
 * @param getter a function with no arguments that returns a value.
 * @param setter a function with one argument that sets a value.
 * @param force if truthy, the accessor will be added even if it already exists in the target.
 * @returns the target object.
 */
export function addAccessor(
  target: object,
  names: string | symbol | (string | symbol)[],
  getter: () => any,
  setter: (value: any) => void,
  force?: boolean
): object;

/**
 * A dictionary that defines getters with their names.
 */
export interface GetterDict {
  /** A key is a name of a property (a symbol or a comma-separated list of names as a string) and a value is a getter function. */
  [name: string | symbol]: () => any;
}

/**
 * Adds getters to an object defined by a dictionary.
 *
 * @param target the object to add the getter to.
 * @param dict a dictionary {@link GetterDict} where the keys are the names of the getters to add and the values are the getters.
 * @param force if truthy, the getter will be added even if it already exists in the target.
 * @returns the target object.
 */
export function addGetters(target: object, dict: GetterDict, force?: boolean): object;

/**
 * A dictionary that defines aliases with their names.
 */
export interface AliasDict {
  /** A key is a name of a source property and a value is a name of an alias
   * (a symbol, a comma-separated list of names as a string, or an array of strings and symbols).
   */
  [name: string | symbol]: string | symbol | (string | symbol)[];
}

/**
 * Copies descriptors from one object to another (it can be the same object).
 *
 * @param target the object to copy descriptors to.
 * @param source the object to copy descriptors from.
 * @param names a string (a comma-separated list of names), symbol, or an array of strings and symbols that denotes the name of the descriptor to copy.
 *               It can also be an object {@link AliasDict} with keys as strings or symbols denoting a name of a descriptor from the source object.
 *               An associated value is a value suitable as the `names` argument of {@link addDescriptors()}.
 * @param force if truthy, the descriptor will be added even if it already exists in the target.
 * @returns the target object.
 */
export function copyDescriptors(
  target: object,
  source: object,
  names: string | symbol | (string | symbol)[] | AliasDict,
  force?: boolean
): object;
