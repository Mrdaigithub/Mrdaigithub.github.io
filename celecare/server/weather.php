<?php
require 'index.php';
header("Access-Control-Allow-Origin:http://mrdaigithub.github.io");
$result = ajax(rtrim($_GET["city"],'市'));
echo $result;
?>