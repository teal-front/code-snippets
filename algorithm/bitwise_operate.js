/**
 * 常用的位操作符
 * from: http://blog.csdn.net/liquanhai/article/details/1759906
 */
// (& | ^,左右的数位置可以互换)
// 1 & 2 == 0;(AND: 1 & 1 => 1)
// 1 | 2 == 3;(OR: 1 | 1 => 1)
// 1 ^ 2 == 3;(XOR: 1 ^ 0 => 1)
// ~1 = 0;(NOT)

/**
 * 按位与在权限系统中的应用
 * 00010 +
 * 00100 +
 * 01000 +
 * 10000 =>
 * 11110
 * from: http://bbs.csdn.net/topics/390214607
 */
//权限值，权限值依次增高
var v1 = 2, //查看 10
    v2 = 4, //新增 100
    v3 = 8, //修改 1000
    v4 = 16; //删除 10000
var s1 = v1 | v2 | v3 | v4; // => 30 11110
var s2 = v1 | v2; // => 6 110
var s3 = v2 | v3; // => 12 1100
if(s1 & v1) {console.log("可以查看");} // s1 & v1 要么为v1要么为0
if(s2 & v2) {console.log("可以新增");}
if(s3 & v3) {console.log("可以修改");}

/**
 * 按位或
 * from: http://help.adobe.com/zh_CN/AS2LCR/Flash_10.0/help.html?content=00000132.html
 */
var func = function (flag) {
    //do flag thing
};
func(flag= (flag1 | flag2));// do flag1 and flag2 the same time

// 1 + 2 = 3;
// 1 | 2 = 3; // 3 & 2 == 2  3 & 1 == 1
// 01
// 10 =>
// 11
//
// 2 + 16 = 18;
// 2 | 16 = 18;
// 00010
// 10000=>
// 10010