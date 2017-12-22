```php
<?php
	//0.
		// 句末一定要加分号！

	//1.在变量前面加上&为引用，但得是引用。如果是一个字面量或是函数返回的值则不行，例如：
       $arr = array(1, 2, 3,4);
       foreach ($arr as &$value) {
       		$value = $value * 2;
       }
       //下面的就不行
       foreach (array(1, 3, 4) as &$value) {
       		$value = $value * 2;
       }

    //2.<?= somevar ？>
    	//无需配置，直接使用

    //3.单引号、双引号的区别
       //默认HTML页面用“”，PHP中包含HTML代码用‘’
       //单引号内不能处理转义字符及变量（转义字符除\\和\'），处理简单，所以速度比双引号快
       $var = "name";
       echo "$var"; // => "name"
       echo '$var'; // => "$var"
         echo "".$var; // 等同于上面的


    //4.类中的self vs. static
         class A {
		    public static function who() {
		        echo __CLASS__;
		    }
		    public static function test() {
		        self::who();  // 1.self 下面的输出 A
		        static::who(); // 2.static 下面的输出 B
		    }
		}

		class B extends A {
		    public static function who() {
		        echo __CLASS__;
		    }
		}

		B::test();  // => A

	//5.=== vs. ==
		==: 值相同
		===: 值相同，类型相同 （引用相同？）

	//6.可变函数 & 可变类名
		function func () {}
		$change_func = 'func';
		$change_func();

		class Klass {}
		$change_class = 'Klass';
		$child = new $change_class();

	//7.function use
		//object值是直接按引用的，连array都只是赋值，与JS不同。
		//array类型的按引用，得加个&
		$callback = function () use ($var) {

		}

	//8.对象的引用同JS一样，再次赋值后就不是同一个对象了
		//http://bbs.csdn.net/topics/360002529
		$msg = (object) 'msg';
		$callback = function () use ($msg) {
			echo $msg->scalsr;
		}
		$msg = (object) 'other msg'; //$msg不再引用前一个对象了，引用地址发生了改变
		$callback(); // => 'msg';

	//9.object->scalar,scalar为其它类型数据(除数组外)转化为对象时默认的键，它指向转化前的值
		//http://php.net/manual/zh/language.types.object.php
		$pseudo_object = (object) 'msg';
		$pseudo_object->scalar == 'msg'; // => true

	//10.创建一个空白对象
		$empty_obj = new stdClass();

	//11.{}对变量的解析
		$message = 'some_method';
		$obj->{$message}

	//12.&(引用符号)的使用
		$x = 3;
		array_push(range(0,5), &$x); // Wrong: Call-time pass-by-refenrence has been remove by 5.4
		array_push(range(0,5), array(&$x)); // Right

	//13.函数字符串的使用
		array_map('strlen', array('apple', 'banana', 'orange', 'judge'));

	//14.函数的有趣
		//下面这种形式的函数后面不跟括号，单独拿出来用时，被当常数看待。可惜它又不是常数
		function factorial ($num) {
			return $num > 1 ? $num * factorail($num -1) : 1;
		}
		$factorial = function ($num) {
			return $num > 1 ? $num * factorail($num -1) : 1;
		}
		gettype(factorial); // => Exception: use of undefined constant factorial
		gettype($factorial); // => 'object'