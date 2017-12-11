/**
 * sameValueZero
 */
const assert = require('assert')

0 === -0                      // => true
Object.is(0, -0)              // => false
assert.notStrictEqual(0, -0)  // => AssertionError [ERR_ASSERTION]: 0 !== -0

NaN === NaN                      // => false
Object.is(NaN, NaN)              // => true
assert.strictEqual(NaN, NaN)    // => AssertionError [ERR_ASSERTION]: NaN === NaN
