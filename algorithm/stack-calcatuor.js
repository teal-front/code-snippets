/** pesudo-code
 * from: http://wuzhiwei.net/ds_app_stack/
	//分配两个栈，ops为运算符栈，nums为数字栈
ops = new Stack, nums = new Stack
//从表达式中读取字符 直至结束
while read c in expression != EOF:
    //若为左括号，入运算符栈
    if c is '(':
        ops.push(c)
    //若为数字，入数字栈
    else if c is a number:
        nums.push(c)
    //若为操作符
    else if c is an operator:
        //若运算符栈的栈顶元素比c的优先级高或一样高，则进行单次运算
        while ops.top() is equal or precedence over c:
            op = ops.pop()
            opn2 = nums.pop()
            opn1 = nums.pop()
            //进行单次运算，并把运算数入数字栈
            nums.push( cal(op,opn1,opn2) )
    //若为右括号
    else if c is ')':
        //除非栈顶元素为左括号，否则运算符栈出栈并将计算结果入数字栈
        op = ops.pop()
        while op != '(':
            opn2 = nums.pop()
            opn1 = nums.pop()
            nums.push( cal(op,opn1,opn2) )
            op = ops.pop()
//返回数字栈的栈顶元素
return nums.top()
*/

var prioty = {
    "+": 1,
        "-": 1,
        "%": 2,
        "*": 2,
        "/": 2,
        "^": 3,
        "(": 0,
        ")": 0,
        "`": -1,
};

function doop(op, opn1, opn2) {
    switch (op) {
        case "+":
            return opn1 + opn2;
        case "-":
            return opn1 - opn2;
        case "*":
            return opn1 * opn2;
        case "/":
            return opn1 / opn2;
        case "%":
            return opn1 % opn2;
        case "^":
            return Math.pow(opn1, opn2);
        default:
            return 0;
    }
}

function opcomp(a, b) {
    return prioty[a] - prioty[b];
}

function calInfixExpression(exp) {
    var cs = [];
    var ns = [];
    var exp = exp.replace(/\s/g, "");
    exp += '`';
    if (exp[0] === '-') {
        exp = "0" + exp;
    }
    var c;
    var op;
    var opn1;
    var opn2;
    for (var i = 0; i < exp.length; ++i) {
        c = exp[i];
        if (c in prioty) {
            //op
            while (c != '(' && cs.length && opcomp(cs[cs.length - 1], c) >= 0) {
                op = cs.pop();
                if (op != '(' && op != ')') {
                    opn2 = ns.pop();
                    opn1 = ns.pop();
                    ns.push(doop(op, opn1, opn2));
                }
            }
            if (c != ')') cs.push(c);
        } else {
            while (!(exp[i] in prioty)) {
                i++;
                c += exp[i];
            }
            ns.push(parseFloat(c));
            i--;
        }
    }
    return ns.length ? ns[0] : NaN;
}

$('#result').html(calInfixExpression($("#exp").val()));


/**
 * Plan B: from jsbin.com
 */
var oInput = $("#statement"),
    oResult = $("#result");

oInput.addEventListener("keyup", function (e) {
    if (e.which === 13) {
        oResult.value = calc(this.value);
    }
},false);

function calc (expression) {
    var ex = expression.replace(/\s+/g);
    ex += "`";
    var op = [], //operates
        num = []; //numbers
    var i = 0,
        c,
        l = ex.length;

    for (; i < l; i++) {
        c = ex[i];
        if (c in calc.priority) {
            while (c !== '(' && op.length && calc.comparePri(op[op.length -1], c)) {
                var newop = op.pop();
                if (newop !== "(" && newop !== ")") {
                    num1 = num.pop(),
                        num2 = num.pop();
                    num.push(calc.exec(newop, num2, num1));
                    console.log("result: ", num);
                }
            }

            if (c !== ")") op.push(c);
            console.log("op: ", op);
        } else {
            while (!(ex[i] in calc.priority)) {
                i++;
                c += ex[i];
            }
            num.push(parseFloat(c, 10));
            console.log("num: ", num);
            i--;
        }
    }

    return num.length ? num[0] : NaN;
}
calc.priority = {
    "-" : 1,
    "+": 1,
    "*": 2,
    "/": 2,
    "^": 2,
    "(": 0,
    ")": 0,

    "`": -1
};
calc.comparePri = function (op1, op2) {// op1 >= op2 => true
    return this.priority[op1] - this.priority[op2] >= 0;
};
calc.exec = function (op, num1, num2) {
    switch (op) {
        case "-": return num1 - num2;
        case "+": return num1 + num2;
        case "/": return num2 / num2;
        case "*": return num1 * num2;
        case "^": return Math.pow(num1, num2);
        default: return NaN;
    }
};


//--------  helpers  -----------
function $ (selector) {
    return document.querySelector(selector);
}