/**
 * Default descriptors for getters and setters: `{configurable: true, enumerable: false}`
 */
export const defaultDescriptor: {readonly configurable: true; readonly enumerable: false};

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
  initDescriptor?: PropertyDescriptor
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
  initDescriptor?: PropertyDescriptor
): PropertyDescriptor;

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
  initDescriptor?: PropertyDescriptor
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
 * A getter/setter pair. Either member can be omitted.
 */
export interface AccessorPair {
  /** A function with no arguments that returns a value. */
  get?: () => any;
  /** A function with one argument that sets a value. */
  set?: (value: any) => void;
}

/**
 * A dictionary that defines accessors with their names.
 */
export interface AccessorDict {
  /** A key is a name of a property (a symbol or a comma-separated list of names as a string) and a value is a getter/setter pair {@link AccessorPair}. */
  [name: string | symbol]: AccessorPair;
}

/**
 * Adds accessors (getter/setter pairs) to an object defined by a dictionary.
 *
 * @param target the object to add the accessors to.
 * @param dict a dictionary {@link AccessorDict} where the keys are the names of the accessors to add and the values are getter/setter pairs.
 * @param force if truthy, the accessor will be added even if it already exists in the target.
 * @returns the target object.
 */
export function addAccessors(target: object, dict: AccessorDict, force?: boolean): object;

/**
 * Adds a getter to an object under one or more names.
 *
 * @param target the object to add the getter to.
 * @param names a string (a comma-separated list of names), symbol, or an array of strings and symbols that denotes the name of the getter.
 * @param getter a function with no arguments that returns a value.
 * @param force if truthy, the getter will be added even if it already exists in the target.
 * @returns the target object.
 */
export function addGetter(
  target: object,
  names: string | symbol | (string | symbol)[],
  getter: () => any,
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
 * Adds a setter to an object under one or more names.
 *
 * @param target the object to add the setter to.
 * @param names a string (a comma-separated list of names), symbol, or an array of strings and symbols that denotes the name of the setter.
 * @param setter a function with one argument that sets a value.
 * @param force if truthy, the setter will be added even if it already exists in the target.
 * @returns the target object.
 */
export function addSetter(
  target: object,
  names: string | symbol | (string | symbol)[],
  setter: (value: any) => void,
  force?: boolean
): object;

/**
 * A dictionary that defines setters with their names.
 */
export interface SetterDict {
  /** A key is a name of a property (a symbol or a comma-separated list of names as a string) and a value is a setter function. */
  [name: string | symbol]: (value: any) => void;
}

/**
 * Adds setters to an object defined by a dictionary.
 *
 * @param target the object to add the setters to.
 * @param dict a dictionary {@link SetterDict} where the keys are the names of the setters to add and the values are the setters.
 * @param force if truthy, the setter will be added even if it already exists in the target.
 * @returns the target object.
 */
export function addSetters(target: object, dict: SetterDict, force?: boolean): object;

/**
 * Adds a descriptor to a class's prototype under one or more names.
 * Sugar for `addDescriptor(Class.prototype, names, descriptor, force)`.
 *
 * @param Class the class whose prototype will receive the descriptor.
 * @param names a string (a comma-separated list of names), symbol, or an array of strings and symbols that denotes the name of the descriptor.
 * @param descriptor the descriptor object.
 * @param force if truthy, the descriptor will be added even if it already exists on the prototype.
 * @returns the prototype object.
 */
export function addProtoDescriptor(
  Class: {prototype: object},
  names: string | symbol | (string | symbol)[],
  descriptor: PropertyDescriptor,
  force?: boolean
): object;

/**
 * Adds descriptors to a class's prototype defined by a dictionary.
 * Sugar for `addDescriptors(Class.prototype, dict, force)`.
 *
 * @param Class the class whose prototype will receive the descriptors.
 * @param dict a dictionary {@link DescriptorDict} where the keys are the names of the descriptors to add and the values are the descriptors.
 * @param force if truthy, the descriptor will be added even if it already exists on the prototype.
 * @returns the prototype object.
 */
export function addProtoDescriptors(
  Class: {prototype: object},
  dict: DescriptorDict,
  force?: boolean
): object;

/**
 * Adds an accessor (getter and setter) to a class's prototype under one or more names.
 * Sugar for `addAccessor(Class.prototype, names, getter, setter, force)`.
 *
 * @param Class the class whose prototype will receive the accessor.
 * @param names a string (a comma-separated list of names), symbol, or an array of strings and symbols that denotes the name of the accessor.
 * @param getter a function with no arguments that returns a value.
 * @param setter a function with one argument that sets a value.
 * @param force if truthy, the accessor will be added even if it already exists on the prototype.
 * @returns the prototype object.
 */
export function addProtoAccessor(
  Class: {prototype: object},
  names: string | symbol | (string | symbol)[],
  getter: () => any,
  setter: (value: any) => void,
  force?: boolean
): object;

/**
 * Adds accessors to a class's prototype defined by a dictionary.
 * Sugar for `addAccessors(Class.prototype, dict, force)`.
 *
 * @param Class the class whose prototype will receive the accessors.
 * @param dict a dictionary {@link AccessorDict} where the keys are the names of the accessors to add and the values are getter/setter pairs.
 * @param force if truthy, the accessor will be added even if it already exists on the prototype.
 * @returns the prototype object.
 */
export function addProtoAccessors(
  Class: {prototype: object},
  dict: AccessorDict,
  force?: boolean
): object;

/**
 * Adds a getter to a class's prototype under one or more names.
 * Sugar for `addGetter(Class.prototype, names, getter, force)`.
 *
 * @param Class the class whose prototype will receive the getter.
 * @param names a string (a comma-separated list of names), symbol, or an array of strings and symbols that denotes the name of the getter.
 * @param getter a function with no arguments that returns a value.
 * @param force if truthy, the getter will be added even if it already exists on the prototype.
 * @returns the prototype object.
 */
export function addProtoGetter(
  Class: {prototype: object},
  names: string | symbol | (string | symbol)[],
  getter: () => any,
  force?: boolean
): object;

/**
 * Adds getters to a class's prototype defined by a dictionary.
 * Sugar for `addGetters(Class.prototype, dict, force)`.
 *
 * @param Class the class whose prototype will receive the getters.
 * @param dict a dictionary {@link GetterDict} where the keys are the names of the getters to add and the values are the getters.
 * @param force if truthy, the getter will be added even if it already exists on the prototype.
 * @returns the prototype object.
 */
export function addProtoGetters(
  Class: {prototype: object},
  dict: GetterDict,
  force?: boolean
): object;

/**
 * Adds a setter to a class's prototype under one or more names.
 * Sugar for `addSetter(Class.prototype, names, setter, force)`.
 *
 * @param Class the class whose prototype will receive the setter.
 * @param names a string (a comma-separated list of names), symbol, or an array of strings and symbols that denotes the name of the setter.
 * @param setter a function with one argument that sets a value.
 * @param force if truthy, the setter will be added even if it already exists on the prototype.
 * @returns the prototype object.
 */
export function addProtoSetter(
  Class: {prototype: object},
  names: string | symbol | (string | symbol)[],
  setter: (value: any) => void,
  force?: boolean
): object;

/**
 * Adds setters to a class's prototype defined by a dictionary.
 * Sugar for `addSetters(Class.prototype, dict, force)`.
 *
 * @param Class the class whose prototype will receive the setters.
 * @param dict a dictionary {@link SetterDict} where the keys are the names of the setters to add and the values are the setters.
 * @param force if truthy, the setter will be added even if it already exists on the prototype.
 * @returns the prototype object.
 */
export function addProtoSetters(
  Class: {prototype: object},
  dict: SetterDict,
  force?: boolean
): object;

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
