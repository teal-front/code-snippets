/// region 无重复值的数组data中选择n个值，使其值相加为sum

// 和为sum的多个数，数目不固定
// findSumN([2, 2, 4, -4, 7], 3) => null 有Bug
exports.findSumN = (arr, sum) => {
    let ret = [];
    let sortedArr = [].slice.call(arr).sort((a,b) => b-a),
        l = arr.length,
        tempSum = 0

    for(let i = 0; i < l; i++) {
        ret.push(sortedArr[i])
        tempSum += sortedArr[i]

        if (tempSum === sum) {
            return ret
        } else if (tempSum < sum){
            for(let j = i + 1; j < l; j++) {
                tempSum += sortedArr[j]
                ret.push(sortedArr[j])

                if (tempSum > sum) {
                    ret.pop()
                    tempSum -= sortedArr[j]
                    break
                } else if (tempSum === sum) {
                    return ret
                }
            }
        } else {
            ret.pop()
            tempSum -= sortedArr[i]
        }
    }

    return null
}
/// endregion

/// region 输出2个不同的数，相加为sum
/**
 * Loop
 * time complexity: O(n^n)
 * space complexity: O(1)
 */
exports.findSumTwo = (arr, sum) => {
    let l = arr.length
    for (let i =0; i< l; i++) {
        for(let j = 1; j < l; j++) {
            if (arr[i] + arr[j] === sum) {
                return [arr[i], arr[j]]
            }
        }
    }
    return null
}

/**
 * Two-pass Hash Table
 * time complexity: O(n)
 * space complexity: O(n)
 */
exports.findSumHashTable = (arr, sum) => {
    let map = arr.reduce((t, c, i) => {
        t.set(c, i)
        return t
    }, new Map())

    for (let i = 0, l = arr.length; i < l; i++) {
        let v = sum - arr[i]
        if (map.has(v) && map.get(v) !== i) {
            return [i, map.get(v)]
        }
    }

    return null
}

/**
 * One-pass Hash Table
 * time complexity: O(n)
 * space complexity: O(n)
 */
exports.findSumHashTable2 = (arr, sum) => {
    let map = new Map()
    for (let i = 0, l = arr.length; i < l; i++) {
        let v = sum - arr[i]
        if (map.has(v)) {
            return [i, map.get(v)]
        }
        map.set(arr[i], i)
    }

    return null
}
/// endregion