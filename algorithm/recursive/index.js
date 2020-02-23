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
    if (typeof target === 'object') {
        let cloneTarget = Array.isArray(target) ? [] : {};
        if (map.get(target)) {
            return map.get(target);
        }
        // 实现了对象引用自身，在cloneTarget返回之前就赋值
        map.set(target, cloneTarget);
        for (const key in target) {
            cloneTarget[key] = clone(target[key], map);
        }
        return cloneTarget;
    } else {
        return target;
    }
}

var clone1 = clone(target)

