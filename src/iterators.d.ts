export function augmentIterator<T = any>(iterator: Iterator<T>): IterableIterator<T>;
export function normalizeIterator<T = any>(iterator: Iterator<T>): IterableIterator<T>;

export function mapIterator<T = any, R = any>(
  iterator: Iterable<T>,
  callbackFn: (value: T, index: number) => R
): IterableIterator<R>;
export function filterIterator<T = any>(
  iterator: Iterable<T>,
  callbackFn: (value: T, index: number) => boolean
): IterableIterator<T>;
