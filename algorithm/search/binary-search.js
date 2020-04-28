/**
 * 二分查找(sorted array)
 * 时间复杂度： O(log n)
 * 空间复杂度：0(1)
 * https://www.geeksforgeeks.org/binary-search-in-javascript/
 * from: https://github.com/julycoding/The-Art-Of-Programming-By-July/blob/master/ebook/zh/04.01.md
 */
// recursion
// 左闭右开
exports.binaryRecursionRearch = function binaryRecursionRearch (arr, khey, low = 0, high = arr.length -1) {
    if (low > high)  return -1;

    let mid = parseInt((high + low) / 2);
    if (arr[mid] > khey)
        return binaryRecursionRearch(arr, khey, low, mid - 1);
    if (arr[mid] < khey)
        return binaryRecursionRearch(arr, khey, mid + 1, high);
    return mid;
}


// iterative
exports.binaryWhileRearch = function (array, item) {
    let left = 0,
        right = array.length - 1,
        currentIndex,
        currentItem

    while(left <= right) {
        currentIndex = Math.floor((right + left) / 2)
        currentItem = array[currentIndex]

        if (currentItem === item) {
            return currentIndex
        }
        if (item < currentItem) {
            right = currentIndex - 1;
        } else if (item > currentItem) {
            left = currentIndex + 1;
        }
    }

    return -1;
}

console.log(this.binaryWhileRearch([0, 1, 2, 2.3, 4], 4))