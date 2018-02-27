/**
 * Provide some useful utilities.
 *
 * Authors:
 *   Allex Wang <allex.wxn@gmail.com> (http://iallex.com/)
 */

'use strict'

import lang, { isFunction, merge } from './lang'

export * from './lang'

export default function ctor (...args) {
  lang(...args)
}

export function options (fn, obj, opts) {
  opts = opts || {}

  if (isFunction(opts)) {
    opts = opts.call(obj)
  }

  return merge(fn.bind({$vm: obj, $options: opts}), fn, {$options: opts})
}
