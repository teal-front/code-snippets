/**
 * 插入排序
 * @returns {Array}
 */
exports.insertion_sort = function (arr) {
    if (arr.length === 1) return arr;

    let i, j, temp
    for (i = 1; i < arr.length; i++) {
        j = i - 1

        /// region method 1
        // 与已排序的数逐一比较，前值大时替换位置
        /*while ((j >=0) && (arr[j] > arr[j + 1])) {
		    [arr[j + 1], arr[j]] = [arr[j], arr[j + 1]]
            j--
        }*/
        /// endregion

        /// region method 2
        temp = arr[i];
        //大于temp时，该数后移
        while ((j >= 0) && (arr[j] > temp)) {
            arr[j + 1] = arr[j]
            j--
        }
        arr[j + 1] = temp
        /// endregion
    }
    return arr;
};

/**
 * 二分插入排序: 查找插入位置时使用的是二分查找的方式
 * 因为插入排序的一侧是已经排序好的，所以可以用二分查找
 */
exports.binary_insertion_sort = arr => {
    for (let i = 1; i < arr.length; i++) {
        let left = 0, right = i - 1, middle;
        let temp = arr[i]

        // find the `left`
        while (left <= right) {
            middle = Math.floor((left + right) / 2);
            if (arr[middle] > temp)
                right = middle - 1;
            else
                left = middle + 1;
        }

        for (let j = i - 1; j >= left; j--) {
            arr[j + 1] = arr[j];
        }

        arr[left] = temp;
    }
    return arr
}