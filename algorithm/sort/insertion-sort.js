/**
 * 插入排序
 * @returns {Array}
 */
exports.insertion_sort = function(arr) {
    if (arr.length === 1) return arr;

    let i, j, temp
	for (i = 1; i < arr.length; i++) {
		j = i -1

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
        while ((j >=0) && (arr[j] > temp)) {
            arr[j + 1] = arr[j]
            j--
        }
        arr[j + 1] = temp
        /// endregion
	}
	return arr;
};
