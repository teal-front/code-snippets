"""
    存放学习Python过程中积累的Python的基础用法
    output不一定是语句返回的值，也有可能是相应元素的值
    beginTime: 20150913

    在线学习文档：https://docs.python.org/2/contents.html
"""

"""数字运算"""
25 // 6 #整除，output: 4
25 % 6 #取余，output: 1
3 ** 2 #幂运算，output: 9


"""基础语句"""
print(25) #v3.4.4中print得加括号
x = input("x: ") #把用户的输入值赋值给x，如果输入没有引号，那就是变量
x = raw_input("x: ")  #把用户输入值当字符串给x
import math


"""操作符"""
###字符串，也属于序列
"string1" "sting2" #字符串拼接，output: 'string1string2'
"string1" + "string2" #同上

"""内建序列：字符串、Unicode字符串、buffer对象、xrange对象"""

'''字符串'''
#字符串是不可变的

g = "Hello"
g[-1] #output: 'o'
g[-3:-1] #output: 'll'
g[-3] #output: 'llo'
g[::-1]  #output 'olleH' reverse效果
other_g = g[:] #clone g


"""序列"""
list("teal") #创建序列, output: ['t', 'e', 'a', 'l']

g = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

len(g) #output: 10
min(g) #output: 1
max(g) #output: 10

#分片操作
g[-1] #output: 10
g[-3:-1] #output: [8, 9]
g[-3:] #output: [8, 9, 10]
g[:] #复制序列，output: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
g[0:10:2] #output: [1, 3, 5, 7, 9]   不包括10
g[10:0:-2] #output: [10, 8, 6, 4, 2] 不包括0

[2, 3] + [3, 2] #序列相加，output: [2, 3, 3, 2]
[8] * 5 #序列重复，output: [8, 8, 8, 8, 8]

g[0] = 'h' #元素赋值
del g[0] #删除元素
del g[1:] #删除多个元素
g.append('y') #添加单个元素，output: ['y', 1, 2....]
g.remove(1) #删除序列中第一个匹配的值，output: [2, 3, ...]
g.extend([11, 12, 13]) #添加多个元素，output: [...,9, 10, 11, 12, 13]  g = g + [11] | g[len(g):] = [11]
g.pop()  #删除第一个值，并返回，g: [2, 3, ..] output: 1
g.count(3) #统计3出现的次数
g.index(4) #返回第一个匹配值的索引值
g.insert(5.8) #插入新元素 

cmp(3, 5) #-1
cmp(1, 1) #0
g.sort() #排序
g.sort(cmp)
g.sort(key=len) #按长度排序
g.sort(reverse=True)  #对排序结果倒序
gg = sorted(g) #排序并返回结果
g.reverse() #反着存放 str类型没有这个方法 ''.join(reversed('abc'))
reversed(g)  # 返回reverseiterator object

g.join(", ") #output: 1, 2, 3, ....

g[0:2] = list('teal') #分片赋值，output: ['t', 'e', 'a', 'l', .....]
g[1:1] = list['add'] #插入多个新元素， output: [...., 'a', 'd', 'd', ...]
g[3:7] = []  #删除多个元素


't' in 'teal@app.com' #只能是单个字符串，在不在序列里，output: True
[1] in [[1], [3], [4]] #output: True


"""元组"""
"""不可改变的序列，值用逗号分开，用括号包着"""
tuple([3, 4, 5]) #output: (3, 4, 5)
tuple('teal') #output: ('t', 'e', 'a', 'l')

enumerate(['a', 'b']) #output [(1, 'a'), (2, 'b')]

a, b = [1, 3] # a => 1 b => 3
a, b = '13'   # a => 1 b => 3

x = (1, 3, 4)
x[0:2] #output (1, 3)


"""字符串"""
"""序列的一种"""
str = "section1" + \
		"section2" + \
			"section3"

#字符串格式化
"name's %s" % "teal" #output: name's teal
"%s %s" % ("a", "b") #output: a b
'name\'s %(name)' % {'name': 'teal'} #output: name's teal
#方法
str('10') #output 10
name = "China"
name.find("in", 0, 5) #查找子串，第二三个参数为查找的起始和结束位置output: 2(找不到会返回-1)
name.lower() #output: china
name.replace('a', 'i') #单个替换，output: Chini
['1', '2'].join('#')    ('1', '2').join('#')   ([1, 2].join('#')是不对的) （v2.7.3 版本好像不支持这个方法）
'#'.join(['1', '2'])
name.split(" ") #output: ["C", "h", "i", "n", "a] 同PHP，不能用“”
name.strip()  #去除两侧的空格
name.strip(' *!') #去除两侧的空格!*
from string import maketrans
maketrans('ca', 'kz') #批量替换

("{:02X}" * 3).format(255)


"""字典"""
"""使用映射(mapping)的数据结构"""
item = diet([('name', 'age'), ('teal', 42)]) #output: {'name': 'teal', 'age': 42}
{}.fromkeys(['name', 'age']) #output: {'name': None, 'age': None}

#Method
item.clear() #output: item: {}  会把引用item的对象也清空 
	x = {1: 1} y = x x = {} # y => {1: 1}
	x = {1: 1} y = x x.clear() # y => {}	
item.copy() #浅复制，子对象为引用
from copy import deepcopy
item.deepcopy()
item.get('name') #output: 'teal' 如果key不存在，不会报错，用item['key']就会
item.get('notexistskey', 'defvalue') #output: 'defvalue'
item.has_key('name') #output: True 同'name' in item
item.items() #output: [('name', 'age'), ('teal', 42)]，与diet相反
key, value = item.popitem()
item.iteritems() #output: <directory-interator> object 返回迭代器对象
item.keys() #output: ['name', 'age']
item.values() #output: ['teal', 42]
item.pop('age') #output: 42    item: {'name': 'teal'}
item.popitem() #随机移除item，因为字典是无序的
item.update(otheritem) #用otheritem值覆盖item里的相同的键的值 


"""条件判断"""
x = y = [1, 2, 3]
z = [1, 2, 3]
x == z # True
x is None
x is y # True
x is z # False
x is not z # True

3 < d < 100
assert 0 < age < 100 # 断言，如果age=-1，将抛出错误

names = ['teal', 'moegan']
ages =  [27, 28]
zip(names, ages)  # [('teal', 27), ('moegan', 28)]
dict(zip(names, ages)) # {'teal': 27, 'moegan': 28}

"""函数"""
def func(**name):
    'function demo'
    return name + ":"

"""语句"""
if 'teal' in ['teal', 'yoki']: print 'yes'
if 3 in [3, 4, 5]:
	print 3
elif 4 in [3, 4]:
	print 42
else:
	print 'else'

a = 3 if c < d else 4  # c < d，则返回3，否则4
	
for key, value in [('k', 1)]:
	print key, value
for key, value in d.items():
	print key, value
            
for n in range(0, 99):
	if (n == 9):
		print n
		break
else:
	print 'not invoke break'
	
#列表推导式 有each方法的作用
[x*x for x in range(0, 5)] # => [0, 1, 4, 9, 16, 25]
[x*x for x in range(3) if x % 3 == 0] # => [0, 9]
[x if x % 2 == 0 else x - 2 for x in range(0, 3)]

x = y = xrange(10000);
del x  # 只是删除了x这个名称，没有删除列表
y # xrange(10000)
"""math"""
int('2') #output 2(数字)
float('2') float(2) #output 2.0

hex(255) # output '0xff' 1、返回字符串格式的 2、十六进制的是小写的
pow(2, 3)
abs(-1)
round(1.0 / 2.0)


"""模板"""
from Math import Sqrt

"""正则模板re"""
#https://docs.python.org/2/library/re.html
re.sub
re.split
#https://docs.python.org/2/library/re.html#search-vs-match
re.match('b', 'abc').group()  #output ''  match只匹配开始的字符
re.search('b', 'abc').group() #output 'b'
re.search('^x', 'a\nb\nx\n', re.MULTILINE) #output 'x' re.MULTILINE匹配多行

"""常用函数"""
type(obj) # output type对象 str(type('ad')) => '<type 'str'>'
repr(x)   #把x变为合适的格式, "hello " + repr(1)  => "hello 1"

#https://docs.python.org/2/tutorial/datastructures.html
map(lambda, list)
filter(lambda, list)
