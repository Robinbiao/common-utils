// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
module.exports = typeof window !== 'undefined' && window.Math === Math
  ? window : typeof self !== 'undefined' && self.Math === Math
    ? self : typeof global !== 'undefined'
      ? global
      // eslint-disable-next-line no-new-func
      : Function('return this')()
