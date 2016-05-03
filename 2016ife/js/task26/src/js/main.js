// include

// js
import {Spaceship} from './spaceship.js'

// css
import '../sass/reset.scss';
import '../sass/golbal.scss';
import '../sass/console.scss';
import '../sass/canvas.scss';

let a = new Spaceship();

((WIN,DOC)=>{
    // canvas

    let canvas = $('canvas')[0],
        main = $('main');

    canvas.width = parseInt(main.css('width')) - parseInt($('#console').css('width'));
    canvas.height = parseInt(main.css('height'));
    let ctx = canvas.getContext('2d');

    ctx.fillStyle = '#333';
    ctx.fillRect(0,0,canvas.width,canvas.height);


    let m = {
        x:canvas.width/2,
        y:canvas.height/2
    };

    // 绘制星球
    (()=>{
        ctx.beginPath();
        ctx.arc(m.x,m.y,50,0,2*Math.PI);
        ctx.fillStyle = '#FE6B2A';
        ctx.fill();
    })();

    // 绘制轨道
    (()=>{
        ctx.strokeStyle = '#FFF';
        ctx.beginPath();
        ctx.arc(m.x,m.y,100,0,2*Math.PI);
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(m.x,m.y,150,0,2*Math.PI);
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(m.x,m.y,200,0,2*Math.PI);
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(m.x,m.y,280,0,2*Math.PI);
        ctx.stroke();
    })();
    
    // 绘制飞船
    (()=>{
        $('button').on('click',()=>{
            console.log($(this));
        })
    })();



})(window,document);