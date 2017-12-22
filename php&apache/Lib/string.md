```php
<?php
	class String_lib {
		// => strlen
		static function count_char(string $string, string $char)
		{
			preg_match_all('{$char}', $string, $matches);
			return count($matches[0]);
		}
		//中文字符串反转 mb_strlen mb_substr array_reverse
		///strrev
		static function reverse($str, $charset = 'UTF-8')
		{
			$ret = '';
			$len = mb_strlen($str, $charset);
			for ($i = 0; $i < $len; $i++) {
				$ret[] = mb_substr($str, $i, 1, $charset);
			}		 
			return implode('', array_reverse($ret));
		}
	}