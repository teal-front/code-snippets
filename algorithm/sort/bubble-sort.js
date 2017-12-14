/**
 * 冒泡排序
 * 逐渐把最大的值放在最右侧，最右侧形成已排序区
 */

module.exports = (arr) => {
    let l = arr.length

    while (l--) {
        for (let j = 0; j < l; j++) {
            if (arr[j] > arr[j + 1]) {
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]
            }
        }
    }

    return arr
}

// 鸡尾酒排序/双向冒泡排序
// ...