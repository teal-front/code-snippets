// bfs
function flatter (arr) {
    let ret = []
    let tmp = arr.slice()

    while(tmp.length) {
        let first = tmp.shift()
        if (Array.isArray(first)) {
            tmp = first.concat(tmp)
        } else {
            ret.push(first)
        }
    }
    return ret
}

let arr = [3, 4, [3, 3, [-1], 4, [[3]]]]
console.log(flatter(arr))