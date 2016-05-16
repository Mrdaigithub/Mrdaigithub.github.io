<?php
header("Access-Control-Allow-Origin:http://mrdaigithub.github.io");
require 'index.php';

/**
 * 快递查询api
 */
function express($id,$type){
    $url = "http://www.kuaidi100.com/query?type=$type&postid=$id";
    $ch = curl_init();
    curl_setopt($ch,CURLOPT_URL,$url);
    curl_setopt($ch,CURLOPT_RETURNTRANSFER,1);
    $res = curl_exec($ch);
    curl_close($ch);
    return $res;
}

function query($postID,$type){
    $result = express($postID,$type);
    if (json_decode($result)->status != '200'){
        $result = express($postID,$type);
    }
    return $result;
}
$id = $_GET['postID'];
$type = $_GET['type'];
echo query($id,$type);
?>