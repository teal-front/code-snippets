//from: http://wuzhiwei.net/ds_app_stack/
//pesudo-code
/*
//新建一个栈 s
s = new stack()
//读取字符直至读完
while read to c != EOF:
    //如果字符是开放括号 如 '(' '[' '{'等， 入栈
    if c is opening:
        s.push( c )
    //如果字符是结束括号 如 ')' ']' '}'
    else if c is closing:
        //若栈为空或者栈顶元素与开放括号不匹配 则报错
        if s is empty or f s.pop() is not correspond to c:
            return error!
//若最后栈不为空，报错
if s is not empty:
    return error!
//如果没有返回报错，则返回正常
return ok*/

var lifo = function (string) {
    var stack = [], char, i = 0;
    while (char = string[i++]) {
        if (char in lifo.pairs) {
            stack.push(char);
        } else if (char in lifo.closing) {
            if (stack.length == 0 || char !== lifo.pairs[stack.pop()]) {
                return false;
            }
        }
    }
    if (stack.length !== 0) return false;
    return true;
};
lifo.pairs = {
    "(": ")",
    "[": "]",
    "{": "}"
};
lifo.closing = {
    ")": true,
    "]": true,
    "}": true
};

//test
var string1 = "if(a==b) {c = d};";
var string2 = "if (ad=d) {cd(d}";
var string3 = "if (ad=d) {cdd}(";

console.log.apply(console, [string1, string2, string3].map(lifo));