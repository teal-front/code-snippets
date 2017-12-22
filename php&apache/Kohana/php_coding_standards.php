<?php

//Curly Brackets
if ($a == $b)
{

}
elseif () // not: else if
{

}

//Class Brackets
class Foo {

}

//Empty Brackets
class Foo {}

//Array Brackets
array('a' => 'b', 'c' => 'd');
$array = array(
	'a' => 'b',
	'c' => 'd'
)

//Arrays as Function Arguments
func(array(

));

//Create an instance of a class
$db = new Database;

//Functions and Methods
function func($params) //函数名与左括号之间没有空隔
{

}

//String Concatenation
$str = 'one'.$var.'two';

//Single Line Statements
///Single-line IF statements should only be used when breaking normal execution (e.g. return or continue):

// Acceptable:
if ($foo == $bar)
    return $foo; 

if ($foo == $bar)
    continue; 

if ($foo == $bar)
    break;
 
if ($foo == $bar)
    throw new Exception('You screwed up!');
 
// Not acceptable:
if ($baz == $bun)
    $baz = $bar + 2;

//Comparison Operations
if (($foo AND $bar) OR ($b AND $c))

if (($foo && $bar)) || ($b && $c)) // Incorrect

//Switch Structures
switch ($var)
{
	case 'bar':
	case 'foo':
		echo 'foo';
	break;                     //与case语句对齐，by 1 tab
	default:
		echo 'default';
	break;
}

//Parentheses
if ($foo == $bar)
if ( ! $foo)
if ( (bool) $exist)

//Ternaries
$foo = ($bar == $foo)
	 ? $foo
	 : $bar;

//Constants
define('MY_CONSTANT', 'value');

if ($foo != FALSE) // if variable $foo is not exactly FALSE
if (FALSE != $foo) // Incorrect

//Regular Expressions
preg_replace('/(\d) dollar/i', '$1 RMB', $str); // preferred over \n
preg_replace('/(\d) dollar/i', '\\1 RMB', $str); 



