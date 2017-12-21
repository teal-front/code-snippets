### 检测IE版本css方法
```html
<!DOCTYPE html>
<!--[if IE 6]><html class="ie6"><![endif]-->
<!--[if IE 7]><html class="ie7"><![endif]-->
<!--[if IE 8]><html class="ie8"><![endif]-->
<!--[if IE 9]><html class="ie9"><![endif]-->
<!--[if (gt IE 9)|!(IE)]><!-->
<html class="modern">
<!--<![endif]-->
<head>
	<meta charset="utf-8">
	<title>JQuery</title>
	<style type="text/css">
	body {color:red\9\0/*ie8&9*/;}
	:root body {color:yellow\0;/*ie9*/ /*:root�߼��������֧�֣�IE8��֧��*/}
	* html body{color:blue;/*ie6*/}
	*+html body{color:purple;/*ie7*/}
	
	@-moz-document url-prefix(){
		body { color:lime; }  /*Firefoxר��*/
	}
	</style>
</head>
<body>
asdf
<script type="text/javascript">
//alert(document.documentElement.className);
</script>
</body>
</html>
```