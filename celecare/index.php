<?php

$access_token = "bp8_GzIW7KwH-THJeLz4Xir_NdxGGK-JzC5t6vGKmwUpgArV7bnZw50w6OlFa3J-WUvaCbZy0rwUDBTm3CFy4siwogcokjl0T7d-ToAw8ywJRJfAEAYGY";
$apikey = "f0da4c8380c45337026f48806debf023";

/**
 * 验证服务器
 * @return bool
 */
function accessServer(){
    $signature = $_GET["signature"];
    $timestamp = $_GET["timestamp"];
    $nonce = $_GET["nonce"];
    $echostr = $_GET["echostr"];

    $token = 'mrdai';
    $tmpArr = array($token, $timestamp, $nonce);
    sort($tmpArr, SORT_STRING);
    $tmpStr = implode( $tmpArr );
    $tmpStr = sha1( $tmpStr );

    if( $tmpStr == $signature ){
        echo $echostr;
        return true;
    }else{
        return false;
    }
}

/**
 * 获得access_token
 * @return mixed
 */
function getAccessToken(){
    $appID = 'wx344ba4da84bb6782';
    $appsecret = 'e8f48ca9bc91a0cbdecac5341d090951';
    $url = "https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=$appID&secret=$appsecret";
    $ch = curl_init();
    curl_setopt($ch,CURLOPT_URL,$url);
    curl_setopt($ch,CURLOPT_HEADER,false);
    curl_setopt($ch,CURLOPT_RETURNTRANSFER,1);
    $result = curl_exec($ch);
    curl_close($ch);
    return json_decode($result)->access_token;
}

/**
 * 打印日志
 * @param $str
 * @return int
 *
 */
function printLog($str){
    $file = fopen('text.txt','w') or die('err');
    $result = fwrite($file,$str);
    fclose($file);
    return $result;
}

/**
 * 获取得到的get数据
 * @param $url
 * @param $data
 * @return mixed
 */
function getGetData($url,$header,$data){
    $requestStr = $url."?";
    $data = json_decode($data);
    foreach ($data as $key=>$value){
        $requestStr .= "$key=$value&";
    }
    $requestStr = substr($requestStr,0,-1);

    $ch = curl_init();
    if ($header){
        curl_setopt($ch,CURLOPT_HTTPHEADER,$header);
    }
    curl_setopt($ch,CURLOPT_URL,$requestStr);
    curl_setopt($ch,CURLOPT_RETURNTRANSFER,1);
    $result = curl_exec($ch);
    curl_close($ch);
    return $result;
}

/**
 * 图灵机器人
 * @param $data
 * @return mixed
 */
function chatRobot($data){
    return json_decode(getGetData('http://www.tuling123.com/openapi/api',null,$data));
}

/**
 * 生成将发送的文本信息
 * @param $toUserName
 * @param $fromUserName
 * @param $content
 * @return string
 */
function replyText($toUserName,$fromUserName,$contentBag){
    $data = "<xml>
<ToUserName><![CDATA[%s]]></ToUserName>
<FromUserName><![CDATA[%s]]></FromUserName>
<CreateTime>%s</CreateTime>
<MsgType><![CDATA[text]]></MsgType>
<Content><![CDATA[%s]]></Content>
</xml>";
    if ($contentBag->text){
        $str = $contentBag->text;
    }else{
        $str = $contentBag;
    }

    if ($contentBag->url){
        $str .= "$contentBag->text<a href='$contentBag->url'>点这里</a>";
    }
    $result =  sprintf($data,$toUserName,$fromUserName,time(),$str);

    return $result;
}

/**
 * 生成将发送的图文消息
 * @param $toUserName
 * @param $fromUserName
 * @param $items
 * @return string
 */
function replyArticle($toUserName,$fromUserName,$items){
    $singleItem = "<item>
<Title><![CDATA[%s]]></Title> 
<Description><![CDATA[%s]]></Description>
<PicUrl><![CDATA[%s]]></PicUrl>
<Url><![CDATA[%s]]></Url>
</item>";
    $data = "<xml>
<ToUserName><![CDATA[%s]]></ToUserName>
<FromUserName><![CDATA[%s]]></FromUserName>
<CreateTime>%s</CreateTime>
<MsgType><![CDATA[news]]></MsgType>
<ArticleCount>%s</ArticleCount>
<Articles>";
    $data = sprintf($data,$toUserName,$fromUserName,time(),count($items));
    for ($i=0;$i<count($items);$i++){
        $data .= sprintf($singleItem,$items[$i]["title"],$items[$i]["description"],$items[$i]["picUrl"],$items[$i]["url"]);
    }
    $data .= "</Articles>
</xml>";
    return sprintf($data,$toUserName,$fromUserName,time(),"title","https://cbu01.alicdn.com/img/ibank/2016/831/656/2947656138_923607316.jpg","https://detail.1688.com/offer/43481263509.html");
}

/**
 * 创建菜单
 * @param $access_token
 * @return mixed
 */
function menu($access_token){
    $menuData = ' {
     "button":[{
         "name":"公司网站",
         "sub_button":[
             {
                 "name":"官方网站",
                 "type":"view",
                 "url":"http://www.celecare.com"
             },
             {
                 "name":"1688主页",
                 "type":"view",
                 "url":"https://celecare.1688.com/"
             }
         ]
     },
     {
         "name":"看看产品 ↑",
         "sub_button":[
             {
                 "name":"造口袋系列",
                 "type":"view",
                 "url":"https://detail.1688.com/offer/1294987938.html"
             },
             {
                 "name":"婴幼儿蓝光系列",
                 "type":"view",
                 "url":"https://celecare.1688.com/page/offerlist_73388631.htm"
             },
             {
                 "name":"泡沫压疮贴",
                 "type":"view",
                 "url":"https://celecare.1688.com/page/offerlist_4747939.htm"
             },
             {
                 "name":"医用胶布PU膜",
                 "type":"view",
                 "url":"https://detail.1688.com/offer/1189738023.html"
             }
         ]
     },
     {
         "name":"其他功能",
         "sub_button":[
             {
                 "name":"轻松一下...",
                 "type":"view",
                 "url":"http://mrdaigithub.github.io/fightPlain/index.html"
             },
             {
                 "name":"查点什么",
                 "type":"view",
                 "url":"http://139.129.21.118/celecare/query/pages/index.html"
             }
         ]
     }
     ]
    }';
    $url = "https://api.weixin.qq.com/cgi-bin/menu/create?access_token=$access_token";

    $ch = curl_init();

    curl_setopt($ch,CURLOPT_URL,$url);
    curl_setopt($ch,CURLOPT_RETURNTRANSFER,0);
    curl_setopt($ch,CURLOPT_POST,0);
    curl_setopt($ch,CURLOPT_POSTFIELDS,$menuData);

    $result = curl_exec($ch);
    curl_close($ch);
    return $result;
}

/**
 * 回复消息
 */
function meg(){
    $posStr = file_get_contents("php://input");
    $posObj = simplexml_load_string($posStr);
    if (!empty($posStr)){
        $toUser = trim($posObj->FromUserName);
        $fromUser = trim($posObj->ToUserName);

        //关注事件
        if (trim($posObj->MsgType) == 'event'){
            //订阅公众号
            if (trim($posObj->Event) == 'subscribe'){
                echo replyText($toUser,$fromUser,"欢迎来到施乐康,我是机智的施乐康机器人~");
            }
        }

        //答非所问
        if (trim($posObj->MsgType) == 'text'){
            $textContent = trim($posObj->Content);

            if (preg_match("/.*celecare.*|.*施乐.*|.*公司.*|.*us.*|.*company.*/i",$textContent)){
                $items = array(
                    array("title"=>"施乐康","description"=>"温州施乐康医疗器械有限公司","picUrl"=>"https://mmbiz.qlogo.cn/mmbiz/wpUmib3CnicibbO1WxEguneaMV5SAJNMt4XKQ7olglc49ypRwJgohZ7cWcfE1KichxLYHwPo5nTglZFibiasP4TLVYIg/0?wx_fmt=jpeg","url"=>"http://www.celecare.com")
                );
                echo replyArticle($toUser,$fromUser,$items);
            }elseif (preg_match("/.*袋.*|.*pouch.*|.*造口.*|.*肛门.*|.*菊花.*/i",$textContent)){
                $items = array(
                    array("title"=>"一件式闭口造口袋","description"=>"一件式闭口造口袋","picUrl"=>"https://mmbiz.qlogo.cn/mmbiz/wpUmib3CnicibbO1WxEguneaMV5SAJNMt4X5kjgapGeFqn0qibibFnvTia7ZLeSRlwnibfcu8Wnyn9UL3jW8LXQliaE0Zw/0?wx_fmt=jpeg","url"=>"https://detail.1688.com/offer/1294987938.html"),
                    array("title"=>"一件式开口造口袋","description"=>"一件式开口造口袋","picUrl"=>"https://mmbiz.qlogo.cn/mmbiz/wpUmib3CnicibbO1WxEguneaMV5SAJNMt4XnOBSicXN1QGC0dwWsR7SFNBM1I9qh2KzIPibjlkGeejDMFkkUTlGibdbA/0?wx_fmt=jpeg","url"=>"https://detail.1688.com/offer/1294987218.html"),
                    array("title"=>"一件式开口造口袋","description"=>"一件式开口造口袋","picUrl"=>"https://cbu01.alicdn.com/img/ibank/2016/526/314/2959413625_923607316.jpg","url"=>"https://detail.1688.com/offer/530380995193.html"),
                    array("title"=>"二件式开口造口袋","description"=>"二件式开口造口袋","picUrl"=>"https://cbu01.alicdn.com/img/ibank/2016/627/122/2952221726_923607316.jpg","url"=>"https://detail.1688.com/offer/887883740.html"),
                    array("title"=>"一件式泌尿造口袋体","description"=>"一件式泌尿造口袋体","picUrl"=>"https://cbu01.alicdn.com/img/ibank/2016/623/846/2951648326_923607316.400x400.jpg","url"=>"https://detail.1688.com/offer/887886334.html")
                );
                echo replyArticle($toUser,$fromUser,$items);

            }elseif (preg_match("/.*防水.*|.*肚脐.*|.*navel.*/i",$textContent)){
                $items = array(
                    array("title"=>"防水婴儿肚脐贴","description"=>"防水婴儿肚脐贴","picUrl"=>"https://cbu01.alicdn.com/img/ibank/2016/563/748/2959847365_923607316.400x400.jpg","url"=>"https://detail.1688.com/offer/530479414431.html")
                );
                echo replyArticle($toUser,$fromUser,$items);

            }elseif (preg_match("/.*水胶体.*|.*辅料.*|.*敷料.*|.*hydrocolloid.*/i",$textContent)){
                $items = array(
                    array("title"=>"pu膜","description"=>"pu膜","picUrl"=>"https://cbu01.alicdn.com/img/ibank/2016/241/062/2963260142_923607316.400x400.jpg","url"=>"https://detail.1688.com/offer/1189738023.html"),
                    array("title"=>"水胶体辅料","description"=>"水胶体辅料","picUrl"=>"https://cbu01.alicdn.com/img/ibank/2016/766/442/2956244667_923607316.400x400.jpg","url"=>"https://detail.1688.com/offer/807567813.html")
                );
                echo replyArticle($toUser,$fromUser,$items);

            }elseif (preg_match("/.*胶布.*|.*pu.*|.*tape.*/i",$textContent)){
                $items = array(
                    array("title"=>"pu膜","description"=>"pu膜","picUrl"=>"https://cbu01.alicdn.com/img/ibank/2016/241/062/2963260142_923607316.400x400.jpg","url"=>"https://detail.1688.com/offer/1189738023.html")
                );
                echo replyArticle($toUser,$fromUser,$items);

            }elseif (preg_match("/.*泡沫.*|.*疮.*|.*paste.*/i",$textContent)){
                $items = array(
                    array("title"=>"褥疮贴","description"=>"褥疮贴","picUrl"=>"https://cbu01.alicdn.com/img/ibank/2016/540/438/2953834045_923607316.400x400.jpg","url"=>"https://detail.1688.com/offer/41512161820.html"),
                    array("title"=>"褥疮压疮贴","description"=>"褥疮压疮贴","picUrl"=>"https://cbu01.alicdn.com/img/ibank/2016/630/361/2816163036_923607316.400x400.jpg","url"=>"https://detail.1688.com/offer/40751428618.html")
                );
                echo replyArticle($toUser,$fromUser,$items);

            }elseif (preg_match("/.*足.*|.*跟贴.*/i",$textContent)){
                $items = array(
                    array("title"=>"足跟贴","description"=>"足跟贴","picUrl"=>"https://cbu01.alicdn.com/img/ibank/2016/062/031/2955130260_923607316.400x400.jpg","url"=>"https://detail.1688.com/offer/1266580308.html")
                );
                echo replyArticle($toUser,$fromUser,$items);

            }elseif (preg_match("/.*痘.*|.*隐形.*|.*疤.*/i",$textContent)){
                $items = array(
                    array("title"=>"隐形痘痘疤痕贴","description"=>"隐形痘痘疤痕贴","picUrl"=>"https://cbu01.alicdn.com/img/ibank/2016/874/222/2950222478_923607316.400x400.jpg","url"=>"https://detail.1688.com/offer/1179257116.html")
                );
                echo replyArticle($toUser,$fromUser,$items);

            }elseif (preg_match("/.*儿.*|.*蓝光.*|.*孩.*/i",$textContent)){
                $items = array(
                    array("title"=>"婴幼儿蓝光纸尿裤","description"=>"婴幼儿蓝光纸尿裤","picUrl"=>"https://cbu01.alicdn.com/img/ibank/2016/831/656/2947656138_923607316.400x400.jpg","url"=>"https://detail.1688.com/offer/43481263509.html"),
                    array("title"=>"婴幼儿蓝光纸尿裤","description"=>"婴幼儿蓝光纸尿裤","picUrl"=>"https://cbu01.alicdn.com/img/ibank/2016/865/726/2944627568_923607316.400x400.jpg","url"=>"https://detail.1688.com/offer/530466904657.html"),
                    array("title"=>"条形蓝光眼罩","description"=>"条形蓝光眼罩","picUrl"=>"https://cbu01.alicdn.com/img/ibank/2016/616/626/2947626616_923607316.400x400.jpg","url"=>"https://detail.1688.com/offer/528013360640.html"),
                    array("title"=>"网状型蓝光眼罩","description"=>"网状型蓝光眼罩","picUrl"=>"https://cbu01.alicdn.com/img/ibank/2016/326/746/2947647623_923607316.400x400.jpg","url"=>"https://detail.1688.com/offer/528446012153.html"),
                    array("title"=>"皮型眼罩","description"=>"皮型眼罩","picUrl"=>"https://cbu01.alicdn.com/img/ibank/2016/020/936/2945639020_923607316.400x400.jpg","url"=>"https://detail.1688.com/offer/38185205563.html")
                );
                echo replyArticle($toUser,$fromUser,$items);

            }elseif (preg_match("/.*眼罩.*/i",$textContent)){
                $items = array(
                    array("title"=>"条形蓝光眼罩","description"=>"条形蓝光眼罩","picUrl"=>"https://cbu01.alicdn.com/img/ibank/2016/616/626/2947626616_923607316.400x400.jpg","url"=>"https://detail.1688.com/offer/528013360640.html"),
                    array("title"=>"网状型蓝光眼罩","description"=>"网状型蓝光眼罩","picUrl"=>"https://cbu01.alicdn.com/img/ibank/2016/326/746/2947647623_923607316.400x400.jpg","url"=>"https://detail.1688.com/offer/528446012153.html"),
                    array("title"=>"隐形痘痘疤痕贴","description"=>"鱼形蓝光眼罩","picUrl"=>"https://cbu01.alicdn.com/img/ibank/2016/950/966/2945669059_923607316.400x400.jpg","url"=>"https://detail.1688.com/offer/528364603501.html"),
                    array("title"=>"皮型眼罩","description"=>"皮型眼罩","picUrl"=>"https://cbu01.alicdn.com/img/ibank/2016/020/936/2945639020_923607316.400x400.jpg","url"=>"https://detail.1688.com/offer/38185205563.html")
                );
                echo replyArticle($toUser,$fromUser,$items);

            }elseif (preg_match("/.*尿.*/i",$textContent)){
                $items = array(
                    array("title"=>"婴幼儿蓝光纸尿裤","description"=>"婴幼儿蓝光纸尿裤","picUrl"=>"https://cbu01.alicdn.com/img/ibank/2016/831/656/2947656138_923607316.400x400.jpg","url"=>"https://detail.1688.com/offer/43481263509.html"),
                    array("title"=>"婴幼儿蓝光纸尿裤","description"=>"婴幼儿蓝光纸尿裤","picUrl"=>"https://cbu01.alicdn.com/img/ibank/2016/865/726/2944627568_923607316.400x400.jpg","url"=>"https://detail.1688.com/offer/530466904657.html")
                );
                echo replyArticle($toUser,$fromUser,$items);

            }elseif (preg_match("/.*郑.*|.*老板.*.*经理.*|.*联系.*|.*号码.*|.*phone.*|.*tel.*|.*boss.*/i",$textContent)){
                echo replyText($toUser,$fromUser,"18042339139");

            }elseif (preg_match("/mrdai/i",$textContent)){
                echo replyText($toUser,$fromUser,"这是作者的邮箱 mrdai346139312@gmail.com ^_^");

            }elseif (preg_match("/google|谷歌/i",$textContent)){
                echo replyText($toUser,$fromUser,"谷歌大法好!!!");

            }else{
                $data = json_encode(array("key"=>"58c16f60474b0f70adad9dd121501271","info"=>$textContent,"userid"=>"123"));
                echo replyText($toUser,$fromUser,chatRobot($data));
            }
        }
    }else{
        echo "";
    }
}

/**
 *处理ajax数据
 */
function ajax($q){
    $data = array("city"=>$q);
    json_encode($data);
    $header = array(
        'apikey: f0da4c8380c45337026f48806debf023'
    );
    $res = getGetData("http://apis.baidu.com/heweather/weather/free",$header,json_encode($data));
    if(!json_decode($res)){
        ajax($q);
    }else{
        echo $res;
    }
}


//初始化
//accessServer();
//echo getAccessToken();
//menu($access_token);
ajax(rtrim($_GET["city"],'市'));
meg();

/**
 * 快递查询api
 */
function a(){
    $url = 'http://www.kuaidi100.com/query?type=zhongtong&postid=719319307646 ';
    $ch = curl_init();
    curl_setopt($ch,CURLOPT_URL,$url);
    curl_setopt($ch,CURLOPT_RETURNTRANSFER,1);
    $res = curl_exec($ch);
    curl_close($ch);
    var_dump($res);
}
//a();
?>
