let nodes = [
  {
    name: '一',
    id:1,
    childs: [
      {
        name: '一一',
        id: 11,
        pid: 1,
        childs: [
          {
            name: '一一一',
            id: 111,
            pid: 11,
          }
        ]
      },
      {
        name: '一二',
        id: 12,
        pid: 1,
        childs: [
          {
            name: '一二一',
            id: 121,
            pid: 12,
          }
        ]
      }
    ]
  },
  {
    name: '二',
    id: 2,
    childs: [
      {
        name: '二一',
        id: 21,
        pid: 2,
        childs: [
          {
            name: '二一一',
            id: 211,
            pid: 21
          }
        ]
      }
    ]
  }
]

/**
 * 给node添加深度属性
 * @param {array} nodes 
 * @param {number} initialDeep 
 */
function markDeep(nodes, initialDeep = 0) {
  for(let node of nodes) {
    let deep = initialDeep
    node.deep = deep
    markDeep(node.childs || [], ++deep)
  }
}

markDeep(nodes)

/**
 * 使节点变成扁平的
 * @param {array} nodes 
 */
function flattenNodes(nodes) {
    let stack = [].concat(nodes), ret = []
    while (stack.length) {
        let node = stack.shift()
        ret.push(node)
        if (node.childs) {
            stack = node.childs.concat(stack)
        }
        delete node.childs
    }
    return ret
}

/**
 * 返回flatNodes指定节点的上一个deep为0的节点
 * @param {array} flatNodes
 * @param {number} t
 * @return {object}
 */
function getPrevPrimaryNode (flatNodes, t) {
    let node = null
    for (let n = flatNodes[t].deep > 0 ? 2 : 1; n--; n > 0)
        do {
            node = flatNodes[--t]
        } while (node && node.deep > 0);
    return t < 0 ? null : node
}

/**
 * 扁平数据，结构化，成为树的结构
 * 
 * 下面的解法用了对象的引用
 * nodes里的每个节点都被父节点引用(除了root node)，操作引用节点，父节点也就改变了
 * @param {array} flatNodes 
 */
function structureNodes(flatNodes) {
    let ret = flatNodes[0],
        reverseNodes = flatNodes.reverse()
    for(let node of reverseNodes) {
        let pid = node.pid
        let target = reverseNodes.find(v => v.id === pid)
        // root node have no pid, so target===undefined
        if (target) {
            target.childs = target.childs || []
            target.childs.push(node)
        }
    }
    return ret
}

let flatNodes = flattenNodes(nodes)
console.log(flatNodes)
console.log(JSON.stringify(structureNodes(flatNodes)))