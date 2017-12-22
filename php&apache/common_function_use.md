```php
<?php
/*
 *-----------------------array
 */
list($mobile, $phone)  = array('mobile', 'phone'); // 仅能用于数字索引的数组并假定数字索引从 0 开始。 
//http://php.net/manual/zh/function.array-map.php
//用回调函数处理数组里的每个元素，返回相应的处理结果组成的数组
array array_map(callable $callback, array $array1[, array $...]);
	$array1 = array(1, 3);
	$array2 = array('yesterday', 'today');
	array_map(function ($n, $k) {
		$ret[] = $n;
		$ret[] = $k;
		return $ret;
	}, $array1, $array2);
	array_map(null, $array1, $array2); // array(array(1, 'yesterday'), array(3, 'today'))

//http://php.net/manual/zh/funcn.array-filter.php
//$input本身不改变，需要有接收对象
//如果不提供callback函数，则删除$input中所有等值于FALSE的值
$input = array_filter(array $input [,callable $callback = ""]);
	$result = array_filter([1, 3, 4], function ($i) { return $i; })); // => [1, 3, 4] (把返回的值重新组一个数组，如果只想取其中的值，得$result[0])


//http://php.net/manual/zh/function.array-splice.php
//   __注意$input为引用类型的，不同于上面的array_filter__
//类似于JS中的Array.prototype.splice，从$offset开始，移除后面$length个值，并把$replacement替换上
//不提供$length时，一直删除到末尾；$offset为负值时从末尾开始数起。返回被删掉的数组
array array_splice(array &$input, int $offset, [, int $length = 0 [, mixed $replacement]]);
	$arr1 = $arr = range(0, 4);
	array_push($arr, ['$', 'a']); // => [0, 1, 2, 3, ['$', 'a']]
	array_splice($arr, 3, 0, ['$', 'a']); // $arr => array(0, 1, 2, 3, '$', 'a', 4)
	array_splice($arr1, 3); // $arr => array(0, 1, 2, 3)

array_slice(array $input, int $offset[, int $length]);

array_walk(); // 可用于array跟object
array_walk_recursive(); // 

array array_merge(array $array1[, array $array2]); //合并时以后边的参数为主
	// 如果输入的数组中有相同的字符串键名，则该键名后面的值将覆盖前一个值。然而，如果数组包含数字键名，后面的值将不会覆盖原来的值，而是附加到后面。 
	$array1 = ['one',   'two',          'foo' => 'bar'];
	$array2 = ['three', 'four', 'five', 'foo' => 'baz'];
	array_merge($array1, $array2); // => array('one', 'two', 'foo' => 'baz', 'three', 'four', 'five')
//如果输入的数组中有相同的字符串键名，则这些值会被合并到一个数组中去，这将递归下去，因此如果一个值本身是一个数组，本函数将按照相应的条目把它合并为另一个数组。然而，如果数组具有相同的数组键名，后一个值将不会覆盖原来的值，而是附加到后面。 
array array_merge_recursive  ( array $array1  [, array $...  ] );
//http://stackoverflow.com/questions/2140090/operator-for-array-in-php
array $arr1 + $arr2; //合并时以+左边的为主
	$array1 + $array2; //=> array('one', 'two', 'foo' => 'bar', 'five');

//遍历数组
$arr = array(1, 3, 4, 7);
foreach ($arr as  & $key => $value) {}

//each取数组当前指针所在的值，每取一次，指针后移一次，直到末尾
each(array $arr);
while (list($key, $value) = each($arr)) {}

//指针取值
	//取指定位置的值，并移动指针到那
end(array $input);
next(array &$input);
prev(array &$input);
current(array $input);
	//还原指针
mixed reset(array $input); //把数组的指针还原到第一位，并返回第一位的值!!!!!


//返回数组当前指针的键名
key(array $input);

count($input); //返回数组长度
string implode(string $sperate, array $input); 
	implode('.', [1,3,4]) //=> '1.3.4'
array_flip(array $input); // 返回交换数组中的键和值后的新数组
//intersect：相交
array_intersect(array $array1, array $array2); // 查找数组中相同的[值]，返回$array1中的所对应的键值对
array_intersect_key(array $array1, array $arr2[, array $arr3]); //查找数组中相同的[键]，返回$array1中的所对应的键值对
array_intersect_assoc( array $array1  , array $array2  [, array $ ...  ]) //查找数组中相同的[键值对]，返回$array1中的所对应的键值对
in_array(mixed $needle, array $haystack);  //检查数组中是否存在某个值
array_search(mixed $needle, array $haystack); //返回数组中的键，这个键所对应的值为$needle
array_keys(); //不同于key()
array_values();

int array_push(array &$array, mixed $value1[, mixed $value2...]);
	$array[] = $value1; // 同array_push，不过同时创建了数组$array
mixed array_pop($array); // 返回数组的最后一个
array_unshift();
array_shift();

array array_combine  ( array $keys  , array $values  );
array array_fill(int $beginIndex, int $length, mixed $cell);
	array_fill(2, 3, array()); // => array(2=>array(),2=>array(),2=>array())

//---------------sort
//'r': reverse(增序变降序)   'u': user-defined comparsion function
//'k': key(键值)        'a': associate(保留原来的键值，而不是从0开始)
$fruits = array('a'=>'lemon', 'b'=>'apple', 'c'=>'orange', 'd'=>'banana');
sort(array &$arr[, int $sort_flags = SORT_REGULAR]);
	sort($fruits); // => array(0=>'apple', 1=>'banana', 2=>'lemon', 3=>'orange')
rsort();
asort(); // maintain index association
	asort($friuts); // => array('b'=>'apple', 'd'=>'banana','a'=>'lemon','c'=>'orange')
ksort(); // 按键排序，保留键!!!!
arsort(); // 同asort，只是是递减(descend)，保留键
krsort(); // 同ksrot, 只是是递减(descend),保留键

uksort(&$arr, callable $comparison_function(mixed $a, mixed $b)); // 按键排序
usort(&$arr, callable $comparision_funciton(mixed $a, mixed $b));  //按值排序
uasort();
//http://php.net/manual/en/function.natsort.php
// by a "natural order" algorithm
natsort();

bool shuffle(array &$array); //randomizes the order of the elements in array
mixed array_rand(array $array[, int $num = 1]); //Picks one or more random entries out of an array, and returns the key (or keys) of the random entries.
	$friuts = array('apple', 'orange', 'banana', 'pear')
	array_rand($friuts, 2); // => array(0, 3) (maybe)

// 反转 倒序
// $preserve_key: 保留key值，一般情况下都要保留
array array_reverse(array $array, $preserve_key = null);
/*
 *----------------------string
 */
// http://php.net/manual/en/function.filter-var.php
mixed filter_var ( mixed $variable [, int $filter = FILTER_DEFAULT [, mixed $options ]] )
	filter_var('http://oa.app.com', FILTER_VALIDATE_URL)
	filter_var('bob@example.com', FILTER_VALIDATE_EMAIL)


strlen(string $input); // 获取一般字符串长度，比如英文
mb_strlen(string $input, 'UTF-8'); //获取UTF-8格式字符的长度。比如'我爱你',为3个字符

strtoupper(string $input);
strtolower(string $input);

sprintf(string $format, mixed $arg);  //格式化字符串
	sprintf('%8s', '') => '        ' //转出8个空格
	sprintf('%.3f'), '99.98') => 99.980 //转为3位小数位的浮点数
vsprintf(); // ?

array explode(string $specrate, string $input); //分隔字符串(字符串不能为空)为数组
	explode('-', '2014-12-31'); // => array('2014', '12', '31');
	explode('', 'abcde'); // => Wrong
array str_split(string $string[, int $split_length = 1]); //PHP 5
	str_split('today'); // => array('t', 'o', 'd', 'a', 'y')
array split(string $pattern, string $string[, int $limit = -1]);
	split('[-\./]', '2015-01-18'); // => array('2015', '01', '18')
//http://php.net/manual/en/function.preg-split.php
array preg_split(string $pattern, string $string[, int $limit = -1[, $flags = 0]]);
	preg_split('//', 'ys', -1, PREG_SPLIT_NO_EMPTY); // => array('y', 's')

string chunk_split(string $body[, int $chunklen = 76[, string $end = "\r\n"]]);
	substr(chunk_split('1409', 2, ':'), 0, -1); // => '14:09'
	chunk_split(base64_encode($data));


string strrev(string $string); // reverse a string(不支持中文)
string str_repeat(string $input, int $multiplier); // return $input repeated multiplier times
string str_pad(string $input, int $pad_length[, string $pad_string = " "[, int $pad_type = STR_PAD_RIGHT]]); // $pad_type: STR_PAD_RIGHT STR_PAD_LEFT STR_PAD_BOTH
	$input = "Alien";
	echo str_pad($input, 10);                      // produces "Alien     "
	echo str_pad($input, 10, "-=", STR_PAD_LEFT);  // produces "-=-=-Alien"
	echo str_pad($input, 10, "_", STR_PAD_BOTH);   // produces "__Alien___"
	echo str_pad($input, 6 , "___");               // produces "Alien_"

mixed str_replace ( mixed $search , mixed $replace , mixed $subject [, int &$count ] );
	// Provides: <body text='black'>
	$bodytag = str_replace("%body%", "black", "<body text='%body%'>");
	// Provides: Hll Wrld f PHP
	$vowels = array("a", "e", "i", "o", "u", "A", "E", "I", "O", "U");
	$onlyconsonants = str_replace($vowels, "", "Hello World of PHP");
	// Provides: You should eat pizza, beer, and ice cream every day
	$phrase  = "You should eat fruits, vegetables, and fiber every day.";
	$healthy = array("fruits", "vegetables", "fiber");
	$yummy   = array("pizza", "beer", "ice cream");
	$newphrase = str_replace($healthy, $yummy, $phrase);
	// Provides: 2
	$str = str_replace("ll", "", "good golly miss molly!", $count);
	echo $count;
str_ireplace(); // 同str_repalec，不管大小写

addslashes(string $input); //对字符串里的特殊字符转换为转义字符
	addslashes("what's your name?"); // => 'what\'s your name?'

string strstr(string $haystack, mixed $needle[, bool $before_needle = false]); //截取字符串从$neele第一次出现的位置开始到字符串结尾(包括$needle)
	strstr('yw@qq.com', '@'); // => '@qq.com'
	strstr('yw@qq.com', '@', true); // => 'yw'
strrchr(); // 查找指定字符在字符串中的最后一次出现并截取u
	substr(strrchr('/www/js/sea.js', '/'), 1); // => substr('/sea.js') => 'sea.js'
	substr('common/common_bill.js', strpos('common/common_bill.js', 'common') + strlen('common'));
substr(string $input, int $beginPos, int $length); //从$beginPos开始，截取$length个长度的字符串
mb_substr(string $input, int $beginPos, int $length, string $format); //同上面一样。不同的是用$format格式的截取，比如'utf8'。原理同mb_strlen

int substr_count(string $haystack, string $needle[, int $offset = 0[, int $length]]);
	substr_count('ywywyw', 'ywyw'); // => 1
mixed count_chars(string $string[, int $mode = 0]);

mixed strpos(string $haystack, mixed $needle[, int $offset = 0]); // 查找字符串首次出现的位置
	strpos('yw@qq.com', 'yw'); // => 0
	strpos('yw@qq.com', 'ys') !== FALSE; // => FALSE 这样写是错的strpos() > -1
stripos(); // 查找字符串首次出现的位置（不区分大小写） 
mixed strrpos(string $haystack, string $needle[, int $offset = 0]);
strripos() ; //计算指定字符串在目标字符串中最后一次出现的位置（不区分大小写） 
int mb_strpos (string $haystack, string $needle [, int $offset = 0 [, string $encoding = mb_internal_encoding() ]] );

trim(string $input);
ltrim(string $input);
rtrim(string $input);

//string charset
string chr(int $ascii); // Returns a one-character string containing the character specified by ascii.
int ord(string $string); // Returns the ASCII value of the first character of string.

string iconv(string $in_charset, string $out_charset, string $needle);
	iconv('utf-8', 'gb2312', '2014年3月28日'); // => '2014年3月28日' (在windows cmd.exe中需要)

string htmlspecialchars_decode(string $string[, int $flags = ENT_COMPAT|ENT|HTML01]);
string htmlentities ( string $string [, int $flags = ENT_COMPAT | ENT_HTML401 [, string $encoding = ini_get("default_charset") [, bool $double_encode = true ]]] )
/**
 *---------------------reg
 * PCRE库函数
 * 正则匹配模式使用分隔符与元字符组成，分隔符可以是非数字、非反斜线、非空格的任意字符。经常使用的分隔符是正斜线(/)、hash符号(#) 以及取反符号(~)
 * 如：/foo bar/  #^[^0-9]$#  ~php~
 *
 *'/\\\\/' => '/\/' 反斜线在单引号字符串和双引号字符串 中都有特殊含义, 因此要匹配一个反斜线, 模式中必须写为”\\\\”. 译注: “/\\/”, 首先它作为字符串, 反斜线会进行转义, 那么转义后的结果是/\/, 这个才是正则表达式引擎拿到的模式, 而正则表达式引擎也认为\是转义标记, 它会将分隔符/进行转义, 从而得到的是一个错误, 因此, 需要4个反斜线才可以匹配一个反斜线. 
 *
 */
preg_quote(string $input[, string $transform]); // 转义字符串中的正则特殊字符，如 . \ + * ? [ ^ ] $ ( ) { } = ! < > | : -  // $transform，为增加的需要转义的自定义字符，如'/'
	preg_quote('*hbha*'); // => '\*hbha\*'

preg_match(string $pattern, string $input); //判断是否匹配
	preg_match('/apple/', 'orange+apple'); // => TRUE
preg_match(string $pattern, string $input, array $matches); // 查找匹配的元素
	preg_match('/(apple)/', 'orange+apple', $matches); // $matches => array('apple')
	//$matches中[0]为全词匹配的，[1]为分组中的第1个，[2]为分组中的第2个

preg_match_all(string $pattern, string $input, array $matches);
	preg_match_all('@<[^>]+>(.*?)<[^]+>@', '<div>learm</div><span>inline-block</span>', $matches);
	//$matches[0]为全词匹配的集合数组，[1]为分组中第1个的集合数组，[2]为分组中的第2个的集合数组

string preg_replace(string $pattern, string $repalcement, string $input);
	preg_replace('/\w+\.+\w+/', '<em>$0</em>', 'index.php sea.js'); // => <em>index.php</em> <em>sea.js</em>
	preg_replace('/\b([a-z])\w+\b/i', '$1_', 'php info'); // => p_ i_  //替换了所有匹配的
string preg_replace(array $pattern, array $replcement, string $input);
	$patterns = array ('/(19|20)(\d{2})-(\d{1,2})-(\d{1,2})/',  '/^\s*{(\w+)}\s*=/');
	$replace = array ('\3/\4/\1\2', '$\1 ='); //\3等效于$3,\4等效于$4，依次类推
	preg_replace($patterns, $replace, '{startDate} = 1999-5-27'); // => $startDate = 5/27/1999

string preg_replace_callback(string $pattern, callable $callback, string $input);
	preg_replace_callback('@-([a-z])@', function ($matches) {
		return strtoupper($matches[1]);
	}, 'hello-world'); // => 'helloWorld'

// 常用正则表达式
/[\x{4e00}-\x{9fa5}]/u // u修饰符： UTF-8 | \x{}: 十六进制
#((https?|ftp)://(\S*?\.\S*?))([\s)\[\]{},;"\':<]|\.\s|$)#i  URL_RE
/*
 *----------------------date
 * two time formats: m/d/y d-m-y y-m-d
 */
//以下日期使用都需要设置上面这个时区
date_default_timezone_set('Asia/ShangHai');

time(); // 获取当前时间戳
//Get Unix timestamp for a date
int mktime ([ int $hour = date("H") [, int $minute = date("i") [, int $second = date("s") [, int $month = date("n") [, int $day = date("j") [, int $year = date("Y") [, int $is_dst = -1 ]]]]]]] );
	mktime(0, 0, 0, 7, 1, 2000); // => 2000-07-01 00:00:00
	mktime(0, 0, 0, 1, 1, 2015); // => 2015年的第一天
strtotime(string $time[, int $now = time()]); // $now为相对的时间，默认为当前
	strtotime('-1 month'); // 获取上月的时间戳
	strtotime('+1 week 2 days 4 hours 2 seconds', strtotime('2014-1-5'));
	strtotime('1 January 2014'); // timestamp of 2014-1-1

//http://php.net/manual/en/function.date.php
date('Ymd', strtotime('-1 month')); // 获取上月的，2014-10-10格式的日期
date(); //=> array('m'=>'day of week(0:sunday&6:saturday)','t'=>'number of days in the given month','L'=>'is a leap year(闰年)?')
date('258\s\p\e\c\i\a\l'); => //'258special'
gmdate('Ymd H:m:s', time()); // 获取GMT标准时间，time()时间戳为转换的时间

bool checkdate(int $month, int $day, int $year);

//Datetime
//http://php.net/manual/en/class.datetime.php
DateTime::createFromFormat

$date1 = new DateTime('2012-06-01 02:12:51');  
$date2 = $date1->diff(new DateTime('2014-05-12 11:10:00'));  
echo $date2->days.'Total days<br>';

function convert_seconds($seconds)   
 {  
  $dt1 = new DateTime("@0");  
  $dt2 = new DateTime("@$seconds");  
  return $dt1->diff($dt2)->format('%D days, %H hours, %I minutes and %S seconds');  
  }<  
echo convert_seconds(200000); // => 2 days, 7 hours, 33 minutes and 20 second

Datetime::RSS; // =>  "D, d M Y H:i:s O"
Datetime::COOKIE; // => "l, d-M-Y H:i:s T"
/**
 *----------------------缓冲区 & 编码
 */
ob_get_clean(); //获得缓冲区数据并清空缓冲区, 与之配套的是ob_start()
	// 等同于 ob_get_contents() + ob_end_clean()

base64_encode();
json_encode();
json_decode();
	//$object: object of stdClass, $object->title这样用, $object['title']这样会出错
	$object = json_decode('{"title":"catelog"}'); 

mcrypt_encrypt(); // not know

/**
 *----------------------判断存在
 */
array_key_exists();
function_exists(string $ipnut);
isset(mixed $var); // 检测变量是否已设置,但碰到值为NULL时，会输出FALSE
empty(mixed $var); // 检测变量是否为空，如"", 0, FALSE, [], NULL, "0"，这些都为TRUE
defined(string $name); // 检测常量是否存在，参数为字符串

is_file(string $filename); // 检测是否为文件是否存在
is_dir(string $dirname);  //检测路径是否存在

bool is_scalar(mixed $var); //Scalar variables are those containing an integer, float, string or boolean. Types array, object and resource are not scalar.
bool is_bool();
bool is_int();
bool is_float();is_real();
bool is_string();
bool is_object();
bool is_array();
bool is_callable(); // 是不是可调函数

file_exists(); //判断文件是不是真的存在于某一路径下
is_file(); // 只是判断路径是不是对的路径

//---------------------------type
string gettype(mixed $var); // => ('boolean'|'integer'|'double'|'string'|'array'|'object'|'resource'|'NULL'|'unknown type') no 'function'
	$func = function(){};
	gettype($func); // => 'object'
bool settype(mixed &$var, string $type); //$type: ('boolean'|'integer'|'float'|'string'|'array'|'object'|'null') no function too
	settype('5times', 'integer'); // => 5
	settype(true, 'string'); // => '1'
	
/**
 *----------------------功能性 & Exception
 */
die();exit(); // 尽管调用了 exit() ， Shutdown函数 以及 object destructors 总是会被执行。

try {
	throw new Exception('there is a exception.');
} catch (Exception $e) {
	echo $e->getMessage(); // => there is a exception.
	echo $e->getTraceAsString();
}

/**
 *----------------------魔术常量
 *@description: 会随着代码所处位置，值不一样的常量
 */
__LINE__      //文件中的当前行号
__FILE__      // 文件的完整路径及文件名 c:\user\scope.php
	basename(__FILE__); // => scope.php
	basename(__FILE__, '.php'); // => scope
	$_SERVER['PHP_SELF']; // => scope.php
__DIR__       // 文件所在目录
__FUNCTION__  //函数名称 (functionName)
__METHOD__    //类的方法名（Class::method）
__CLASS__     //类的名称 (Class)
__TRAIT__     //Trait的名字
__NAMESPACE__ //命名空间名称


/**
 * 逻辑运算符
 * from: http://php.net/manual/zh/language.operators.logical.php
 */
//||、&&的优先级大于AND、OR
$f = $a AND $b  // => ($f = $a) AND $b
$f = $a OR $b // => ($f = $a) OR $b
$f = $a && $b // => $f = ($a && $b)
$f = $a || $b // => $f = ($a || $b)

//与JS一样，同样存在执行短路的情况
$a = (false && foo()); // foo不会运行了
	isset($arr['list']) && $arr['list']

$a || $b 
$a OR $b

$a XOR $b //$a和$b一个是true，一个是false

$a && $b
$a AND $b

!$a

/*
 * -----------------------路径、文件名
 *@hint: On Windows, both slash (/) and backslash (\) are used as directory separator character. In
 * other environments, it is the forward slash (/).
 */
$_SERVER['PHP_SELF']; // => 'current_execute_php.php'
__FILE__; // => '/home/src/young.php'
$_SERVER['REQUEST_URI'];  // => /progress/index.html?query_code=17896423
basename(string $filepath[, string $ext = null]);
	basename('c:\user\sample.php'); // => 'sample.php'
	basename('c:\user\sample.php', '.php'); // => 'sample'
// return information about a file path
pathinfo($path, $options = null); // PATHINFO_DIRNAME PATHINFO_BASENAME PATHINFO_FILENAME
	pathinfo('/path/name.php', PATHINFO_EXTENSION); // => 'php'

parse_url(string $url[, int $component = -1]);
	$url = 'http://www.app.com/product/detail/S20140324.html?a=b&c=d#appraise';
	json_encode(parse_url($url));
		// => {"scheme":"http","host":"www.app.com","path":"\/product\/detail.html","query":"a=b&c=d","fragment":"appraise"}
	parse_url($url, PHP_URL_PATH); // => '\a=b&c=d'

// URL编码
rawurlencode(' ');  // => '%20'
urlencode(' ');     // => '+'

parse_str(string $str[, array &$arr]);
	parse_str('first=value&arr[]=foo&arr[]=baz', $output); // => $output['first'] = 'value',$output['arr'][0] = 'foo', $output['arr'][1]='baz'

// 文件
sting file_get_contents();
bool ftruncate ( resource $handle , int $size ); // 将文件截断到给定的长度
	// 将文件转置空
	$fp = fopen("/tmp/file.txt", "r+");
	ftruncate($fp, 0);
	fclose($fp);
	// or 
	$fp = fopen("/tmp/file.txt", "w");
	fclose($fp);

/*
 *-----------------------network
 */
$ch = curl_init($url);
crul_setopt_array($ch, array(
	CURL_POST => 1,
	CURLOPT_POSTFIELDS => array(
		'foo' => 'bar'
	),
	CURLOPT_URL => '',
	CURLOPT_HTTPHEADER => array(
		'Referer: http://m.app.com'
	),
    CURLOPT_RETURNTRANSFER => 1,   // 获取的信息以文件流的形式返回，而不是直接输出(不从控制台输出)
));
$reponseText = curl_exec($ch);
curl_close($ch);

/*
 * -------------------functions
 */
//http://php.net/manual/en/function.call-user-func.php
// the parameters for call_user_func() are not passed by reference.!!!!
//Returns the return value of the callback, or FALSE on error.
//像JS中的call
mixed call_user_func(callable $callback[, mixed $param, mixed $...]);
	call_user_func('callback', &$x);  // &$x写法是错的，用下面的call_user_func_array
//像JS中的apply
mixed call_user_func_array(callable $callback, array $params);
	call_user_func_array('callback', array(&$x));

array get_defined_functions(void);
	=> array(
			'internal': array(), //PHP自带的函数名(build-in)
			'user': array() //自定义的函数名(user-defined)
		)
//Checks the list of defined functions, both built-in (internal) and user-defined, for function_name.
bool function_exists(string $func_name);
//http://php.net/manual/en/function.is-callable.php
bool is_callable(callable $name[, bool $syntax_only = false[, string &$callable_name]]);
	is_callable($func_name);
	is_callable(array($className, $method));

int func_num_args(void); //返回函数实参数
mixed func_get_arg(int $index); // 返回第$index个实参
array func_get_args(void); // 返回实参数组

//http://php.net/manual/en/function.forward-static-call.php
mixed forward_static_call(callable $static_func[, mixed $parameters, mixed ...]);
	forward_static_call(array($className, $method), $parameters);
mixed forward_static_call_array(callable $static_func, array $parameters);

//-----------------------Math 
mixed min(array $values); //http://php.net/manual/en/function.min.php
mixed min(mixed $value1, mixed $value2[, mined ...]);
mixed max(values)(array $values);
mixed max(mixed $value1, mixed $value2[, mined ...]);

float round(float $float [, int $precision = 0 [, int $mode = PHP_ROUND_HALF_UP]]);
float floor(float $value);
float ceil(float $value);
abs();

int intval(mixed $var [, int $base=10]);// 通过使用指定的进制 base  转换（默认是十进制），返回变量 var  的 integer  数值。 intval()  不能用于 object，否则会产生 E_NOTICE  错误并返回 1。 

int rand(void); //generater a random integer between 0 and getrandmax()
int rand(int $min, int $max); // inclusive $min and $max

string number_format ( float $number [, int $decimals = 0 ] );
	number_format(1223.39); // => 1,223

//------------------------Sericry
string htmlentities ( string $string [, int $flags = ENT_COMPAT | ENT_HTML401 [, string $encoding = ini_get("default_charset") [, bool $double_encode = true ]]] )

//-------------------------Class
// Magic method, when force object to string
public function __toString() {

}

///-------------------------Trait 横向（水平）组合、Mixin
// http://php.net/manual/zh/language.oop5.traits.php
trait Trait_name {
	private $trait_name = '';

	public function method () 
	{

	}
}

class Class {
	use Trait_name; // 加载trait类
}


/// ReflectClass 反射
// http://php.net/manual/zh/class.reflectionclass.php
$refClass = new ReflectionClass(__CLASS__);
$traits = $refClass->getTraits();  // 获得当前类的Trait
$methods = $refClass->getMethods(ReflectionMethod::IS_PUBLIC | ReflectionMethod::IS_PROTECTED);                        // 获取方法，传空时，为获取全部属性方法
$method->getDocComment();  // 获取注释

string nl2br();
```