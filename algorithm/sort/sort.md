## 各种排序：http://blog.csdn.net/han_xiaoyang/article/details/12163251
#### 插入排序insertion_sort:

### 插入排序：


```javascript
Array.prototype.insertion_sort = function() {
	var i, j;
	var temp;
	for (i = 1; i < this.length; i++) {
		temp = this[i];
		for (j = i - 1; j >= 0 && this[j] > temp; j--)
			this[j + 1] = this[j];
		this[j + 1] = temp;
	}
	return this;
};
```
