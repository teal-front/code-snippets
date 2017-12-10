!function () {
//     let arr = [1, 11, 1, 1, 1, 23, 23, 0];
    let arr = [1, 1, 1, '1'];

    // method one
    const uniqueArr1 = function (arr) {
        let map = {},
            ret = [];

        for(let i of arr) {
            let key = (typeof i) + i;

            if (!map[key]) {
                map[key] = 1;
                ret.push(i);
            }
        }
        return ret;
    };

    // method two
    const uniqueArr2 = function (arr) {
        let hasDuplicate = false;
        let list = arr.concat().sort(function (a, b) {
            if (a === b) {
                hasDuplicate = true;
                return 0;
            }

            return a > b ? 1 : -1;
        });

        if (hasDuplicate) {
            // 内部去重
            let ret = [];
            for (var i = 1; i < list.length; i++) {
                if (list[i] === list[i - 1]) {
                    list.splice(i--, 1);
                }
            }
            // 外部去重
            let ret = [list[0]];
            for(var i = 1, l = list.length; i < l; i++) {
                if (ret[ret.length - 1] !== list[i]) {
                    ret.push(list[i]);
                }
            }
        }

        return list;
    };

    const uniqueArr3 = function (arr) {
        let ret = [];

        for (let i of arr) {
            if (!ret.includes(i)) {
                ret.push(i);
            }
        }

        return ret;
    };

    // 复杂度高o(n^2)
    const uniqueArr4 = function (arr) {
        let ret = [];

        for (let i = 0, l = arr.length; i < l; i++) {
            let noop = false;

            for (let j = 0, ll = ret.length; j < ll; j++) {
                if (arr[i] === ret[j]) {
                    noop = true;
                    break;
                }
            }
            if (!noop) {
                ret.push(arr[i]);
            }
        }

        return ret;
    };

    console.log(uniqueArr1(arr));
    console.log(uniqueArr2(arr));
    console.log(uniqueArr3(arr));
}();