php错误与异常：
http://php.net/manual/en/function.set-exception-handler.php

1.异常，包含uncaught exception和caught exception，
uncaught exception: 
	throw new Exception('uncaught exception')
	关联的有set_exception_handler()
caught exception:
	try {
	
	} catch (Exception $e) {
		
	}
	
2.错误
异常之外的，不可未知的，会中断程序的运行
set_error_handler()