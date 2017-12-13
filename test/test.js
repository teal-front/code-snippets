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

    describe('#sort', function () {
        describe('quicksort()', function () {
            const quickSort = require('../algorithm/sort/quicksort.js').quickSort
            const cartData = [
                {price: 11, date: 20160416},
                {price: 13, date: 20160414},
                {price: 11, date: 20160414}
            ];
            const compareFn = function (a, b) {
                if (a.price > b.price)
                    return 1;
                if (a.price < b.price)
                    return -1;
                return a.date > b.date ? 1 : (a.date < b.date ? -1 : 0);
            }
            it('sort object with custom compare fn', function () {
                assert.deepEqual(quickSort(cartData, compareFn), [
                    {price: 11, date: 20160414},
                    {price: 11, date: 20160416},
                    {price: 13, date: 20160414}
                ])
            })
            it('[-1, 3,  5, 4]', function () {
                assert.deepEqual(quickSort([-1, 3,  5, 4]), [-1, 3,  4, 5])
            })
            it('[3, 4, 1, 7, 10]', function () {
                assert.deepEqual(quickSort([3, 4, 1, 7, 10]), [1, 3, 4, 7, 10])
            })
        })
        describe('insertion sort', function () {
            const insertionSort = require('../algorithm/sort/insertion-sort').insertion_sort
            it('[-1, 3,  5, 3, 4]', function () {
                assert.deepEqual(insertionSort([-1, 3, -3, 5, 3, 4]), [-3, -1, 3, 3, 4, 5])
            })
            it('[3, 4, 1, 7, 10]', function () {
                assert.deepEqual(insertionSort([3, 4, 1, 7, 10]), [1, 3, 4, 7, 10])
            })
        })
    })

    describe('#numericStringAdd', function () {
        const add = require('../algorithm/numericString-add')
        it("'2343000.23903' + '999900232343'", function () {
            assert.strictEqual(add('2343000.23903', '999900232343'), '999902575343.23903');
        })
        it("'2343000.23903' + '1.00'", function () {
            assert.strictEqual(add('2343000.23903', '1.00'), '2343001.23903');
        })
        it("'2343000.23903' + '0'", function () {
            assert.strictEqual(add('2343000.23903', '0'), '2343000.23903');
        })
    })

    describe('#removeDuplicateArray', function () {
        const removeDup = require('../algorithm/remove-duplicates-of-array')

        Object.keys(removeDup).forEach(fnName => {
            let fn = removeDup[fnName]

            it(`${fnName}():[1, 1, 1, \'1\']`, function () {
                assert.deepEqual(fn.call(null, [1, 1, 1, '1']), [1, '1'])
            })
            it(`${fnName}():[1, 11, 1, 1, 1, 23, 23, 0]`, function () {
                // ignore order
                let ret = fn.call(null, [1, 11, 1, 1, 1, 23, 23, 0])
                assert.deepEqual(ret.sort(), [0, 1, 11, 23])
            })
        })
    })

    describe('#bracketsPairsMatchTest', function () {
        const pairsMatch = require('../algorithm/brackets-pairs-test')
        it("if (ad=d) {cdd}(", function () {
            assert.strictEqual(pairsMatch("if (ad=d) {cdd}("), false)
        })
        it("if (ad=d) {cd(d}", function () {
            assert.strictEqual(pairsMatch("if (ad=d) {cd(d}"), false)
        })
        it("if(a==b) {c = d};", function () {
            assert.strictEqual(pairsMatch("if(a==b) {c = d};"), true)
        })
    })

    describe('#findSubstrOfMaxTimes', function () {
        const methods = require('../algorithm/find-substr-of-max-times-in-string')

        Object.keys(methods).forEach(m => {
            describe(`${m}()`, function () {
                if (m === 'findMaxCountByArray') {
                    it('string contains big bytes', function () {
                        assert.deepEqual(methods[m].call(null, '𠮷𠮷𠮷𠮷𠮷𠮷𠮷𠮷aaabbbbcccedaifoasflajwelasdflkiwero'), {
                            maxTimes: 8,
                            maxChars: ['𠮷']
                        })
                    })
                }

                it('has same times char', function () {
                    assert.deepEqual(methods[m].call(null, '11181333932204𠮷'), {
                        maxTimes: 4,
                        maxChars: ['1', '3']
                    })
                })
            })
        })
    })

    describe('#unique array', function () {
        const methods = require('../algorithm/unique-array')
        Object.keys(methods).forEach(m => {
            let containsNaN = [[NaN, NaN, 1], [NaN, 1]],
                notContainsNaN = [
                    [1, 3, 1, '1','1', {},{},[], [], null, /a/,/a/],
                    [1, 3, '1', {}, {}, [], [],null, /a/, /a/]
                ]

            describe(`${m}()`, function () {
                it('contains NaN', function () {
                    assert.equal(methods[m].call(null,containsNaN[0]).toString(), containsNaN[1].toString())
                })
                it('not contains NaN, contains object', function () {
                    assert.equal(methods[m].call(null, notContainsNaN[0]).toString(), notContainsNaN[1].toString())
                })
            })
        })
    })
})