/**
 * scrollTop getter/setter
 *
 * Authors:
 *   Allex Wang <allex.wxn@gmail.com> (http://iallex.com/)
 */

import { isBrowser } from '../../util/lang'

const win = isBrowser ? window : {}

const raf = win.requestAnimationFrame || (
  win.webkitRequestAnimationFrame ||
  win.mozRequestAnimationFrame ||
  win.msRequestAnimationFrame || function (callback) {
    return setTimeout(callback, 1000 / 60)
  }
)

// scrollTop getter/setter
function scrollTop (el, from = 0, to, duration = 500, cb) {
  // getter
  if (arguments.length === 1) {
    return getScrollTop(el)
  }

  // set scrollTop with anination.
  const difference = Math.abs(from - to)
  const step = Math.ceil(difference / duration * 50)

  function scroll (start, end, step) {
    if (start === end) {
      if (typeof cb === 'function') cb()
      return
    }

    let d = (start + step > end) ? end : start + step
    if (start > end) {
      d = (start - step < end) ? end : start - step
    }

    if (el.window === win) {
      el.scrollTo(d, d)
    } else {
      el.scrollTop = d
    }

    raf(() => scroll(d, end, step))
  }

  scroll(from, to, step)
}

function getWindow (elem) {
  return elem.window === elem
    ? elem
    : elem.nodeType === 9
      ? elem.defaultView || elem.parentWindow
      : false
}

function getScrollTop (elem) {
  var method = 'scrollTop', prop = 'pageYOffset'
  var win = getWindow(elem)
  return win ? (prop in win) ? win[ prop ]
    : win.document.documentElement[ method ]
    : elem[ method ]
}

export {
  getWindow,
  scrollTop
}
