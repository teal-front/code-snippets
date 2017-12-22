//继承对象原型
var o=[1,2,4];
Object.create=function(o){
	var F=function(){};
	F.prototype=o;
	return new F();
};
b=Object.create(o);
b.a=5;
b.b=2;
for(var i in b) {
	console.log(b[i]);	
}


/** 定义类
1. this、prototype
2. Object.create()
*/
var Person = function () {}
var Man = Object.create(Person)
var m = new Man()

if (typeof Object.create !== 'function') {
    Object.create = function (o) {
        var F = function (){}
        F.prototype = o
        return new F()
    }
}

/**
3. 单体
*/
var Person = {
    createNew() {
        var sigle = {};
        var age = 1; //  private property
        sigle.getAget = () => age;
        return sigle;
    }
}
var man = Person.createNew()