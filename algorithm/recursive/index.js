/// deep copy
var target = {
    field1: 1,
    field2: undefined,
    field3: {
        child: 'child'
    },
    field4: [2, 4, 8]
};
target.target = target;

// 使用weakMap来防止内存溢出
function clone(target, map = new WeakMap()) {
    // typeof null === 'object'
    if (target && typeof target === 'object') {
        let cloneTarget = Array.isArray(target) ? [] : {};
        if (map.get(target)) {
            return map.get(target);
        }
        // 实现了对象引用自身，在cloneTarget返回之前就赋值
        map.set(target, cloneTarget);
        Object.keys(target).forEach(key => {
            cloneTarget[key] = clone(target[key], map)
        })
        return cloneTarget;
    }
    return target;
}

function cloneDeep2(target, map = new WeakMap()) {
    if (!target || typeof target !== 'object') {
        throw new Error('argument error', 'cloneDeep')
    }
    let ans = Array.isArray(target) ? [] : {}
    Object.keys(target).forEach(key => {
        if (target[key] && typeof target[key] === 'object') {
            if (map.has(target)) {
                return map.get(target)
            }
            map.set(target, ans)
            ans[key] = cloneDeep(target[key], map)
        } else {
            ans[key] = target[key]
        }
    })
    console.log(map)
    return target
}

var clone1 = clone(target)

