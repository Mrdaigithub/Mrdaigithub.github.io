
$(document).ready(function () {
    //分辨率大于480px的下拉菜单
    $('.menuBtn').hover(function () {
        $(this).find('div').stop().fadeIn(400);
    }, function () {
        $(this).find('div').stop().fadeOut(400);
    });

    //分辨率小于480px的下拉菜单
    $('#menuBtn').click(function () {
        console.log('ok');
        $(this).nextAll().toggle(400);
        $(this).nextAll().children('div').remove(); //无奈之举~
    })

    //焦点轮播图
    
})