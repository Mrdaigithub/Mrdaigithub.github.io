import '../sass/express.scss';

(function (WIN, DOC) {
    let expressCompanyData = {
        顺丰: {reg:/^\d{12}$/, name:'shunfeng'},
        韵达: {reg:/^\d{13}$/, name:'yunda'},
        圆通: {reg:/^(0|1|2|3|5|6|7|8|E|D|F|G|V|W|e|d|f|g|v|w)[0-9]{9}$/, name:'yuantong'},
        申通: {reg:/^\d{12}$/, name:'shentong'},
        中通: {reg:/^\d{12}$/, name:'zhongtong'},
        天天: {reg:/^\d{12,14}$/, name:'tiantian'},
        汇通: {reg:/^(A|B|C|D|E|H|0)(D|X|[0-9])(A|[0-9])[0-9]{10}$|^(21|22|23|24|25|26|27|28|29|30|31|32|33|34|35|36|37|38|39)[0-9]{10}$/, name:'汇通'},
        全峰: {reg:/	^\d{10,12}$|^[0-9]{15}$/, name:'quanfeng'},
        德邦物流: {reg:/^\d{8,9}$/, name:'debang'}
    };
    let [select,textBar,btn] = [DOC.querySelector('.weui_select'),DOC.querySelector('.weui_input'),DOC.querySelector('.weui_btn_plain_default')];
    let doms = {
        main: DOC.querySelector('main'),
        succ: DOC.querySelector('.succ'),
        err: DOC.querySelector('.err'),
        expressName: DOC.querySelector('main header h2'),
        expressId: DOC.querySelector('main header small span'),
        expressMsg: DOC.querySelector('main div ul'),
        alert: DOC.querySelector('.weui_dialog_alert')
    };

    /**
     * 获得json数据
     * @param method
     * @param url
     * @param callback
     */
    let getJson  = (method, url, callback)=>{
        let xhr;
        if (window.XMLHttpRequest) {// code for IE7+, Firefox, Chrome, Opera, Safari
            xhr=new XMLHttpRequest();
        }
        else {// code for IE6, IE5
            xhr=new ActiveXObject("Microsoft.XMLHTTP");
        }
        xhr.open(method,url,true);
        xhr.send();
        xhr.onreadystatechange = ()=>{
            if (xhr.readyState === 4 && xhr.status === 200){
                callback(JSON.parse(xhr.responseText));
            }
        }
    };

    /**
     * 隐藏doms
     * @param doms
     */
    let hidedoms = (doms)=>{
        doms.forEach((e)=>{
            if (e.style.display !== 'none'){
                e.style.display = 'none';
            }
        })
    };


    btn.addEventListener('click',()=>{
        let selectName = select.options[select.selectedIndex].text;
        if (expressCompanyData[selectName].reg.test(textBar.value)){
            hidedoms([doms.main,doms.succ,doms.err]);
            getJson('GET','http://139.129.21.118/celecare/server/express.php?type='+expressCompanyData[selectName].name+'&postID='+textBar.value,(data)=>{
                if (parseInt(data.status) === 200){
                    doms.expressName.innerHTML = selectName+'快递';
                    doms.expressId.innerHTML = data.nu;
                    let str = '';
                    data.data.forEach((e)=>{
                        str += '<li><p>'+ e.context +'</p><time>'+ e.time +'</time></li>'
                    });
                    doms.expressMsg.innerHTML = str;
                    doms.expressMsg.children[0].id = 'checked';
                    doms.succ.style.display = 'block';
                }else{
                    doms.err.innerHTML = '<i class="weui_icon_warn"></i>未查询到该运单的信息';
                    doms.err.style.display = 'block';
                }
                doms.main.style.display = 'block';
            })
        }else{
            doms.alert.style.display = 'block';
        }
    },false);

    doms.alert.addEventListener('click',()=>{
        doms.alert.style.display = 'none';
    },false)

})(window,document);