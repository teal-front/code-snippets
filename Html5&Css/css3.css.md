## Links
> https://css-tricks.com

### box-sizing
```css
/* height&weight not contain border width*/
-moz-box-sizing: border-box;
-webkit-box-sizing: border-box;
box-sizing: border-box;
```

### transform
```css
/* 居中 */
.vertical-middle {
    position: relative;
    top: 50%;
    transform: translateY(-50%);  /*相对于元素自身的50%*/
}
```

### floxbox
```css
display: flex
justify-content: space-between;
flex-flow: row wrap;  // 多行时，每行都居中
> div {
    margin: auto; // 保持居中
    
}

/*居中的方法之一；*/
display:-webkit-box;
-webkit-box-align: center;
-webkit-box-pack: center;
```

### background
```css
background-size: 23px;
```

### Text
```css
// 在第二行处加省略号
display: -webkit-line-box;
-webkit-box-orient: vertical;
-webkit-line-clamp: 2;
text-overflow: ellipsis; 
word-break: break-all;
```
### calc()
```css
# +/-/\*/- 两边要有空格
height: 100%;
height: -webkit-calc(100% - .44rem);
height: calc(100% - .44rem);
```

### border-radius
```css
.css3 {
    /*---border-radius----*/
-moz-border-radius: 3px;
-webkit-border-radius: 3px;
border-radius: 3px;	
border-radius: 100%; /* 100%! */
	/*左上角圆角，moz的与众不同*/
	-webkit-border-top-left-radius: 5px;
	-webkit-border-top-right-radius: 5px;
	-moz-border-radius-topleft: 5px;
	-moz-border-radius-topright: 5px;
	border-top-left-radius: 5px;
	border-top-right-radius: 5px;
```

### transtion
```css
/*----transtion------*/
-moz-transition: border .2s linear, box-shadow .2s linear;
-webkit-transition: border .2s linear, -webkit-box-shadow .2s linear;

/*-----box-shadow----*/	
-moz-box-shadow: 0 0 3px #80bfff, 0 1px 2px rgba(0, 0, 0, .15) inset;
-webkit-box-shadow: 0 0 3px #80bfff, 0 1px 2px rgba(0, 0, 0, .15) inset;
box-shadow: 0 0 3px #80bfff, 0 1px 2px rgba(0, 0, 0, .15) inset;
	/*---未加inset的----*/
	-webkit-box-shadow: 0 1px 0 rgba(0, 0, 0, 0.25);
	-moz-box-shadow: 0 1px 0 rgba(0, 0, 0, 0.25);
	box-shadow: 0 1px 0 rgba(0, 0, 0, 0.25);


/*----gradient------*/	
background: #066ECD;/*后备代码*/
background:-moz-linear-gradient(top, #A8CCEC 0%, #4993D7 2%, #066ECD 100%); /* FF3.6+ */
background:-webkit-gradient(linear, left top, left bottom, color-stop(0%,#A8CCEC), color-stop(2%,#4993D7), color-stop(100%,#066ECD)); /* Chrome,Safari4+ */
background:-webkit-linear-gradient(top, #A8CCEC 0%, #4993D7 2%,#066ECD 100%); /* Chrome10+,Safari5.1+ */
background:-o-linear-gradient(top, #A8CCEC 0%, #4993D7 2%,#066ECD 100%); /* Opera11.10+ */
background:-ms-linear-gradient(top, #A8CCEC 0%, #4993D7 2%,#066ECD 100%); /* IE10+ */
background:linear-gradient(top, #A8CCEC 0%, #4993D7 2%,#066ECD 100%); /* W3C */	
filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#4993D7', endColorstr='#066ECD');
-ms-filter: "progid:DXImageTransform.Microsoft.gradient(startColorstr='#4993D7', endColorstr='#066ECD')";
}

```