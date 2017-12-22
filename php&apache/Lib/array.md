```php
<?php
class array 
{
	/**
     * 输入参数过滤，默认过滤为空的字段
     * @param  array $arg       输入参数列表
     * @param  array $retention 保留参数列表
     * @return array
     * Ex.
     * $a = array('name' => 'app.com', 'addr' => 'Guangdong', 'mobile' => '');
     * $b = array('name', 'mobile');
     * arg_filter($a)        // output array('name' => 'app.com', 'addr' => 'Guangdong');
     * arg_filter($a, $b)    // output array('name' => 'app.com');
     */
    protected function arg_filter($arg, $retention = array())
    {
        // 去首尾空格
        array_walk_recursive($arg, function (&$v) {$v = trim($v);});
        // 过滤空数据
        $result = array_filter($arg, function ($v) {
            return (is_string($v) ? ('' != $v) : true);
        });

        if (empty($retention))
        {
            return $result;
        }
        else
        {
            $retention = array_flip($retention);
            $result = array_intersect_key($arg, $retention);
            return $result;
        }
    }

    //array(1, 3) + array('a', 'b') => array(array(1, 'a'), array(3, 'b'))
    protected function merge_array () {
        $array_list = func_get_args();
        foreach($array_list as $array) {
            if (gettype($array) != 'array') {
                throw new Error('parameters must all be array');
            }
        }
        array_unshift($array_list, null);
        return call_user_func_array('array_map', $array_list);
    }

    //get random value from array
    protected function array_random_method_one ($arr, $num = 1) {
        $keys = array_rand($arr, $num); // 只返回指定数目的随机的键
        if ($num == 1) {
            return $arr[$keys];
        } else {
            foreach($keys as $key) {
                $ret[] = $arr[$key];
            }
            return $ret;
        }
    }
    protected function array_random_method_two ($arr, $num = 1) {
        shuffle($arr);
        /*$x = 0;
        while(list(,$value) = each($arr)) {
            if ($x == $num) { break; }
            $ret[] = $value;
            $x++;
        }*/
        $ret = array_splice($arr, 0, $num);
        return $num == 1 ? $ret[0] : $ret;
    }
	    


}