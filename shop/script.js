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

    //下拉侧边栏
    var singleList = $('.singleList').children('ul').children('li');
    singleList.bind('click', function (e) {
        var showSingList = $(e.target).next();
        showSingList.toggle('slow');
    });

    //放大镜小图切换
    var toggleMagnifier = $('.toggleMagnifier').children('li');
    var smallMagnifier = $('.smallMagnifier').children('li');
    var bigMagnifier1 = $('.bigMagnifier').children('img');
    //setFlag
    for(var i=0;i<smallMagnifier.length;i++){
        smallMagnifier[i].index = i;
        toggleMagnifier[i].index = i;
        bigMagnifier1[i].index = i;
    }
    var Mag = {
        smallBox : $('.smallMagnifier').get(0),
        trapLayout : $('.trappingLayer').get(0),
        bigMagnifier : $('.bigMagnifier').get(0),
        bigBoxImg : $('.bigMagnifier').children('img').get(0),
    };
    var MyMagnifier = new Magnifier(Mag.smallBox,Mag.trapLayout,Mag.bigMagnifier,Mag.bigBoxImg,1.2);
    toggleMagnifier.bind('mouseover', function () {
        for(var i=0;i<smallMagnifier.length;i++){
            if(toggleMagnifier[i].className === 'fadeIn'){
                toggleMagnifier[i].className = '';
            }
            if(smallMagnifier[i].className === 'show'){
                smallMagnifier[i].className = '';
            }
            if(bigMagnifier1[i].style.zIndex === '99'){
                bigMagnifier1[i].style.zIndex = '0';
                bigMagnifier1[i].style.opacity = '0';
            }
        }
        bigMagnifier1[this.index].style.zIndex = '99';
        bigMagnifier1[this.index].style.opacity = '1';
        toggleMagnifier[this.index].className = 'fadeIn';
        smallMagnifier[this.index].className = 'show';
        //放大镜效果实现
        var Mag = {
            smallBox : $('.smallMagnifier').get(0),
            trapLayout : $('.trappingLayer').get(0),
            bigMagnifier : $('.bigMagnifier').get(0),
            bigBoxImg : $('.bigMagnifier').children('img').get(this.index)
        };
        var MyMagnifier = new Magnifier(Mag.smallBox,Mag.trapLayout,Mag.bigMagnifier,Mag.bigBoxImg,1.2);
    });
});

//               参数说明：smallBox:放小图片的容器
//               trapLayout:小图片上移动的捕获层
//               bigBox:放大图片的容器
//               bigBoxImg:大图片或者其父容器
//               scale:大小图片之比例
function Magnifier (smallBox,trapLayout,bigBox,bigBoxImg,scale){
    this.smallBox = smallBox;
    this.trapLayout = trapLayout;
    this.bigBox = bigBox;
    this.bigBoxImg = bigBoxImg;
    this.scale = scale;
    var that = this;

    //移入小图片的事件
    this.smallBox.addEventListener('mouseover', function (e) {
        Magnifier.prototype.moveInSmallBox(e,that,scale);
        //this.mask.style.display = 'block';
    },false);

    //捕获层移动事件
    this.smallBox.addEventListener('mousemove', function (e) {
        Magnifier.prototype.move(e,that.smallBox,that);
    },false);

    //移出小图片的事件
    this.smallBox.addEventListener('mouseout', function () {
        that.trapLayout.style.display = 'none';
        that.bigBox.style.display = 'none';
    },false);
}

//移入小图片的事件
Magnifier.prototype.moveInSmallBox = function (e,that){
    that.trapLayout.style.display = 'block';
    that.bigBox.style.display = 'block';
    Magnifier.prototype.move(e,that.smallBox,that);
};

//移出小图片的事件
Magnifier.prototype.moveOut = function () {
    this.trapLayout.style.display = 'none';
    this.bigBox.style.display = 'none';
    document.removeEventListener('mousemove', function (e) {
        move(e,smallBox,trapLayout,scale);
    },false);
};

//动画方法
Magnifier.prototype.move = function (e,parent,that) {
    this.sumOffLeft = this.sumOffset(parent,'offsetLeft');
    this.sumOffTop = this.sumOffset(parent,'offsetTop');
    this.layoutX = e.pageX - this.sumOffLeft - that.trapLayout.offsetWidth/2;
    this.layoutY = e.pageY - this.sumOffTop - that.trapLayout.offsetHeight/2;
    if(this.layoutX <= 0){
        this.layoutX = 0;
    }else if(this.layoutX >= that.smallBox.offsetWidth - that.trapLayout.offsetWidth){
        this.layoutX = that.smallBox.offsetWidth - that.trapLayout.offsetWidth;
    }

    if(this.layoutY <= 0){
        this.layoutY = 0;
    }else if(this.layoutY >= that.smallBox.offsetHeight - that.trapLayout.offsetHeight){
        this.layoutY = that.smallBox.offsetHeight - that.trapLayout.offsetHeight;
    }
    that.trapLayout.style.left = that.layoutX + 'px';
    that.trapLayout.style.top = that.layoutY + 'px';
    that.bigBoxImg.style.left = -that.layoutX*that.scale + 'px';
    that.bigBoxImg.style.top = -that.layoutY*that.scale + 'px';
};

//计算多个父元素的offset之和
Magnifier.prototype.sumOffset = function (node,key){
    var sumKey = 0;
    while(node != undefined){
        sumKey += node[key];
        node = node.offsetParent;
    }
    return sumKey;
};