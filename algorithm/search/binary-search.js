/**
 * 二分查找
 * 时间复杂度： O(log n)
 * 空间复杂度：0(1)
 * from: https://github.com/julycoding/The-Art-Of-Programming-By-July/blob/master/ebook/zh/04.01.md
 */
// recursion
exports.binaryRecursionRearch = function binaryRecursionRearch (arr, khey, low = 0, high = arr.length -1) {
    if (low > high)  return -1;

    let mid = low + parseInt((high + low) / 2);
    if (arr[mid] > khey)
        return binaryRecursionRearch(arr, khey, low, mid - 1);
    if (arr[mid] < khey)
        return binaryRecursionRearch(arr, khey, mid + 1, high);
    return mid;
}


// while loop
exports.binaryWhileRearch = function (arr, item) {
    let left = 0,
        right = arr.length - 1,
        currentIndex,
        currentItem

    while(left <= right) {
        currentIndex = left + Math.floor((right - left) / 2)
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