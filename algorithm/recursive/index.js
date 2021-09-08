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
  if (target instanceof RegExp) {
    const newTarget = new RegExp(target.source, target.flags)
    newTarget.lastIndex = target.lastIndex
    return newTarget
  }
  if (target instanceof Date) return new Date(target.getTime())
  if (typeof target !== 'object') return new Ctor(target)
  if (map.has(target)) return map.get(target)
  if (Array.isArray(target)) return target.map(item => clone(item, map))

  // const cloneTarget = new Ctor()
  const cloneTarget = Object.create(Object.getPrototypeOf(target))
  // 实现了对象引用自身，在cloneTarget返回之前就赋值
  map.set(target, cloneTarget);
  return Object.getOwnPropertyNames(target).reduce((o, p)=> {
    Object.defineProperty(o, p, Object.getOwnPropertyDescriptor(o, p))
    o[p] = clone(target[p], map)
    return o
  }, cloneTarget)
}

let clone1 = clone(target)
console.log(clone1)
