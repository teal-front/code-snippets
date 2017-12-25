'use strict';

const assert = require('assert')

describe('algorithm:', function () {
    describe('#binary-search', function () {
        const binarySearch = require('../algorithm/search/binary-search')
        Object.keys(binarySearch).forEach(function (methodName) {
            const method = binarySearch[methodName]
            describe(`${methodName}()`, function () {
                it('[0]', function () {
                    assert.equal(method([0], 0), 0)
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
            it('[-1, 3, 3, 5, 3, 4]', function () {
                assert.deepEqual(quickSort([-1, 3, 3, 5, 3, 4]), [-1, 3, 3, 3, 4, 5])
            })
            it('[3, 4, 1, 7, 10]', function () {
                assert.deepEqual(quickSort([3, 4, 1, 7, 10]), [1, 3, 4, 7, 10])
            })
        })
        describe('insertion sort', function () {
            const methods = require('../algorithm/sort/insertion-sort')
            Object.keys(methods).forEach(m => {
                describe(`${m}()`, function () {
                    it('[-1, 3,  5, 3, 4]', function () {
                        assert.deepEqual(methods[m].call(null, [-1, 3, -3, 5, 3, 4]), [-3, -1, 3, 3, 4, 5])
                    })
                    it('[3, 4, 1, 7, 10]', function () {
                        assert.deepEqual(methods[m].call(null, [3, 4, 1, 7, 10]), [1, 3, 4, 7, 10])
                    })
                })
            })
        })
        describe('bubbleSort()', function () {
            const bubbleSort = require('../algorithm/sort/bubble-sort')
            it('[-1, 3,  5, 3, 4]', function () {
                assert.deepEqual(bubbleSort([-1, 3, -3, 5, 3, 4]), [-3, -1, 3, 3, 4, 5])
            })
            it('[-1]', function () {
                assert.deepEqual(bubbleSort([-1]), [-1])
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

    describe('#find items in arr let sum is special', function () {
        const {findSumN, findSumTwo} = require('../algorithm/find-items-sum-special')
        const getSum = arr => arr.reduce((sum, cur) => sum + cur, 0)
        describe('findSumN()', function () {
            it('simple case', function () {
                let target = findSumN([1, 3, 4, 5, 7], 8)
                assert.strictEqual(getSum(target), 8)
            })
            it('hard case', function () {
                let target = findSumN([1, 3, 4, 5, 7], 20)
                assert.strictEqual(getSum(target), 20)
            })
        })
        describe('findSumTwo()', function () {
            it('simple case', function () {
                let target = findSumTwo([1, 3, 4, 5, 7], 9)
                assert.strictEqual(target.length, 2)
                assert.strictEqual(getSum(target), 9)
            })
            it('hard case', function () {
                let target = findSumTwo([1, 3, 4, 5, 7], 4)
                assert.strictEqual(target.length, 2)
                assert.strictEqual(getSum(target), 4)
            })
        })
    })
    describe('#find longest substring length', function () {
        const methods = require('../algorithm/find-longest-substring')
        Object.keys(methods).forEach(m => {
            describe(`${m}()`, function () {
                it('empty string', function () {
                    assert.strictEqual(methods[m](''), 0)
                })
                it('sigle char string', function () {
                    assert.strictEqual(methods[m]('a'), 1)
                })
                it('simple case', function () {
                    assert.strictEqual(methods[m]('abcdabc'), 4)
                })
                it('hard case', function () {
                    assert.strictEqual(methods[m]('abcdefgabcdefgxyczkiopl'), 13)
                })
            })
        })
    })

    describe('#fibonacci', function () {
        let fibs = require('../algorithm/fibonacci')
        Object.keys(fibs).forEach(fib => {
            describe(`${fib}():`, function () {
                it('0', function () {
                    assert.equal(fibs[fib](1), 1)
                })
                it('3', function () {
                    assert.equal(fibs[fib](4), 3)
                })
            })
        })
    })
})

describe('data structure:', function () {
    describe('trie', function () {
        const Trie = require('../dataStructure/tree/trie')
        let trie = new Trie()
        trie.insert(['abc', 'ab', 'aaaa', 'word'])

        it('search function', function () {
            assert.strictEqual(trie.search('ab'), true)
        })
        it('startsWith function', function () {
            assert.strictEqual(trie.startsWith('aaa'), true)
        })
    })
})