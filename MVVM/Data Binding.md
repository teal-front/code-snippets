### Methods of data binding
1. Object.observe

https://amasad.me/object-observe
```js
var o = {};

Object.observe(o, function(changes) {
  // This callback runs asynchronously and aggregates the changes that happened
  // in the previous execution turn into `changes` param.
  changes.forEach(function(change) {
    console.log(change.type, change.name, change.oldValue);
  });
});

o.foo = 1; // add, 'foo', undefined
o.foo = 2; // update, 'foo', 1
delete o.foo; // delete, 'foo', 2
```

2. wrapper objects (Backbone.Model, Ember.Object)
3. dirty checking (Angular)
4. getters and setters