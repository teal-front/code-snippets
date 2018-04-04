let queue = [];
let waiting = false;
class Watcher {
  constructor() {}
  update() {
    queue.push(this);
  }
  run() {}
}
function queueSch() {}

let callbacks = [];
let pending = false;
function nextTick(cb) {
  callbacks.push(cb);
  if (!pending) {
    pending = true;
    setTimeout(flushCallbacks, 0);
  }
}
function flushCallbacks() {
  let copies = callbacks.slice();
  callbacks.length = 0;
  copies.forEach(copy => {
    copy();
  });
  pending = false;
}

let w1 = new Watcher();
let w2 = new Watcher();
w1.update();
w2.update();
