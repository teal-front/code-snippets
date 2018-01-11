/// 0.5px实现
// 尺寸先放大1倍，再用transform: scale缩小
```html
<div class="wrap">
<div class="scale-border"></div>
</div>
```
```css
.wrap {
    position: relative;
    width:200px;
    height: 100px;
}
.scale-border {
    display:block;
    position: absolute;
    top: -50%;left: -50%;
    right: -50%;bottom: -50%;
    transform: scale(0.5);
    border: 1px solid purple;
}
```