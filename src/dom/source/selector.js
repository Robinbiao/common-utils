/**
 * A simple and lite selector implement
 *
 * Authors:
 *   Allex Wang <allex.wxn@gmail.com> (http://iallex.com/)
 */

import {
  global,
  isBrowser,
  includes
} from '../../util/lang'

const doc = global.document,
  tagNameExpr = /^[\w-]+$/,
  idExpr = /^#([\w-]*)$/,
  classExpr = /^\.([\w-]+)$/

const { slice } = []

var toArray = list => slice.call(list)
if (isBrowser) {
  try {
    slice.call(doc.documentElement.childNodes)
  } catch (e) {
    // Convert pseudo array object to real array
    toArray = function (list) {
      var arr = [], i, l
      arr = []
      for (i = 0, l = list.length; i < l; ++i) {
        arr[i] = list[i]
      }
      return arr
    }
  }
}

function getByClassName (className, context) {
  var children, elements, i, l, classNames
  context = context || doc
  if (context.getElementsByClassName) {
    return context.getElementsByClassName(className)
  } else {
    children = context.getElementsByTagName('*')
    elements = []
    for (i = 0, l = children.length; i < l; ++i) {
      if ((classNames = children[i].className) &&
        includes(className, classNames.split(' '))) {
        elements.push(children[i])
      }
    }
    return elements
  }
}

function getByTagName (tagName, context) {
  context = context || doc
  return context.getElementsByTagName(tagName)
}

const select = (selector, context) => {
  var result

  context = context || doc

  if (idExpr.test(selector)) {
    result = doc.getElementById(selector.substr(1))
    if (result) return [result]
    else return []
  } else if (tagNameExpr.test(selector)) {
    result = getByTagName(selector)
  } else if (classExpr.test(selector)) {
    result = getByClassName(selector.replace('.', ''), context)
  } else result = context.querySelectorAll(selector)

  return toArray(result)
}

// Expose
export {
  select
}
