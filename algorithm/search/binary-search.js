/**
 * 二分查找
 * 时间复杂度： O(log n)
 * 空间复杂度：0(1)
 * from: https://github.com/julycoding/The-Art-Of-Programming-By-July/blob/master/ebook/zh/04.01.md
 */
// recursion
function binaryRecursionRearch (low, high, khey) {
    if (low > high)
        return -1;
    var mid = parseInt((high + low) / 2);
    if (this[mid] > khey)
        return binaryRecursionRearch(low, mid - 1, khey);
    if (this[mid] < khey)
        return binaryRecursionRearch(mid + 1, high, khey);
    return mid;
}


// while loop
function binaryWhileRearch (arr, item) {
    var left = 0,
        right = arr.length - 1,
        middle;

    while(left <= right) {
        // while (left < right) { 如果这里是left < right，那下面就是right = middle;
        middle = left + Math.floor((right - left) / 2);

        if (item < arr[middle]) {
            right = middle - 1;
            // right = middle;
        } else if (item > arr[middle]) {
            left = middle + 1;
        } else {
            return middle;
        }
    }

    return -1;
}

// test
var arr = [
    [1000],
    [1,3, 34, 2490, 29023, 29020, 23902303],
    [1, 3, 5, 7, 1000, 8000, 10000],
    [1, 34, 39,  1000,]
];
var num = 1000;

arr.forEach(function (ar) {
    console.log(find(ar, num));
});