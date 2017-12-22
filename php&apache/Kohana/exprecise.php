<?php
/**
 * ------------------------------------------------View
 */
 //render view
  $this->view_data = array();
  $this->template = View::factory('/src/page'); //page后不接扩展名

  $this->auto_render = FALSE;
  echo 'something else';
  
  $this->request->headers('referer');
  $this->redirect('/commodity/publish/index.html', 302);

  $this->show_error(-1, 'xxxxxxxx'); //在action里面主动报错


$this->global_view_vars['show_category_nav'] = true; //打开左侧菜单

Kohana::$config->load($event_id);

/**
 * --------------------------------------------Load Resource
 */
echo Resource::merge(array('a.js', 'b.js')); // => <script src='http://a.cn/merge?/a.js&b.js'></script>
echo Resource::embed('a.js'); // => <script>some code here</script>
echo Resource::attach('a.js'); // => <script src="http://a.cn/a.js&v=234242342alsdjfi"></script>

/**
 * 页面渲染的内部细节
 * @param   string  $view   片断视图名称
 * @param   array   $vd     视图数据列表
 * @return  string          渲染后的字符串
*/
protected function render($view, array $vd = array())
{
	return View::factory($view)->bind('view_data', $vd)->render();
}
// manul echo response
$v = View::factory('inc/app/script');
$v->gvv_is_app = 0;
$response = Response::factory();
$response->body($v->render());
echo $response;

//渲染页面片断
$this->fragment_render('bill/fragment_list', $vd);// 视图中使用$view_data绑定数据

//handler request
///http://kohanaframework.org/3.3/guide/kohana/mvc/controllers
$this->request->param('id'); // in bootstrap.php，<id>/.<foramt>

  $this->request->query(); // by get
  $this->request->post();  // by post
  $this->request->post('user_name', ''); // 获取post参数user_name，如果没有就返回''

  $this->request->action;
  $this->request->param('id');

  $this->request->route(); // the Route that matched the current request url
  $this->request->directory(); // 
  $this->request->controller(); 

//Ajax请求,就这样就行了
  $this->view_data = array(); // 处理函数里这样就OK了，ajax接收的会自动变成json

//内部请求Ajax，注意是Request，不是View
   //Request::POST => 'POST'
  // 返回的是JSON字符串，还要用json_decode(ret, TRUE)转化
Request::factory('/uri.json')
->method(Request::POST) // 
->post(array(
    'url' => $ret['url'],
    'amount' => $req_data['amount']
))
->execute() // 返回解析好的数据
->body()   //返回HTTP Header数据
json_decode($request_ret, TRUE);
//get请求，不带参数
Request::factory(sprintf('/app/area/school_query/%s.json', (string)$region_id))->method(Request::GET)->execute()->body();

//视图页
Util::get_app_img_src('res/upload/a.png', 260, 260); // H5端，可指定输出图片大小
Util::get_img_src('res/upload/a.png'); // PC端

//
json_decode(string $body); //必要时可处理上一步返回的对象

//-----------------------调试
echo Debug::vars($vars);

//common/kohana/system/classes/Controller/Root.php
$this->check_result($ret); //检查接口返回数据是否正确，不然返回指定页面

$this->check_empty($ret); // 检查接口result_rows是否为空，为空的话返回‘数据为空’页面

//$ret = $this->func_call('order_filter', array('id' => 'O201412412354')); // output array('result' => 0, 'res_info' => 'OK', 'result_rows' => array())
//$result = $this->convert_output($ret);  // output array('retcode' => 0, 'retmsg' => 'OK', 'result_rows' => array())
$this->convert_output($ret);

$this->check_view(array('html')); // 检查uri是否为html

$params = array("img_code" => 'asdfsd');
$v = Validation::factory($params);
$v->rule('img_code', 'not_empty')
    ->rule('mobile', 'not_empty'); // 如果mobile为0，则为认为not_empty
$v
->rule('order_type', 'not_empty') // 正则判断之前得加not_empty判断
->rule('order_type', 'regex', array(':value', '/'.OrderTypeConfig::Digital.'/'))
$v->rule('pay_type', 'in_array', array(':value', array('v1', 'v2')));
$this->check_valid($v);



//需校验登录态
protected $is_check_login = TRUE;
// black为不验证登录态，white为验证登录态
// common\kohana\system\classes\Controller\Root.php
protected $login_action_conf = array('black' => array('exchange'), 'white' => array('action_name')); // action_exchange

$this->is_check_login = TRUE;
$this->check_login();


$this->get_first_row($result['result_rows']) // not $result['result_rows'][0]

JSBridge.loadUrl('http://m.app.com' + $(this).attr('href'));
//这种形式的json_encode中的'<'不会被转义为&quot
///应该也可以用$gvv的全局变量，这个还没试
$this->fragment_view_vars['pickup_info'] = json_encode($pickup_info); //$fragment_pickup_info;
//绑定在$view_data中的就会被转义，防XSS
$vd['pickup_info'] = json_encode($pickup_info);

// 生成二维码
PC: get_qrcode_create(appRoot.php，是一个完整的请求)

// URL
$client_info = Request::user_agent(array('browser', 'version', 'robot', 'mobile', 'platform'));
$mobile_type == 'iPhone' || $mobile_type == 'Android'
if (!empty($client_info['mobile']))
{
    $this->redirect('http://m.app.com/', 302);
}
// weixin
$is_in_weixin = (FALSE !== stripos($_SERVER['HTTP_USER_AGENT'], 'MicroMessenger'));

//---------------------------------------JSBridge安卓Webview接口
JSBridge.doLogin(url);

//---------------------------------------tools
//common\src\util\template_util.php
TemplateUtil::parseTemplate("absdc${var}", array('var' => '23423')); // => absdc23423

// mobile
//mobile下的项目的控制器只能是action_ctrl，不能是action_ctrl_sub这样的。因为有<filter>_<action>这样的拆分

mobile 下公用标题的配置：
$this->global_view_vars['show_top'] = true;
$this->global_view_vars['top_title'] = '订单已确认';
$this->global_view_vars['top_right_txt'] = '我的订单';
$this->global_view_vars['top_right_url'] = "/app/order/list.html";

// 查商品信息
$sku_info = $this->sku_query_by_list(array('sku_id_list' => array($sku_id)));


// =----------------安全
HTML::entities($str);

// ------------------金额
Util::format_money();

// --------------------Kohana底层代码
Arr::get($_POST, 'username', '');
public static function get($array, $key, $default = NULL)
{
  return isset($array[$key]) ? $array[$key] : $default;
}


 // check is mobile 
check_is_mobile()

throw HTTP_Exception::factory(404, 'File not found!'); // mobile抛出404页面


// resource merge
 <?php echo Resource::merge(array('/mod/seajs/sea.js', '/mod/seajs/combo.js', '/mod/zepto/zepto.min.js', '/js/global/global.js'), Resource::$MERGE_PARAMS_MOBILE); ?>
 <?php echo Resource::merge(array('/libs/seajs/2.2.1/sea.js', '/libs/jquery/1.9.1/jquery.min.js', '/static/global/app.js'), Resource::$MERGE_PARAMS); ?>


// Service tools
Runtime_Info::instance()->getDefaultLogger()->info('some messages here');