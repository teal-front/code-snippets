```php
<?php
	$img_path = 'img2base64.png';

	$img_info = getimagesize($img_path);
	$img_mime = $img_info['mime'];
	$fp = fopen($img_path, 'r+') or die('not file the file');
	$ret = chunk_split(base64_encode(fread($fp, filesize($img_path))));
	$ret = 'data:'.$img_mime.';base64,'.$ret;
	fclose($fp);

//	echo $ret;
	$fp = fopen('img2base64.txt', 'w+');
	fwrite($fp, $ret);
	fclose($fp);