$(document).ready(function(){var a=$(".navbar-nav > li > a");a.mouseover(function(){$(this).next().css({opacity:"1",bottom:"10px"})});a.mouseout(function(){$(this).next().css({opacity:"0",bottom:"0px"})});var b=$(".more");b.mouseover(function(){$(this).find("div").css({opacity:"1",top:"50px"})});b.mouseout(function(){$(this).find("div").css({opacity:"0",top:"60px"})});$(".tabGroup>a").each(function(){$(this).click(function(){$(".tabGroup").find("div").removeClass("tabBtnactive");$(this).find("div").addClass("tabBtnactive")})});$("#tabBtn1").click(function(){console.log("ok");$(".picWrap1").css({opacity:"1"});$(".picWrap2").css({opacity:"1",left:"57%"});$(".picWrap3").css({opacity:"1",top:"46%",left:"0"});$(".picWrap4").css({opacity:"1",top:"46%",left:"30%"})});$("#tabBtn2").click(function(){console.log("ok");$(".picWrap1").css({opacity:"1"});$(".picWrap2").css({opacity:"0"});$(".picWrap3").css({opacity:"0"});$(".picWrap4").css({opacity:"0"})});$("#tabBtn3").click(function(){console.log("ok");$(".picWrap1").css({opacity:"0"});$(".picWrap2").css({opacity:"0"});$(".picWrap3").css({opacity:"1",top:"0",left:"0"});$(".picWrap4").css({opacity:"1",top:"0",left:"30%"})});$("#tabBtn4").click(function(){console.log("ok");$(".picWrap1").css({opacity:"0"});$(".picWrap2").css({opacity:"1",left:"0"});$(".picWrap3").css({opacity:"0"});$(".picWrap4").css({opacity:"0"})});$(".gpic .mask").mouseover(function(){$(this).css({opacity:"1"});$(this).find("h3").css({top:"0"});$(this).find("p").css({top:"0"})});$(".gpic .mask").mouseout(function(){$(this).css({opacity:"0"});$(this).find("h3").css({top:"-10%"});$(this).find("p").css({top:"70%"})});$(".bcont>div>a").mouseover(function(){$(this).find("div").css({opacity:"1",top:"100%"})});$(".bcont>div>a").mouseout(function(){$(this).find("div").css({opacity:"0",top:"150%"})})});