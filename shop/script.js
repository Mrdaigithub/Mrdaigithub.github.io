$(document).ready(function(){$(".menuBtn").hover(function(){$(this).find("div").stop().fadeIn(400)},function(){$(this).find("div").stop().fadeOut(400)});$("#menuBtn").get(0).ontouchend=function(){$(this).nextAll().toggle(400);$(this).nextAll().children("div").remove()};var c=/Android|iPhone|iPad|system|Windows Phone|SymbianOS|Mobile/g;var a=navigator.userAgent;var b=(a.search(c)==-1)?false:true;var d=document.getElementById("bannerImg");d.onload=function(){var e=$(".banner").find("img").get(0).clientHeight;$(".banner").css({height:e});var f=0;if(!b){$(".prevBtn").click(function(){f--;if(f<0){f=2}$($(".banner").find("img")[f]).fadeIn(500);$(".banner img").eq(f).siblings("img").fadeOut(500)});$(".nextBtn").click(function(){f++;if(f>2){f=0}$($(".banner").find("img")[f]).fadeIn(500);$(".banner img").eq(f).siblings("img").fadeOut(500)});setInterval(function(){f++;if(f!=3){$(".banner img").eq(f).fadeIn(500);$(".banner img").eq(f).siblings("img").fadeOut(500)}else{f=0;$(".banner img").eq(f).fadeIn(500);$(".banner img").eq(f).siblings("img").fadeOut(500)}},3000)}else{}};d.src="images/banner1.jpg"});