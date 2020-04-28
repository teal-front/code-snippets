class Mixin {
    // 'a.b.c' 对data=obj.a.b, key = 'c'
    watch(target, key, callback) {
        let segments = key.split('.')
        let observer = target
        let l = segments.length - 1
        for (let i = 0; i < l; i++) {
            let segment = segments[i]
            if (!(segment in observer)) observer[segment] = {}
            observer = observer[segment]
        }
        let val = observer[segments[l]]
        Object.defineProperty(observer, segments[l], {
            configruable: true,
            enumerable: true,
            get() {
                console.log(val)
                return val
            },
            set(newVal) {
                callback(val, newVal)
                val = newVal
            }
        })
    }
}

let mixin = new Mixin()
let data = {
    a: {
        // b: {
        //     c: {}
        // }
    }
}
mixin.watch(data, 'a.b.c', (oldVal, newVal) => {
    console.log(oldVal, newVal)
})
data.a.b.c
data.a.b.c = { o: 3 }


// https://github.com/zhangdaren/miniprogram-to-uniapp/blob/80d7302e88dca59748e76002938392b1400f04e1/src/utils/babelUtil.js#L241
function setData(data, key, callback) {
    let keys = [];
    let val
    keys = key.split('.');
    val = data[keys[0]]
    keys.forEach(function (key2, index) {
        if (index + 1 == keys.length) {
            console.log(data, key2, val);
        } else {
            if (!data[key2]) {
                console.log(data, key2, {});
            }
        }

        data = data[key2];
    });
    callback && callback();
}

setData(data, 'a.b.c', () => {

})