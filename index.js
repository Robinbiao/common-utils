'use strict'

import Util, { options } from './util/index'

import * as dom from './dom/index'
import * as event from './event/index'

function installer (Vue) {
  if (installer.installed) {
    return
  }

  Util(Vue)

  Vue.dom = dom
  Vue.event = event

  Object.defineProperties(Vue.prototype, {

    $util: {
      get () {
        return options(Util, this, this.$options.util)
      }
    },

    $dom: {
      get () {
        return options(Vue.dom, this, this.$options.dom)
      }
    },

    $event: {
      get () {
        return options(Vue.event, this, this.$options.event)
      }
    }

  })
}

// Install as VUE plugin additionally
if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(installer)
}

export { installer }

export * from './util/index'

export * from './dom/index'

export * from './event/index'
