# utils

A generic and light utilities for web component development.

Author: Allex Wang

## Installation

### NPM install

```sh
npm i @fedor/utils
```

### Combo

```html
<script src="//s2.analysys.cn/libs/??-/@fedor/utils@1.0.0"></script>
```

## APIs

> Most of the API are describe its purpose.
> and the parameters should according to normailize API.

```
{
  // enviroment apis
  installer: [Function: installer],
  options: [Function: options],

  isBrowser: false,
  error: [Function: error],
  warn: [Function: warn],

  // lang utilities
  isArray: [Function: isArray],
  assign: [Function: assign],
  hasOwnProperty: [Function: hasOwnProperty],
  noop: [Function: noop],

  trim: [Function: trim],
  trimEnd: [Function: trimEnd],
  toLower: [Function: toLower],
  toUpper: [Function: toUpper],

  typeOf: [Function: typeOf],

  isBlob: [Function: isBlob],
  isBoolean: [Function: isBoolean],
  isFormData: [Function: isFormData],
  isFunction: [Function: isFunction],
  isString: [Function: isString],
  isObject: [Function: isObject],
  isPlainObject: [Function: isPlainObject],

  each: [Function: each],
  merge: [Function: merge],
  cloneDeep: [Function: cloneDeep],
  defaults: [Function: defaults],
  indexOf: [Function: indexOf],
  find: [Function: find],
  flatten: [Function: flatten],

  when: [Function: when],
  nextTick: [Function: nextTick],
  camelCase: [Function: camelCase],
  hyphenate: [Function: hyphenate],

  // DOM OPs
  getStyle: [Function: getStyle],
  scrollTop: [Function: scrollTop],

  hasClass: [Function: hasClass],
  addClass: [Function: addClass],
  removeClass: [Function: removeClass],

  // DOM events
  on: [Function],
  off: [Function]
}
```
