```php
<?php 
class SubClass extends SuperClass
{

    use Trait_modules1;
    use Trait_modules2;
    use Trait_modules3;

    // __construct不能放在trait类里加载
    public function __construct(Request $request, Response $response)
    {
        parent::__construct($request, $response);

        #region 打印继承的对象方法信息

        // 生成Root对象里的trait方法
        $output_methods = new stdClass;

        // __CLASS__指向本类
        // 没有用$this，因为$this指向运行进的类
        $class = new ReflectionClass(__CLASS__);
        $traits = $class->getTraits();  // 获得当前类的Trait

        // 当前类中的方法
        $methods = $class->getMethods(ReflectionMethod::IS_PUBLIC | ReflectionMethod::IS_PROTECTED);
        // 引用Trait中的方法
        foreach ($traits as $trait) {
            array_merge($methods, $trait->getMethods(ReflectionMethod::IS_PUBLIC | ReflectionMethod::IS_PROTECTED));
        }

        // 抽取方法中的注释
        foreach ($methods as & $method)
        {
            $method->comment = explode(PHP_EOL, $method->getDocComment());

            // 只需要注释中的第二行，并去掉前端的*号
            $method->keyComment = empty($method->comment[1]) ? '' : $method->comment[1];
            $method->keyComment = preg_replace('@^\s+\*\s+@', '', $method->keyComment);

            $output_methods->{$method->name} = $method->keyComment;
        }
        print_r($output_methods);

        #endregion
    }
}