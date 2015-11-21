$(document).ready(function(){
    //焦点轮播图
    var bannerImg = document.getElementById('bannerImg');
    var system = navigator.userAgent;
    var reg = /Android|iPhone|iPad|system|Windows Phone|SymbianOS|Mobile/g;
    var bool = (system.search(reg) == -1)? false : true;
//控制容器自适应
    bannerImg.onload = function () {
        var bannerHeight = $('.banner').find('img').get(0).clientHeight;
        $('.banner').css({'height':bannerHeight});
        var i = 0;

        if(!bool){
            //pc端
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
    };
    bannerImg.src = 'images/banner1.jpg';
});