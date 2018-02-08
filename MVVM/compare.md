> https://cn.vuejs.org/v2/guide/comparison.html


### vue vs. react
1. vue支持IE9+,react IE?
2. react使用`JSX`，一切都是 JavaScript，把css、html放在js里面书写，与开发人员习惯不大一样。vue倾向于使用模板，html/css/js单独存放

更抽象一点来看，我们可以把组件区分为两类：一类是偏视图表现的 (presentational)，一类则是偏逻辑的 (logical)。我们推荐在前者中使用模板，在后者中使用 JSX 或渲染函数。这两类组件的比例会根据应用类型的不同有所变化，但整体来说我们发现表现类的组件远远多于逻辑类组件。

3. 两个都是采用virtual dom
4. React 的生态系统相比 Vue 更加繁荣
5. react的状态管理redux
6. react原生渲染，React Native 能使你用相同的组件模型编写有本地渲染能力的 APP (iOS 和 Android)

### angularjs
1. angularJS使用Typescript，有学习、技术迁移成本