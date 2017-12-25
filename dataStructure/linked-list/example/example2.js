
let areaData = [{
    "province": "浙江",
    "city": "杭州",
    "name": "西湖"
}, {
    "province": "四川",
    "city": "成都",
    "name": "锦里"
}, {
    "province": "四川",
    "city": "成都",
    "name": "方所"
}, {
    "province": "四川",
    "city": "阿坝",
    "name": "九寨沟"
}]

const transAreaData = function (data, keys) {
    let res = [], hash = {}
    for(let item of data) {
        let arr = res, cur = hash
        for (let j= 0, k = keys.length; j <k ;j++) {
            let key = keys[j], field = item[key]
            if (!cur[field]) {
                let pusher = {
                    value: field,
                }, tmp
                if (j < k-1) {
                    tmp = []
                    pusher.children = tmp
                }
                cur[field] = {$: arr.push(pusher) - 1}
                cur = cur[field]
                arr = tmp
            } else {
                cur = cur[field]
                arr = arr[cur.$].children
            }
        }
    }
    return res
}

let areaOutData = [
    {
        value: '浙江',
        children: [
            {
                value: '杭州',
                children: [
                    '西湖'
                ]
            }
        ]
    },
    {
        value: '四川',
        children: [
            {
                value: '成都',
                children: [
                    '锦里',
                    '方所'
                ]
            },
            {
                value: '阿坝',
                children:[
                    '九寨沟'
                ]
            }
        ]
    }
]
