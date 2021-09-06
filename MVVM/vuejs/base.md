## Vuejs

1.  虚拟 DOM，用 Js 对象来创建虚拟 DOM，操作虚拟 DOM 比实际 DOM 要快。更快的比较数据变化，更小改变实际 DOM 的改变。
    > https://segmentfault.com/a/1190000008291645
    > 剖析 Vue.js 内部运行机制: https://juejin.im/book/5a36661851882538e2259c0f
    > 2-way binding: https://juejin.im/entry/589ff26486b599006b3dea9b

diff 算法：DFS(深度优先搜索)，https://foio.github.io/virtual-dom/

2.  `Object.freeze`可用于中断数据双向绑定
3.  Vue 会高效复用元素，所以有时重新渲染时，元素标签相同而没有重新渲染，使得保留了之前的值，比如 input 标签，这时可以在元素上添加不同的[key=$uuid]属性来强制重新渲染. https://cn.vuejs.org/v2/guide/conditional.html#%E7%94%A8-key-%E7%AE%A1%E7%90%86%E5%8F%AF%E5%A4%8D%E7%94%A8%E7%9A%84%E5%85%83%E7%B4%A0