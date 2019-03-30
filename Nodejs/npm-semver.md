### npm semver

`1.2.3-alpha.1`的版本是安全的，`package.json`里面的` ^1.2.0``upgrade `后，也不会更新到`alpha/beta/rc`版本
所以用`alpha/beta/rc`版本是 `OK` 的

以下代码片段可以在https://npm.runkit.com/semver上直接运行

```js
semver.satisfies("1.2.3", "^1.2.0");
true;
semver.satisfies("1.2.3-alpha.1", "^1.2.0");
false;
semver.satisfies("1.2.3-rc.1", "^1.2.3");
false;
semver.satisfies("1.2.3-rc.1", "~1.2.3");
false;
semver.satisfies("1.2.3-rc.3", "^1.2.0-rc.1");
false;
// 显式的在版本引用里写rc，就可以匹配到
semver.satisfies("1.2.3-rc.3", "^1.2.3-rc.1");
true;
semver.satisfies("1.2.4", "^1.2.3-rc.1");
true;
```
