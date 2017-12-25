'use strict'

/// region define class
// 1. prototype(pseudoClass)
let O = function (name) {
    this.name = name
}
O.prototype = {
    constructor: O,
    getName() {
        return this.name
    }
}

let o = function () {
}
o.prototype = new O()

// 2. Object.create()
let p = {
    name: 'teal',
    get() {
        return this.name
    }
}
let intanceCase = Object.create(p)

if (typeof Object.create !== 'function') {
    Object.create = function (o) {
        let F = function () {
        }
        F.prototype = o
        return new F()
    }
}

// 3. 单体
let createNew = (spec) => {
    let age = spec.age || 1; //  private property

    let single = {};
    single.getAge = () => age;

    return single;
}
let man = createNew({age: 2})
/// endregion

/// region prototype
// constructor, 指向构造函数
// 大部分对象的constructor都可以被改写，所以不可信。除了1、't', true等的constructor为只读的原生构造函数,
// 详情见 https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/constructor
function A (){}
A.prototype.constructor = B;
(new A()).constructor // => A


// private property/method

/// endregion