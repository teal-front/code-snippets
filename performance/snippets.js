'use strict'

// memoize
function memoize (fn, cache) {
    cache = cache || {}

    return function (arg) {
        if (cache.hasOwnProperty(arg)) {
            cache[arg] = fn(arg)
        }
        return cache[arg]
    }
}