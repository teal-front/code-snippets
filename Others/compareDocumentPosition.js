/**
 * 比较两个元素在文档中的位置关系
 * from: jQuery1.10.2-sizzle: sortOrder
 *@{return} 0: equal, -1: a prev b, 1: a after b
 */
function compareDocumentPosition (a, b) {	
	//the nodes are identical, we can exit early
	if (a === b) {
		return 0;
	}
	
	if (document.compareDocumentPosition) { //
		if (!a.compareDocumentPosition || !b.compareDocumentPosition) { //没看懂
			return a.compareDocumentPosition ? -1 : 1;
		}
		return a.compareDocumentPosition(b) & 4 ？ -1 ： 1;
		
	} else if (a.sourceIndex && b.sourceIndex) { // IE6-8
		return a.sourceIndex - b.sourceIndex;
	}
	//比较祖先元素的文档位置
	else {		
		//if (!a.parentNode || !b.parentNode) return false; //a or b isn't in document
		var aup = a.parentNode,
			bup = b.parentNode,
			ap = [a], //储存a的祖先元素,包括a. FILO： first in last out,最顶层的祖先元素的index最小
			bp = [b], //储存b的祖先元素,包括b
			cur;
		if (!aup ) { //a不在文档中或a是document
			return -1;
		} else if (!bup) { //b不在文档中或b是document
			return 1;
		} else if (aup === bup) { //a与b是兄弟元素，直接比较a跟b
			return siblingCheck(a, b);
		}
		
		cur = a;
		while ((cur = cur.parentNode)) {
			ap.unshift(cur);
		}
		cur = b;
		while ((cur = cur.parentNode)) {
			bp.unshift(cur);
		}
		//jQuery v1.10.2
		while (ap[i] === bp[i]) {
			i++;
		}
		return siblingCheck(ap[i], bp[i]); //与v1.10.2中不一样
		/**jQuery v1.7.2
		var al = ap.length, bl = bp.length;
		for (var i = 0; i < al && i < bl; i++) {
			if (ap[i] !== bp[i]) { //如果祖先元素ap[i]与bp[i]不是同一个元素，那它们必然是兄弟元素，通过比较祖先元素位置来确定a b的位置
				return siblingCheck(ap[i], bp[i]);
			}
		}
		//如果比较a与b的祖先元素比较不出来，比如a: [html, body, div] & b:[html, body],那到body就停止了
		if (i === al) { //a的文档深度较浅
			return siblingCheck(a, bp[i], -1);
		} else { //b的文档深度较浅，此时就是比较ap[2]与b
			return siblingCheck(ap[i], b, 1);
		}*/
	}
}
//比较两个兄弟元素的位置关系
function siblingCheck (a, b, ret) {
	var next;
	if (a === b) return ret;
	while ( (next = a.nextSibling)) {
		if ( b ===next) {
			return -1;
		}
	}
	return 1;
}
