'use strict';

const dereferable = {object: 1, function: 1};

export const get = (obj, path, delimiter = '.', defaultValue) => {
  if (typeof path == 'string') {
    path = path.split(delimiter);
  }
  for (let i = 0; i < path.length; ++i) {
    if (!obj || !dereferable[typeof obj]) return defaultValue;
    obj = obj[path[i]];
  }
  return obj;
};

export const set = (obj, path, value, delimiter = '.', defaultValue) => {
  if (typeof path == 'string') {
    path = path.split(delimiter);
  }
  if (!path.length) return defaultValue;
  for (let i = 0; i < path.length - 1; ++i) {
    if (!obj || !dereferable[typeof obj]) return defaultValue;
    obj = obj[path[i]];
  }
  if (!obj || !dereferable[typeof obj]) return defaultValue;
  return (obj[path[path.length - 1]] = value);
};
