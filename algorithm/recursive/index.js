/// deep copy
var target = {
    field1: 1,
    field2: undefined,
    field3: {
        child: 'child'
    },
    field4: [2, 4, 8],
    field5: /39023\w9/
};
target.target = target;

// 使用weakMap来防止内存溢出
// https://blog.nowcoder.net/n/217d7a3f7b25417793e8546cd4ae9087
// lodash cloneDeep: https://github.com/lodash/lodash/blob/master/.internal/baseClone.js
// 1、null/date/regexp值的处理，对于date是new Date()深复制
// 2、使用子weakMap来存储循环引用
// 3、复制对象的原型链，new target.constructor()
function clone(target, map = new WeakMap()) {
  if (target === null) return null
  const Ctor = target.constructor
  if (target instanceof RegExp || target instanceof Date) return new Ctor(target)
  // if (target instanceof Date) return new Date(target)
  if (typeof target !== 'object') return new Ctor(target)
  if (map.get(target)) return map.get(target)

  const cloneTarget = new Ctor()
  // let cloneTarget = Array.isArray(target) ? [] : {};
  // 实现了对象引用自身，在cloneTarget返回之前就赋值
  map.set(target, cloneTarget);
  Object.keys(target).forEach(key => {
    cloneTarget[key] = clone(target[key], map)
  })
  return cloneTarget;
}

let clone1 = clone(target)
console.log(clone1)
