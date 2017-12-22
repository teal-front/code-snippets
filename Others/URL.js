//addParam
function addParam(name,value,url) {
	url+=url.indexOf("?")==-1?"?":"&";
	url+=encodeURIComponent(name)+"="+encodeURIComponent(value);
	return url;
}

//http://designer.gaitu.cn/TaskHall.aspx
//从href提取value
function splitUrl(_href, _name) {
	if (_href.indexOf(_name + '=') > 0) {
		var _pram = _href.split(_name + '=');
		if (_pram[1] != "") {    //_pram[1]有可能是0，所以这里没有直接if(_parm[1])
			return decodeURIComponent(_pram[1].split('&')[0]);
		} else {
			return null;
		}
	} else {
		return null;
	}
}

//返回get名值对象
function urlArgs() { //The Definitive Guide V6 #344
	var args={};
	var query=location.search.slice(1);
	var pairs=query.split("&");
	for(var i=0;i<pairs.length;i++) {
		var pos=pairs[i].indexOf("=");
		if(pos==-1) { continue; }
		var name=pairs[i].slice(0,pos);
		var value=pairs[i].slice(pos+1);
		value=decodeURIComponent(value); //解码
		args[name]=value;
	}
	return args;
}
