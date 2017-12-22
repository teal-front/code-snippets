/*
	http://www.cnblogs.com/rubylouvre/archive/2009/07/24/1529640.html
*/
//查找一网页中5007个类名为“cell”的元素，IE8历时1828 ~ 1844毫秒，
//IE6为125 ~ 172毫秒，IE8为93 ~ 94毫秒，FF3.5为0~1毫秒，opera10为0毫秒，Chrome为1毫秒，
//safari4为0毫秒

//单个CLASS查找
var getElementsByClassName = function(searchClass,node,tag) {
    if(document.getElementsByClassName){
        return  document.getElementsByClassName(searchClass)
    }else{    
		node = node || document;
        tag = tag || '*';
        var returnElements = []
        var els =  (tag === "*" && node.all)? node.all : node.getElementsByTagName(tag);//兼容IE5
        var i = els.length;
        searchClass = searchClass.replace(/\-/g, "\\-");
        var pattern = new RegExp("(^|\\s)"+searchClass+"(\\s|$)");
        while(--i >= 0){
            if (pattern.test(els[i].className) ) {
                returnElements.push(els[i]);
            }
        }
        return returnElements;
    }
}

//多个CLASS查找
var getElementsByClassName = function (searchClass, node,tag) {
  if(document.getElementsByClassName){
    var nodes =  (node || document).getElementsByClassName(searchClass),result = [];
      for(var i=0 ;node = nodes[i++];){
        if(tag !== "*" && node.tagName === tag.toUpperCase()){
          result.push(node)
        }else{
          result.push(node)
        }
      }
      return result
    }else{
      node = node || document;
      tag = tag || "*";
      var classes = searchClass.split(" "),
      elements = (tag === "*" && node.all)? node.all : node.getElementsByTagName(tag),
      patterns = [],
      current,
      match;
      var i = classes.length;
      while(--i >= 0){
        patterns.push(new RegExp("(^|\\s)" + classes[i] + "(\\s|$)"));
      }
      var j = elements.length;
      while(--j >= 0){
        current = elements[j];
        match = false;
        for(var k=0, kl=patterns.length; k<kl; k++){
          match = patterns[k].test(current.className);
          if (!match)  break;
        }
        if (match)  result.push(current);
      }
      return result;
    }
}
```