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
var alphaList = ['A', 'B'];
// expolit 20171025
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

// finalLists: [{key: 'A', values: []}]
let finalLists = [];
alphaList.forEach(alpha => {
    finalLists.push({
    key: alpha,
    values: lists[alpha],
})
});