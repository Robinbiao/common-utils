/**
 * A simple DOM event shortcut APIs
 *
 *  - on(el, type, fn)
 *  - off(el, type, fn)
 *
 * Authors:
 *   Allex Wang <allex.wxn@gmail.com> (http://iallex.com/)
 */

'use strict'

import { isBrowser, isObject } from '../util/lang'
import { select } from '../dom/index'

const document = isBrowser ? window.document : {}

const $ = (selector, context) => {
  if (isObject(selector)) {
    return selector
  }
  return select(selector, context)[0]
}

/* istanbul ignore next */
const on = (function () {
  if (document.addEventListener) {
    return function (el, event, handler) {
      el = el && $(el)
      if (el && event && handler) {
        el.addEventListener(event, handler, false)
      }
    }
  } else {
    return function (el, event, handler) {
      el = el && $(el)
      if (el && event && handler) {
        el.attachEvent('on' + event, handler)
      }
    }
  }
})()

/* istanbul ignore next */
const off = (function () {
  if (document.removeEventListener) {
    return function (el, event, handler) {
      el = el && $(el)
      if (el && event) {
        el.removeEventListener(event, handler, false)
      }
    }
  } else {
    return function (el, event, handler) {
      el = el && $(el)
      if (el && event) {
        el.detachEvent('on' + event, handler)
      }
    }
  }
})()

export {
  on,
  off
}
