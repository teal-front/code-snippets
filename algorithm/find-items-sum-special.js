/**
 * 无重复值的数组data中选择n个值，使其值相加为sum
 */

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

/**
 * 输出2个数，相加为sum
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