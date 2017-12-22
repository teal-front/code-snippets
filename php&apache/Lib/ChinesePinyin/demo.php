<?php

include 'ChinesePinyin.class.php';

$Pinyin = new ChinesePinyin();
$words = explode(";", file_get_contents("names.txt"));
$excludeWords = array("BOSS", "朱伟");
$result = array();
$mails = "";

$words = array_filter($words, function ($word) {
    global $excludeWords;
    if (in_array($word, $excludeWords)) {
        return false;
    }
    return true;
});
foreach($words as $word) {
    $result[] = $Pinyin -> TransformWithoutTone($word, "");
}
foreach($result as $name) {
    $name = $name . "@xxx.cn; ";
    $mails = $mails . $name;
}
file_put_contents("mailList.txt", $mails);
echo("result: \n" . $mails);
