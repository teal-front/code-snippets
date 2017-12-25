
let plainData = {
    h1: {
        parent: 'h0',
        name: 'h1'
    },
    h6: {
        parent: 'h5',
        name: 'h6'
    },
    h4: {
        parent: 'h3',
        name: 'h4'
    },
    h2: {
        parent: 'h1',
        name: 'h2'
    },
    h0: {
        parent: '',
        name: 'h0'
    },
    h5: {
        parent: 'h4',
        name: 'h5'
    },
    h3: {
        parent: 'h2',
        name: 'h3'
    },
}
let outData = {
    h0: {
        parent: '',
        name: 'h1',
        h1: {
            parent: 'h0',
            name: 'h1',
            h2: {
                parent: 'h1',
                name:'h2',
                h3: {
                    //...
                }
            }
        }
    }
}

function transData (data) {
    let ret = {}
    for (let key in data) {
        if (data.hasOwnProperty(key)) {
            let item = data[key]
            if (item.parent === '') {
                ret = item
            } else {
                // linked list  链表
                data[item.parent][key] = item
            }
        }
    }

    return ret
}