// @ts-self-types="./path.d.ts"

'use strict';

const dereferable = {object: 1, function: 1};

export const get = (object, path, {delimiter = '.', defaultValue} = {}) => {
  if (typeof path == 'string') {
    path = path.split(delimiter);
  }
  for (let i = 0; i < path.length; ++i) {
    if (!object || !dereferable[typeof object] || !(path[i] in object)) return defaultValue;
    object = object[path[i]];
  }
  return object;
};

export const set = (object, path, value, {delimiter = '.', defaultValue} = {}) => {
  if (typeof path == 'string') {
    path = path.split(delimiter);
  }
  let parent = null;
  for (let i = 0; i < path.length; ++i) {
    if (!object || !dereferable[typeof object] || (i + 1 < path.length && !(path[i] in object))) return defaultValue;
    parent = object;
    object = object[path[i]];
  }
  if (!parent) return defaultValue;
  parent[path[path.length - 1]] = value;
  return object;
};

export const forceSet = (object, path, value, {delimiter = '.'} = {}) => {
  if (!object || !dereferable[typeof object]) throw new TypeError('Invalid object');
  if (typeof path == 'string') {
    path = path.split(delimiter);
  }
  let parent = null;
  for (let i = 0; i < path.length; ++i) {
    if (!object || !dereferable[typeof object]) {
      object = parent[path[i - 1]] = {};
    }
    parent = object;
    object = object[path[i]];
  }
  if (!parent) throw new TypeError('Empty path');
  parent[path[path.length - 1]] = value;
  return object;
};

export const remove = (object, path, {delimiter = '.', defaultValue} = {}) => {
  if (typeof path == 'string') {
    path = path.split(delimiter);
  }
  if (!path.length) return defaultValue;
  let parent = null;
  for (let i = 0; i < path.length; ++i) {
    if (!object || !dereferable[typeof object] || !(path[i] in object)) return defaultValue;
    parent = object;
    object = object[path[i]];
  }
  delete parent[path[path.length - 1]];
  return object;
};
