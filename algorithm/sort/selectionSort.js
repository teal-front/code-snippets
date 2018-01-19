/**
 * 选择排序
 */
let selectionSort = (arr) => {
    for (let i = 0, l = arr.length - 1; i < l; i++) {
        let min = i
        // ***j<=l***
        for(let j = i + 1; j <= l; j++) {
            if (arr[j] < arr[min]) {
                min = j
            }
        }
        [arr[i], arr[min]] = [arr[min], arr[i]]
        console.log(arr)
    }
    return arr
}

exports.selectionSort = selectionSort