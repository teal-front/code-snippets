/**
 * 去除数组中重复的
 */

// method one
const uniqueArr1 = function (arr) {
    let map = {},
        ret = [];

    for (let i of arr) {
        let key = (typeof i) + i;

        if (!map[key]) {
            map[key] = 1;
            ret.push(i);
        }
    }
    return ret;
};

// method two
// 返回的数组是排序之后的
const uniqueArr2 = function (arr) {
    let hasDuplicate = false;
    let list = arr.concat().sort(function (a, b) {
        if (a === b) {
            hasDuplicate = true;
            return 0;
        }

        return a < b ? 1 : -1;
    });

    if (hasDuplicate) {
        // 内部去重
        for (let i = 1; i < list.length; i++) {
            if (list[i] === list[i - 1]) {
                list.splice(i--, 1);
            }
        }
    }

    return list;
};

const uniqueArr3 = function (arr) {
    return arr.reduce((ret, cur) => {
        if (!ret.includes(cur)) {
            ret.push(cur)
        }
        return ret
    }, [])
};

// 复杂度高o(n^2)
const uniqueArr4 = function (arr) {
    let ret = [];

    for (let i of arr) {
        let hasDup = false;

        for (let j of ret) {
            if (i === j) {
                hasDup = true;
                break;
            }
        }
        if (!hasDup) {
            ret.push(i);
        }
    }

    return ret;
};

module.exports = {uniqueArr1, uniqueArr2, uniqueArr3, uniqueArr4}