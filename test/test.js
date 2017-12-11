'use strict';

const assert = require('assert')

describe('algorithm:', function () {
    describe('#binary-search', function () {
        const binarySearch = require('../algorithm/search/binary-search')
        Object.keys(binarySearch).forEach(function (methodName) {
            const method = binarySearch[methodName]
            describe(`${methodName}()`, function () {
                it('[0]', function () {
                    assert.equal(method([0], 100), -1)
                })
                it('[0, 100]', function () {
                    assert.equal(method([0, 100], 100), 1)
                })
                it('[0, 100, 200, 300, 400, 500, 600]', function () {
                    assert.equal(method([0, 100, 200, 300, 400, 500, 600], 100), 1)
                })
                it('[0, 10, 20, 30, 40, 50, 60, 100]', function () {
                    assert.equal(method([0, 10, 20, 30, 40, 50, 60, 100], 100), 7)
                })
            })
        })
    })
})