```php
<?php 

#######上传文件#########
# https://coderwall.com/p/fck2ta/how-to-send-files-via-curl-in-php
# 如果是通过http上传的图片，则要先保存，然后再curl，不然失败
# 如果是本地的文件，则直接@filepath就行了
$filename = realpath('uploaded').DIRECTORY_SEPARATOR.$_FILES['file']['name'];
if (move_uploaded_file($_FILES['file']['tmp_name'], $filename))
{
	// 上传图片
	$ch = curl_init();
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
	curl_setopt($ch, CURLOPT_URL, 'http://static.app.com/upload?type=image&scenes=oa&output_type=json');
	curl_setopt($ch, CURLOPT_POSTFIELDS, [
		'file' => '@'.$filename     ### 核心地方
	]);
	curl_setopt($ch, CURLOPT_TIMEOUT, 10);
	$upload_result = json_decode(curl_exec($ch), TRUE);

	unlink($filename);
}




