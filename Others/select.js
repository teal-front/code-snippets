var selectHandle = {
	init: function (element) {
		this.ele = element;
	},
	add:function(text, value, offset) {
		var newOption=document.createElement("option");
		newOption.value = value;// or newOption.setAttribute('value','6');
		newOption.appendChild(document.createTextNode(text));
		offset = offset || this.ele.options.length -1;
		this.ele.insertBefore(newOption, this.ele.options[offset]);
		//var newOption=new Option('text','value'); ie 6 not support by insertBefore
		//this.ele.add(newOption,0); chrome not support
	},
	remove:function(idx) {
		idx=idx||this.ele.options.length-1;
		this.ele.remove(idx);
	},
	select:function(idx) {
		idx=idx||this.ele.options.length-1;
		this.ele.selectedIndex = idx; //single select
		//this.ele.options[idx].selected = true; multiple-select
	},
	getValue: function (idx) {
		return this.ele.options[idx].value;
	},
	getText: function (idx) {
		return this.ele.options[idx].text;
	}
};