<<<<<<< HEAD
$(document).ready(function(){$(".menuBtn").hover(function(){$(this).find("div").stop().fadeIn(400)},function(){$(this).find("div").stop().fadeOut(400)});$("#menuBtn").get(0).ontouchend=function(){$(this).nextAll().toggle(400);$(this).nextAll().children("div").remove()};var c=/Android|iPhone|iPad|system|Windows Phone|SymbianOS|Mobile/g;var a=navigator.userAgent;var b=(a.search(c)==-1)?false:true;var d=document.getElementById("bannerImg");d.onload=function(){var e=$(".banner").find("img").get(0).clientHeight;$(".banner").css({height:e});var f=0;if(!b){$(".prevBtn").click(function(){f--;if(f<0){f=2}$($(".banner").find("img")[f]).fadeIn(500);$(".banner img").eq(f).siblings("img").fadeOut(500)});$(".nextBtn").click(function(){f++;if(f>2){f=0}$($(".banner").find("img")[f]).fadeIn(500);$(".banner img").eq(f).siblings("img").fadeOut(500)});setInterval(function(){f++;if(f!=3){$(".banner img").eq(f).fadeIn(500);$(".banner img").eq(f).siblings("img").fadeOut(500)}else{f=0;$(".banner img").eq(f).fadeIn(500);$(".banner img").eq(f).siblings("img").fadeOut(500)}},3000)}else{}};d.src="images/banner1.jpg"});
=======
$(document).ready(function () {
    //分辨率大于480px的下拉菜单
    $('.menuBtn').hover(function () {
        $(this).find('div').stop().fadeIn(400);
    }, function () {
        $(this).find('div').stop().fadeOut(400);
    });

    //分辨率小于480px的下拉菜单
    $('#menuBtn').get(0).ontouchend = function () {
        $(this).nextAll().toggle(400);
        $(this).nextAll().children('div').remove(); //无奈之举~
    };

    var reg = /Android|iPhone|iPad|system|Windows Phone|SymbianOS|Mobile/g;
    var system = navigator.userAgent;
    var bool = (system.search(reg) == -1)? false : true;
    //焦点轮播图
    var bannerImg = document.getElementById('bannerImg');

    //控制容器自适应
    bannerImg.onload = function () {
        alert('ok');
        var bannerHeight = $('.banner').find('img').get(0).clientHeight;
        $('.banner').css({'height':bannerHeight});

        var i = 0;
        //pc端
        if(!bool){
            $('.prevBtn').click(function(){
                i--;
                if(i < 0){
                    i = 2;
                }
                $($('.banner').find('img')[i]).fadeIn(500);
                $('.banner img').eq(i).siblings('img').fadeOut(500);
            });

            $('.nextBtn').click(function(){
                i++;
                if(i>2){
                    i = 0;
                }
                $($('.banner').find('img')[i]).fadeIn(500);
                $('.banner img').eq(i).siblings('img').fadeOut(500);
            });

            setInterval(function () {
                i++;
                if(i != 3){
                    $('.banner img').eq(i).fadeIn(500);
                    $('.banner img').eq(i).siblings('img').fadeOut(500);
                }else{
                    i = 0;
                    $('.banner img').eq(i).fadeIn(500);
                    $('.banner img').eq(i).siblings('img').fadeOut(500);
                }
            },3000)
        }
        //移动端优化
    };
    bannerImg.src = 'images/banner1.jpg';
});
>>>>>>> parent of d190e88... 1.565
