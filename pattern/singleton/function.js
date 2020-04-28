// singleton pattern(单例，不同于单体)
// 避免全局变量的使用，下面利用了闭包
// 避免全局变量冲突，还有一种就是全名空间

export default function singleton(fn) {
    let instance = null
    return function () {
        return instance || 
        (instance = fn.apply(this, arguments))
    }
}


let withMask = singleton(mask)
document.body.onclick = function () {
    let div = withMask() // or
    let div = widhScopeMask()

    div.style.display = 'block'
}

// iife
let withScopeMask = (function () {
    let div
    return function () {
        return div || (div = mask())
    }
})()

function mask() {
    const div = document.createElement('div')
    div.style.cssText = `
        position: fixed;
        top: 0;
        bottom: 0;
        right: 0;
        left: 0;
        width: 100px;
        height: 100px;
        margin: auto;
        background: teal;
    `
    document.body.append(div)
    div.onclick = function (e) {
        div.style.display = 'none'
        e.preventDefault()
        e.stopPropagation()
    }
    return div
}
