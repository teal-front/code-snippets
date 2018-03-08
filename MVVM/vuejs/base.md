## Vuejs
1. 虚拟DOM，用Js对象来创建虚拟DOM，操作虚拟DOM比实际DOM要快。更快的比较数据变化，更小改变实际DOM的改变。
> https://segmentfault.com/a/1190000008291645

diff算法：DFS(深度优先搜索)，https://foio.github.io/virtual-dom/
 
2. `Object.freeze`可用于中断数据双向绑定
3. Vue会高效复用元素，所以有时重新渲染时，元素标签相同而没有重新渲染，使得保留了之前的值，比如input标签，这时可以在元素上添加不同的[key=$uuid]属性来强制重新渲染. https://cn.vuejs.org/v2/guide/conditional.html#%E7%94%A8-key-%E7%AE%A1%E7%90%86%E5%8F%AF%E5%A4%8D%E7%94%A8%E7%9A%84%E5%85%83%E7%B4%A0

### 模板
1. {{}} 里面可以写单个表达式，不支持语句
### 指令 (v-*)
1. v-for
2. v-if
3. v-html="html",在标签内输出没有转义的HTML
4. v-once,使元素的所有数据只绑定一次
5. v-model, 用于表单元素的绑定,绑定表单元素的value值，相当于v-bind:value
6. v-text=html, 相当于{{ html }}

6. v-on:$eventType=$eventName, 也写作`@$eventType`
7. v-bind:$prop，也写作`:$prop`
#### 修饰符
v-on:$eventType.$modifies,.prevent 修饰符告诉 v-on 指令对于触发的事件调用 event.preventDefault()
#### Class & Style
Vue的指令对class&style作了额外的支持
1. v-bind:class="{active: $active, 'has-error': $hasError}"
2. v-bind:class="classObj", 对应$app.classObj
3. v-bind:class="['active', 'has-error']
4. v-bind:style="styleObj", 对应$app.styleObj
5. v-bind:style="{color: red, fontSize: 18px}"


```html
<div id="app">
    <span>{{message}}</span>
    <span>{{reversedMessage}}</span>
</div>

<script >
new Vue({
    el: '#app',
    data: {
        message: '',
    },
    // 动态属性
    computed: {
        // 属性Getter，如果message改变了，那reversedMessage值也会改变
        // 这里的值会缓存，通过下面的methods定义的函数，不会被缓存，故推荐使用computed方式
        reversedMessage: function () {
            return this.message.split('').reverse().join('')
        }  
    },
    methods: {
        //  // `this` 指向 vm 实例
        $eventName: () => {
            this.message = ''
        }
    }
})
</script>
```

### 实例属性与方法
```js
let app = new Vue()
app.$data.message === app.message
app.$el === document.getElementById('el')
app.$watch('message', (newValue, oldValue) => {
})
app.$mount($el) // bind el element
``` 

### 生命周期钩子
```js
new Vue({
    created: function () {
        this.$el
        this.$watch('prop', function () {
               
        })
    },
    mounted: function () {},
    updated: function () {
        
    },
    destroyed: function () {
        
    }
})
```

### 计算属性
1. watch vs. computed
2. computed: set & get
```js
new Vue({
    data: {
        firstName: '',
        lastName: '',
        fullName: ''
    },
    watch: {
        full: {
            // deep watch
            deep: true,
            handler(val, oldVal) {
                
            }
        },
        fullName: function (val) {
            this.fullName = this.firstName + val + this.lastName
        }
    },
    computed: {
        // get
        fullName: function () {
            return this.firstName + this.lastName
        },
        // get & set
        fullName: {
            get: function () {
                return this.firstName + this.lastName
            },
            set: function (val) {
                let names = val.split(" ")
                this.firstName = names[0]
                this.lastName = names[1]
            }
        }
    }
})
```

### 组件
1. 与自定义元素类似，但是可以传入props数据，与父元素解耦
2. JS运行完后，是看不到Vue里的自定义元素的,
**但是组件上定义的class会与template上的合并**
3. is的使用，在特殊的标签里面，比如table，ul
```html
<!-- 这样使用时，由于浏览器不支持table里的x-item，所以一开始不会把x-item解析出来 -->
<table>
    <x-item></x-item>
</table>

<table>
    <tr is="x-item"></tr>
</table>
```
4. 组件组合，prop & event emit
> Web Component: https://css-tricks.com/modular-future-web-components/
```html
<todo-list
    v-for="item in cates"
    :todo="item"
    :key="item.id"
>
</todo-list>

<script >
Vue.component('todo-list', {
    props: [item],
    data: function () {
          
    },
    template: '<li v-bind:key="item.id">{{item.value}}</li>'
})
new Vue({
    data: {
        cates: [
            {id: 1, value: 'abc'},
            {id: 2, value: 'def'},
            {id: 3, value: 'jui'},
        ]
    }
})
</script>
```

### log
1. vuejs template用来当作空白标签
2. <element ref="profile" /> app.$refs.profile => element组件
3. this.$emit
4. this.$nextTick 下一次dom render之后触发,可以是vue全局，也可以是组件级别的