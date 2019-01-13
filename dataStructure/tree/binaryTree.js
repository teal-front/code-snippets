/**
 * 二叉树
 * 子节点不超过两个的树
 * 
 * https: //objcer.com/2017/02/26/traverse-the-tree/
 */

/// region 遍历
// 先序 top -> left -> right
function preOrder(node) {
    if (node !== null) {
        console.log('cur node', node.value)
        preOrder(node.left)
        preOrder(node.right)
    }
}

// 中序 left -> top -> right
// 在BST的中序遍历，就是按从小到大顺序
function inOrder(node) {
    if (node !== null) {
        inOrder(node.left)
        console.log('cur node', node.value)
        inOrder(node.right)
    }
}

// 后序 left -> right -> top
function postOrder(node) {
    if (node !== null) {
        postOrder(node.left)
        postOrder(node.right)
        console.log('cur node', node.value)
    }
}


/// endregion