/// region stack
// reference: 《数据结构与算法Javascript描述》
// FIFO，先进先出
class Stack {
    constructor () {
        this.dataStore = []
        this.top = 0
    }
    // 入栈
    push(element) {
        this.dataStore[this.top++] = element
    }
    // 出栈
    pop() {
        return this.dataStore[--this.top]
    }
    // 查看栈顶元素
    peek() {
        return this.dataStore[this.top - 1]
    }
    size() {
        return this.top
    }
}
/// endregion


/// region queue
// make by constructor
class Queue {
    constructor () {
        this.dataStore = []
    }
    // 入队
    enqueue (element) {
        this.dataStore.push(element)
    }
    // 出队
    dequeue () {
        return this.dataStore.shift()
    }
    size () {
        return this.dataStore.length
    }
}
/// endregion