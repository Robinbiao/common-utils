/* eslint valid-typeof: "off" */

/**
 * Provide some useful lang utilities.
 *
 *  - on(el, type, fn)
 *  - off(el, type, fn)
 *
 * Authors:
 *   Allex Wang <allex.wxn@gmail.com> (http://iallex.com/)
 */

'use strict'

import global from './global'

var { hasOwnProperty, toString } = {}, { slice } = [], debug = false, ntick

const UNDEFINED = void 0
const STR_UNDEFINED = 'undefined'

const isBrowser = typeof global.document !== STR_UNDEFINED

const isArray = Array.isArray || function (arr) {
  return toString.call(arr) === '[object Array]'
}

const assign = Object.assign || _assign

const noop = () => {}

function warn (msg) {
  if (typeof console !== STR_UNDEFINED && debug) {
    console.warn('[Vue warn]: ' + msg)
  }
}

function error (msg) {
  if (typeof console !== STR_UNDEFINED) {
    console.error(msg)
  }
}

function nextTick (cb, ctx) {
  return ntick(cb, ctx)
}

function trim (str) {
  return str ? str.replace(/^\s*|\s*$/g, '') : ''
}

function trimEnd (str, chars) {
  if (str && chars === UNDEFINED) {
    return str.replace(/\s+$/, '')
  }

  if (!str || !chars) {
    return str
  }

  return str.replace(new RegExp(`[${chars}]+$`), '')
}

function toLower (str) {
  return str ? str.toLowerCase() : ''
}

function toUpper (str) {
  return str ? str.toUpperCase() : ''
}

// construct the types dictionary by allex
const TYPES = [
  'Boolean',
  'Number',
  'String',
  'Function',
  'Array',
  'Date',
  'RegExp',
  'Undefined',
  'Null',
  'Object'
].reduce((p, v, k) => (k = `[object ${v}]`, p[k] = v.toLowerCase(), p), {})

function typeOf (o) {
  return TYPES[toString.call(o)]
}

function isString (v) {
  return typeof v === 'string'
}

function isBoolean (v) {
  return v === true || v === false || typeOf(v) === 'boolean'
}

function isFunction (v) {
  return typeof v === 'function'
}

function isObject (o) {
  return o !== null && typeof o === 'object'
}

function isPlainObject (o) {
  return isObject(o) && Object.getPrototypeOf(o) === Object.prototype
}

function isBlob (o) {
  return typeof Blob !== STR_UNDEFINED && o instanceof Blob
}

function isFormData (o) {
  return typeof FormData !== STR_UNDEFINED && o instanceof FormData
}

/**
 * Checks if value is null or undefined.  optionally handle `null` as false in strictly mode.
 *
 * @author Allex Wang
 * @example
 *
 * ```js
 * isNil(undefined) -> true
 * isNil(null) -> true
 * isNil(null, true) -> false
 */
function isNil (o, strict) {
  return o === UNDEFINED || (o === null && !strict)
}

function when (value, fulfilled, rejected) {
  var promise = Promise.resolve(value)

  if (arguments.length < 2) {
    return promise
  }

  return promise.then(fulfilled, rejected)
}

function each (o, iterator) {
  var i, key

  if (isArray(o)) {
    for (i = 0; i < o.length; i++) {
      iterator.call(o[i], o[i], i)
    }
  } else if (isObject(o)) {
    for (key in o) {
      if (hasOwnProperty.call(o, key)) {
        iterator.call(o[key], o[key], key)
      }
    }
  }

  return o
}

function merge (target) {
  var args = slice.call(arguments, 1)

  args.forEach(source => {
    _merge(target, source, true)
  })

  return target
}

function defaults (target) {
  var args = slice.call(arguments, 1)

  args.forEach(source => {
    for (var key in source) {
      if (target[key] === UNDEFINED) {
        target[key] = source[key]
      }
    }
  })

  return target
}

function _assign (target) {
  var args = slice.call(arguments, 1)

  args.forEach(source => {
    _merge(target, source)
  })

  return target
}

function _merge (target, source, deep) {
  for (var key in source) {
    if (deep && (isPlainObject(source[key]) || isArray(source[key]))) {
      if (isPlainObject(source[key]) && !isPlainObject(target[key])) {
        target[key] = {}
      }
      if (isArray(source[key]) && !isArray(target[key])) {
        target[key] = []
      }
      _merge(target[key], source[key], deep)
    } else if (source[key] !== UNDEFINED) {
      target[key] = source[key]
    }
  }
}

// cloneDeep
function cloneDeep (data) {
  const t = typeOf(data)
  let o

  if (t === 'array') {
    o = []
  } else if (t === 'object') {
    o = {}
  } else {
    return data
  }

  if (t === 'array') {
    for (let i = 0; i < data.length; i++) {
      o.push(cloneDeep(data[i]))
    }
  } else if (t === 'object') {
    for (let i in data) {
      o[i] = cloneDeep(data[i])
    }
  }
  return o
}

const SPECIAL_CHARS_REGEXP = /([:\-_]+(.))/g
const MOZ_HACK_REGEXP = /^moz([A-Z])/

// Converts a hyphenated string to a camelcased string.
function camelCase (name) {
  return name.replace(SPECIAL_CHARS_REGEXP, function (_, separator, letter, offset) {
    return offset ? letter.toUpperCase() : letter
  }).replace(MOZ_HACK_REGEXP, 'Moz$1')
}

// Transforms string from camel-case to dash notation.
function hyphenate (str) {
  return str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase()
}

function indexOf (value, validList) {
  for (let i = 0; i < validList.length; i++) {
    if (value === validList[i]) {
      return i
    }
  }
  return -1
}

function includes (value, list) {
  return indexOf(value, list) !== -1
}

function find (list, fn) {
  for (var i = -1, l = list.length; ++i < l;) {
    if (fn(list[i], i)) return list[i]
  }
}

function flatten (list) {
  return list.reduce((p, v) => {
    return p.concat(Array.isArray(v) ? flatten(v) : v)
  }, [])
}

export {
  global,
  isBrowser,

  error,
  warn,

  isArray,
  assign,
  hasOwnProperty,
  noop,

  trim,
  trimEnd,

  toLower,
  toUpper,

  typeOf,

  isBlob,
  isBoolean,
  isFormData,
  isFunction,
  isString,
  isObject,
  isPlainObject,
  isNil,

  each,
  merge,
  cloneDeep,
  defaults,
  indexOf,
  includes,
  find,
  flatten,

  when,
  nextTick,

  camelCase,
  hyphenate
}

export default function ({config, nextTick}) {
  ntick = nextTick
  debug = config.debug || !config.silent
}
