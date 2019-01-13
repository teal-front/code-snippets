/**
 * 联系人列表的排序
 */

// input data, 客户列表，已按首字母排好序了
var inputData = [
    {
        'firstSpell': 'A',
        'name': 'adobe'
    },{
        'firstSpell': 'A',
        'name': 'alpha'
    },{
        'firstSpell': 'B',
        'name': 'before'
    }
]
// out data, 按首字母分组
var outData = [
    {
        key: 'A',
        values: [
            {
                'firstSpell': 'A',
                'name': 'adobe'
            },{
                'firstSpell': 'A',
                'name': 'alpha'
            }
        ]
    },{
        key: 'B',
        values: [
            {
                'firstSpell': 'B',
                'name': 'before'
            }
        ]
    }
]
/**
 * 
 * 'A' => unicode 65
 * @param {array} input 
 */
function convert1(input) {
    let charCodeOfA = 'A'.charCodeAt(0),
        c = charCodeOfA
    let ret = Array.apply(null, {length: 26}).map(v => {
        return {
            key: String.fromCharCode(c++),
            values: []
        }
    })
    console.log(ret)
    for (let item of input) {
        let key = item.firstSpell.charCodeAt(0) - charCodeOfA
        ret[key].values.push(item)
    }
    return ret
}

console.log(convert1(inputData))

// expolit 20171025
function convert2 () {
    // ['A', 'B']
    var alphaList = [];
    var lists = {};
    inputData.forEach(item => {
        let firstSpell = item.firstSpell.toUpperCase();
        if (!lists[firstSpell]) {
            // 在这里就合数据了
            alphaList.push(firstSpell);
            lists[firstSpell] = [];
        }
        lists[firstSpell].push(item);
    });
    
    // [{key: 'A', values: []}]
    return alphaList.reduce((ans, alpha) => {
        ans.push({
            key: alpha,
            values: lists[alpha],
        })
        return ans
    }, []);
}