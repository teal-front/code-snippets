### Wiki
> http://www.ruanyifeng.com/blog/2017/05/websocket.html


### Tools
> 在线echo测试工具：http://www.websocket.org/echo.html
ws://echo.websocket.org

> websocketd: http://websocketd.com/

#### net proxy
```bash
polipo # a proxy to turn SOCTETS to HTTP/HTTPS
proxychains: enable command line use SOCKETS connection
    # proxychains-ng(new generation for mac): https://github.com/rofl0r/proxychains-ng
	# 可以用在ss上： https://github.com/shadowsocks/shadowsocks/wiki/Using-Shadowsocks-with-Command-Line-Tools
	# Mac下使用需限制SIP：进入Recovery OS后，终端运行`csrutil disable`即可
proxychains4 git clone $repo
```

```bash
# 持续输出ls信息给到port8080
websocketd --port=8080 ls
```

> npm库: websocket: https://github.com/theturtle32/WebSocket-Node/blob/master/docs/WebSocketClient.md

### multiple nodes使用解决方案
#### nodejs开启了cluster时，上一次websocket请求到worker A，下一次可能就请求到了worker B，那就会请求不通

>  **https://socket.io/docs/using-multiple-nodes/**
1. nginx的ip hash
```
upstream io_nodes {
  ip_hash;
  server 127.0.0.1:6001;
  server 127.0.0.1:6002;
  server 127.0.0.1:6003;
  server 127.0.0.1:6004;
}
server {
  listen 3000;
  server_name io.yourhost.com;
  location / {
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection "upgrade";
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header Host $host;
    proxy_http_version 1.1;
    proxy_pass http://io_nodes;
  }
}
```


