/**
 * 快速排序
 */
var quickSort = function (arr, compareFn) {
    if (arr.length <= 1) return arr;

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

    return [].concat(quickSort(left), provitEle, quickSort(right));
}

///// sort test
var cartData = [
    {
        price: 11,
        date: 20160416
    },
    {
        price: 11,
        date: 20160414
    }
];
console.log(quickSort(cartData, function (a, b) {
    if (a.price > b.price) {
        return 1;
    } else if (a.price < b.price) {
        return -1;
    } else {
        return a.date > b.date ? 1 : (a.date < b.date ? -1 : 0);
    }
}));

var arr = [
    [-1, 3, -3, 3, 5, 4],
    [3, 4, 1, 7, 10]
]
arr.forEach(function (ar) {
    console.log(quickSort(ar, function (a, b) {
        return a > b ? 1 : (a < b ? -1 : 0);
    }))
});