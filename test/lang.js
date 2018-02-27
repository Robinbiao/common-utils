/* global describe: true */
/* global it: true */
/* eslint no-new-wrappers: off */

var assert = require('assert')
var _ = require('../')

describe('apis: lang/*', () => {
  it('isXXX(v)', () => {
    assert.equal(true, _.isBoolean(true))
    assert.equal(true, _.isBoolean(false))
    assert.equal(false, _.isBoolean(0))
    assert.equal(true, _.isBoolean(new Boolean(false)), 'new Boolean(false)')
    assert.equal(true, _.isArray([]))
  })

  it('typeOf(v)', () => {
    assert.equal('number', _.typeOf(1))
    assert.equal('null', _.typeOf(null))
    assert.equal('object', _.typeOf({}))
    assert.equal('array', _.typeOf([]))
  })

  it('isNil(o, strict)', () => {
    assert.equal(true, _.isNil(undefined))
    assert.equal(true, _.isNil(null))
    assert.equal(true, _.isNil(undefined, true))
    assert.equal(false, _.isNil(null, true))
    assert.equal(false, _.isNil(true))
    assert.equal(false, _.isNil(0))
    assert.equal(false, _.isNil(NaN))
  })

  it('collection utils', () => {
    var list = [ 'a', 'b', 'c', { name: 1, value: 'foo' } ]
    assert.equal(true, _.includes('b', list))
    assert.equal(2, _.indexOf('c', list))
    assert.equal('foo', (_.find(list, (v, i) => v.name === 1) || {}).value)
  })
})
