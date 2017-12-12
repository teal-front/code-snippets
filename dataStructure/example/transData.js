/*
 * T面试题(2016.07.23)
 *
 * 把数据格式转换
 */
!function () {
    // 原始数据
    var originData = [
        {
            id: 0
        },
        {
            id: 1,
            pid: 0,
        },
        {
            id:2,
            pid:1
        },
        {
            id: 3,
            pid: 1
        },
        {
            id: 4,
            pid: 2
        }
    ];

    // 最终转换数据
    var resultData = {
        id: 0,
        sub: [{
            id: 1,
            sub: [{
                id: 2,
                pid: 1,
                sub: [{
                    id: 3,
                    pid: 2,
                    sub: [{
                        id: 4,
                        pid: 3
                    }]
                }]
            }]
        }]
    }

    var transData = function (data) {
        var root = data.shift();

        for(var i = 0, l = data.length; i < l; i++) {
            var pid = data[i].pid, startIdx = 0;
            // 变量储存，用单一的对象储存时会覆盖
            // TODO: 这个值可缓存
            var target = [root];

            while(startIdx <= pid) {
                target.push(target[target.length - 1].sub || (target[target.length - 1].sub = {}));
                startIdx++;
            }

            //target.push(data[i]);
            for(var key in data[i]) {
                if (data[i].hasOwnProperty(key)) {
                    target[target.length - 1][key] = data[i][key];
                }
            }
        }

        return root;
    }

    console.log(JSON.stringify(transData(originData)));
    //console.log(transData(data));
}();