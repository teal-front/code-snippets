<VirtualHost *:800>

ServerName p.me

DocumentRoot "/data/php"
	
<Directory "/data/php">

   AllowOverride None
   Order deny,allow   #deny后面的逗号后不能有空格
   #Require local

   Allow from all
</Directory>

</VirtualHost>

## apache disable cache
把下面的配置放在httpd.conf里面，最顶层，与VirtualHost同级
# DISABLE ALL CACHING WHILE DEVELOPING
<FilesMatch "\.(php|html|htm|js|css|json)$">
	FileETag None

	<IfModule mod_headers.c>
	  Header unset ETag
	  Header set Cache-Control "max-age=0, no-cache, no-store, must-revalidate"
	  Header set Pragma "no-cache"
	  Header set Note "CACHING IS DISABLED ON LOCALHOST"
	  Header set Expires "Wed, 11 Jan 1984 05:00:00 GMT"
	</IfModule>
</FilesMatch>

#访问文件目录，
<VirtualHost *:80>
    <Directory "/data/php">
		#DirectoryIndex a.php  #define open file，a.php在此路径下是不存在的，所以就会列出目录，需要下面一行的支持。（下面一行我也不知道具体是做什么的）
		Options +Indexes
    </Directory>
</VirtualHost>