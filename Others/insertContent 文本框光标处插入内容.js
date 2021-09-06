//输入框插入内容
jQuery.fn.extend({
    insertContent : function(myValue) {
        var $t = $(this)[0];
        if (document.selection) {
            this.focus();
            var sel = document.selection.createRange();
            sel.text = myValue;
        } else if (typeof $t.selectionStart == 'number') {
            var startPos = $t.selectionStart,
                endPos = $t.selectionEnd,
                value = $t.value,
                scrollTop = $t.scrollTop;
            $t.value = value.slice(0, startPos) + myValue + value.slice(endPos,value.length -1);
            $t.scrollTop = scrollTop;
            $t.selectionStart = $t.selectionEnd = startPos;
        } else {
            this.value += myValue;
        }
        this.focus();
    }
});
