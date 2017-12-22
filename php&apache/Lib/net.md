```php
<?php
 /**
 * 代理请求(Kohana中的Request中已实现)
 * @param string $url 请求地址
 * @param array $para 请求实体
 * @param array $headers 请求头
 * @param string $method 请求方式
 * @return string 返回请求结果
 */
protected function get_http_response($url, array $para = array(), array $headers = array(), $method = 'GET') {
	$curl_params = array(
		CURLOPT_HTTPHEADER => $headers,
		CURLOPT_RETURNTRANSFER => 1,   // 获取的信息以文件流的形式返回，而不是直接输出(不从控制台输出)
		CURLOPT_TIMEOUT => 10          // 设置超时时间10s
	);
	if (strtoupper($method) == 'POST')
	{
		$curl_params[CURLOPT_POST] = 1;  // 使用post
		$curl_params[CURLOPT_POSTFIELDS] = $para;   // post传输数据
	}
	elseif (strtoupper($method == 'GET'))
	{
		$path = '?';
		while (list($key, $value) = each($para))
		{
			$path .= sprintf('%s=%s&', urlencode($key), urlencode($value));
		}
		$url .= $path;
	}
	$curl = curl_init($url);
	curl_setopt_array($curl, $curl_params);
	$response_text = curl_exec($curl);
	curl_close($curl);

	return $response_text;
}