'use strict'

/// 柯里化(curry)
// 把函数当作参数，返回另外一个函数
function curry(fn, params) {
    let slice = Array.prototype.slice
    let args = slice.call(params)

    return function () {
        return fn.apply(null, args.concat(slice.call(arguments)))
    }
}

/**
 * 记忆(memorize)
 * @param {function} fn
 * @param {function} hasher 用于生成cache的key值，因为缓存对象的key值得是字符串
 * @returns function
 */
function memorize(fn, hasher, initObj = {}) {
    let memorize = function (key) {
        let address = '' + (hasher ? hasher.apply(this, arguments) : key)
        let cache = memorize.cache
        if (!cache.hasOwnProperty(address)) {
            cache[address] = fn.apply(this, arguments)
        }
        return cache[address]
    }
    memorize.cache = initObj
    return memorize
}

/// region throttle & debounce & requestAnimateRequest
// 操作演示：https://css-tricks.com/the-difference-between-throttling-and-debouncing/

/// 节流(throttle)
// 一段时间内限制函数!!至多调用一次!!
// `requestAnimationFrame`，浏览器内置的节流工具(https://jinlong.github.io/2016/04/24/Debouncing-and-Throttling-Explained-Through-Examples/)

function throttle (fn, wait) {
    let timeout, context, args, result;
    let previous = 0;

    var later = function() {
        previous = 0;
        timeout = null;
        result = func.apply(context, args);
        if (!timeout) context = args = null;
    };

    var throttled = function() {
        var now = Date.now();
        if (!previous) previous = now;
        var remaining = wait - (now - previous);
        context = this;
        args = arguments;

        if (remaining <= 0) {
            if (timeout) {
                clearTimeout(timeout);
                timeout = null;
            }
            previous = now;
            result = func.apply(context, args);
            if (!timeout) context = args = null;
        } else if (!timeout) {
            timeout = setTimeout(later, remaining);
        }
        return result
    };

    throttled.cancel = function() {
        clearTimeout(timeout);
        previous = 0;
        timeout = context = args = null;
    };

    return throttled;
}


/**
 * 函数防抖动debounce
 * 一定时间间隔内，函数没有被调用，则执行
 * 场景：对用户输入的结果进行ajax请求、page resize、drag
 * underscore@1.8.3版本函数中，实现了调用时立即执行的参数`immediate`
 *
 * ！！触发时机由调用方决定
 *
 * @param fn
 * @param delay        时间段内只允许调用一次
 * @returns {Function}
 */
function debounce(fn, delay = 50) {
    let timer = null
    let debounced = function () {
        let context = this, args = arguments

        clearTimeout(timer)
        timer = setTimeout(function () {
            fn.apply(context, args)
        }, delay)
    }
    debounced.cancel = function () {
        clearTimeout(timer)
        timer = null
    }

    return debounced
}
/**
 * 增加mustRunTime参数，有些场景需要调用下，不然函数一直不执行。比如拖动元素时，一下子到另一个点，没有中间状态
 * 增加了mustRunTime的版本，可能减少了内存回收的次数，因为没有频繁的创建定时器
 *
 * @param mustRunTime  时间段内必须调用一次()
 */
function debouncePlus(fn, delay = 50, mustRunTime) {
    let timer = null
    let lastInvokeTimeStamp

    return function () {
        let args = arguments
        let context = this

        clearTimeout(timer)

        lastInvokeTimeStamp = lastInvokeTimeStamp || +new Date()
        let now = +new Date()
        if (now - lastInvokeTimeStamp >= mustRunTime) {
            fn.apply(context, args)
            lastInvokeTimeStamp = now
        } else {
            timer = setTimeout(function () {
                fn.apply(context, args)
            }, delay)
        }
    }
}
/// endregion