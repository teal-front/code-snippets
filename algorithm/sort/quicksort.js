/**
 * 快速排序
 * 默认对数字排序，怎么选择初始的基准数可以衍生很多版本
 */
exports.quickSort =  function quickSort(arr) {
    if (arr.length <= 1) return arr

    let index = 0, // 选择了数组第1个为基准值
        cur = arr[index],
        middle = [],
        left = [],
        right = []
    let i = -1, l = arr.length, item
    while(++i < l) {
        item = arr[i]
        if (item > cur) {
            right.push(item)
        } else if (item < cur) {
            left.push(item)
        } else {
            middle.push(item)
        }
    }
    return quickSort(left).concat(middle, quickSort(right))
}