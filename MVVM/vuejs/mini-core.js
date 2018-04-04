/**
 * mini mock of vue.js
 */

class Watcher {
  constructor(cb) {
    Dep.target = this;
  }
  update() {
    console.log("update");
  }
}
class Dep {
  constructor() {
    this.subs = [];
  }
  notify() {
    this.subs.forEach(sub => {
      sub.update();
    });
  }
  add(watcher) {
    this.subs.push(watcher);
  }
}

function observe(data) {
  Object.keys(data).forEach(key => {
    defineReactive(data, key, data[key]);
  });
}
function defineReactive(obj, key, value) {
  let dep = new Dep();
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    // get 是在什么时候添加的
    get() {
      dep.add(Dep.target);
      return value;
    },
    set(newValue) {
      if (newValue === value) {
        return;
      }
      value = newValue;
      dep.notify();
    }
  });
}

class Vue {
  constructor(options) {
    this.$data = options.data;
    observe(this.$data);
    new Watcher();
  }
}

let vm = new Vue({
  data: {
    foo: "baz"
  }
});
vm.$data.foo;
vm.$data.foo = "bar";
