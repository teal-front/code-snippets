//获取元素内Element元素个数
function countTags(element) {
	var numTags = 0;
	if(element.nodeType == 1) numTags++;
	var children = element.childNodes;
	for(var i = 0; i < children.length; i++) {
		numTags += countTag(children[i]);
	}
	return numTags;
}
//获取元素内Text节点内容
function getText(element) {
	var strings=[];
	getStrings(element,strings);
	return strings.join("");
	
	function getStrings(element,strings) {
		if(element.nodeType==3) strings.push(element.data);
		else if(element.nodeType==1) {
			for(var m=element.firstChild;m!=null;m=m.nextSibling) {
				getStrings(m,strings);
			}
		}
	}
}

/* 检查元素a是否包含元素b 
 * http://ejohn.org/blog/comparing-document-position/
 * https://developer.mozilla.org/zh-CN/docs/Web/API/Node.compareDocumentPosition
 */
function contains(a, b){
  return a.contains ?
    a != b && a.contains(b) :
    !!(a.compareDocumentPosition(b) & 16);
}

/**
 * -------------------------------------------------------------
 * 元素尺寸
 * -------------------------------------------------------------
 */

/**
 *获取窗口的滚动条高度scrollTop
 *p.s. chrome下document.documentElement.scrollTop总为0
 */
var getWinScrollTop = function () {
	return window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
};
