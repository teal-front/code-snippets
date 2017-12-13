/**
 * 数组去重, 对简单类型，不包括对象
 * 参考：https://www.toobug.net/article/array_unique_in_javascript.html
 */


exports.unique_es6 = (arr) => [...new Set(arr)]

exports.unique_es6_map = arr => {
    let ret = [], map = new Map()

    for(let item of arr) {
        if(!map.get(item)) {
            map.set(item, 1)
            ret.push(item)
        }
    }

    return ret
}

exports.unique_includes = (arr) => {
    let ret = []
    for (let item of arr) {
        if (!ret.includes(item)) {
            ret.push(item)
        }
    }
    return ret
}



// [].indexOf是严格比较，[NaN].indexOf(NaN) === -1
// 所以这个方法会过滤掉NaN
exports.unique_indexOf = (arr) => {
    return arr.filter((item, i) => {
        return arr.indexOf(item) === i
    })
}

// 性能不佳
// 改变了原数组里顺序
exports.unique_loop = (arr) => {
    let ret = [], l = arr.length

    for (let i = 0; i < l; i++) {
        let isRepeat = false

        for(let j = i + 1; j < l; j++) {
            if (arr[i] === arr[j] || (isNaN(arr[i]) && isNaN(arr[j]))) {
                isRepeat = true
                break
            }
        }
        if(!isRepeat) {
            ret.push(arr[i])
        }
    }
    console.log(ret)
    return ret
}

// 对象、数组、正则表达式被去重
exports.unique_map = arr => {
    let map = {}, ret = []

    for(let item of arr) {
        // 保证了1与‘1’之间的区别, 同时避免了值为'__prototype__'的特殊情况
        let key = `${typeof item}${item}`

        if (!map[key]) {
            map[key] = 1
            ret.push(item)
        }
    }

    return ret
}