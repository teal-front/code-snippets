/**
 * 快速排序
 * 默认对数字排序
 */
exports.quickSort =  function quickSort(arr, compareFn) {
    if (arr.length <= 1) return arr;

    compareFn = compareFn || function (a, b) {
        return a < b ? -1 : (a > b ? 1 :0)
    }

    var provitIndex = Math.floor((arr.length - 1) / 2),
        provitEle = arr.splice(provitIndex, 1)[0];
    var left = [], right = [];

    for (var i = 0, l = arr.length; i < l; i++) {
        // 自定义排序方法
        switch (compareFn(arr[i], provitEle)) {
            case 1:
                right.push(arr[i]);
                break;
            case -1:
            case 0:
                left.push(arr[i]);
                break;
        }
    }

    return [].concat(quickSort(left, compareFn), provitEle, quickSort(right, compareFn));
}