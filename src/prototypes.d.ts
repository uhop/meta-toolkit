export function prototypes(object: object, skipSelf: boolean): Generator<object, void, unknown>;

export function getPropertyDescriptor(
  object: object,
  name: string | symbol
): PropertyDescriptor | undefined;
