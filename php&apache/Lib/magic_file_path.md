```php
<?php
/**

 *  cmd /k php "X:\magic_file_path.php" ${FULL_CURRENT_PATH} & pause & exit
 */



$file_path = $argv[1] or die('error.');
$content_input = explode(PHP_EOL, file_get_contents($file_path));

$sort_map = ['origin', 'res', 'config', 'views', 'classes'];

$modules = [];
$module_flag = FALSE;
$module_name = '';
$module_map = [];
$begin_index = $end_index = 0;
$begin_flag = FALSE;

foreach ($content_input as $index => $line) 
{	
	if (is_path($line))
	{
		if ( ! $module_flag)
		{
			$module_flag = TRUE;

			$module_name = preg_replace('/\W/', '', $content_input[$index -1]);
			$modules[$module_name] = [];
			

			if ( ! $begin_flag)
			{
				$begin_index = $index - 1;
				$begin_flag = TRUE;
			}			
		}

		$line = fix_path($line, $module_name);
		if ( ! array_key_exists($line, $module_map) && is_valid_path($line))
		{
			$modules[$module_name][] = $line;
			$module_map[$line] = '';

		}

		$end_index = $index;
	}

	else if (trim($line) != '')
	{

		if ($module_flag)
		{			
			$module_flag = FALSE;
			$module_map = [];
		}
	}
}

$module_txt = [];
foreach ($modules as $module_name => $module)
{
	sort_module($module);
	full_module($module);
	array_unshift($module, $module_name.':');
	//$module[] = '';
	array_splice($module_txt, count($module_txt), 0, $module);
}
array_splice($content_input, $begin_index , $end_index - $begin_index + 1, $module_txt);
var_dump($content_input);
file_put_contents($file_path, implode(PHP_EOL, $content_input));



/*
 * helpers
 */
function is_path ($file_path)
{
	return preg_match('/[\\\\\/]\w+[\\\\\/]/', $file_path) AND strpos($file_path, '#') === FALSE;
}

function is_valid_path ($file_path)
{
	if (strpos($file_path, '.js.map') !== FALSE)
	{
		return FALSE;
	}
	return TRUE;
}

function fix_path ($path, $module_name)
{
	empty($module_name) AND die('error'.PHP_EOL);
	if (preg_match('/\W'.$module_name.'\W/', $path) AND ($offset = strpos($path, $module_name)) !== FALSE)
	{
		$path = substr($path, $offset + strlen($module_name));
	}
	preg_match_all('/([\w\.\-]+)/', $path, $matches);
	return '/'.implode('/', $matches[1]);
}

function sort_module ( & $module)
{
	global $sort_map;
	usort($module, function ($path_a, $path_b) use ($sort_map)
	{
		$index_a = $index_b = PHP_INT_MAX;
		foreach ($sort_map as $index => $key)
		{
			if (strpos($path_a, $key) !== FALSE)
			{
				$index_a = $index;
			}
			if (strpos($path_b, $key) !== FALSE)
			{
				$index_b = $index;
			}
		}
		if ($index_a == $index_b)
		{
			return $path_a > $path_b ? 1 : ($path_a < $path_b ? -1 : 0);
		}
		return $index_a > $index_b ? 1 : -1;
	});
}

function full_module ( & $module)
{
	$ret = [];
	$open_index = 0;
	foreach ($module as $path)
	{		
		$ret[] = $path;
		if (strpos($path, '/res') !== FALSE)
		{
			$ret[] = $path.'.map';
		}		
		
		/*foreach ($sort_map as $index => $key)
		{
			if (strpos($path, $key) !== FALSE AND $open_index !== $index)
			{				
				$open_index = $index;
				$ret[] = ''.PHP_EOL;
				break;
			}
		}*/
	}
	$module = $ret;
}