```php
<?php 
class Init {
	/**
	 * 请求之前的统一处理
	 */
	public function before()
	{
		// CSRF token initialize
		FE_CSRF::init_token();

		// 基于ajax请求的CSRF拦截
		if ($this->format == 'json')
		{
			$referer = $this->request->headers('referer');
			if ( ! preg_match('#^https?://([\w-]+\.)*app\.\w{2,3}(:\d+)?/.*$#i', $referer))
			{
				throw new Error('invalid referer');
			}

			// 若发布前用户页面没有关闭或页面从缓存读取，则页面上没有session cookie，更不会有csrf cookie
			if (isset($_COOKIE['session']))
			{
				$csrf_token = $this->request->headers(FE_CSRF::TOKEN_NAME);
				if ( ! FE_CSRF::validate_token($csrf_token))
				{
					throw new Error('invalid token');
				}
			}
		}
	}	
}

/**
 * csrf-token的生成、renewal
 */
class FE_CSRF {

    const RENEWAL_TIME = 30000;               // 过期时间，单位毫秒
    const TOKEN_NAME = 'X-CSRF-Token';
    const DECRYPT_KEY = 'omg_gmo';          // token加密解密方法使用的Key值

    /**
     * 页面加载时，初始化token
     */
    static public function init_token()
    {
        $token = Cookie::get(self::TOKEN_NAME);

        if ( empty($token) || ! self::validate_token($token))
        {
            self::gen_token();
        }
    }

    /**
     * 生成csfr_token
     */
    static public function gen_token()
    {
        $session_id = session_id();
        $time = time();
        $token = Util::encrypt($session_id.'.'.$time, self::DECRYPT_KEY);

        setcookie(self::TOKEN_NAME, $token, time() + SessionConfig::CookieLifetime, '/', SessionConfig::instance()->getCookieDomain());
    }

    /**
     * 校验token值，过期时续签
     */
    static public function validate_token($token = '')
    {
        $token = Util::decrypt($token, self::DECRYPT_KEY);
        $token_pairs = explode('.', $token);
        $session_id = empty($token_pairs[0]) ? '' : $token_pairs[0];
        $time = empty($token_pairs[1]) ? '' : $token_pairs[1];

        if ($session_id !== session_id())
        {
            return FALSE;
        }
        else if (time() - $time > self::RENEWAL_TIME)
        {
            self::gen_token();
        }

        return TRUE;
    }

}

