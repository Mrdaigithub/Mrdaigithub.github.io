//               参数说明：smallBox:放小图片的容器
//               trapLayout:小图片上移动的捕获层
//               bigBox:放大图片的容器
//               bigBoxImg:大图片或者其父容器
//               scale:大小图片之比例
function Magnifier (smallBox,trapLayout,bigBox,bigBoxImg,scale){
    this.smallBox = document.getElementById(smallBox);
    this.trapLayout = document.getElementById(trapLayout);
    this.bigBox = document.getElementById(bigBox);
    this.bigBoxImg = document.getElementById(bigBoxImg);
    this.scale = scale;
    var that = this;

    //移入小图片的事件
    this.smallBox.addEventListener('mouseover', function (e) {
        Magnifier.prototype.moveInSmallBox(e,that,scale);
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
    bigBox.style.display = 'block';
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
Magnifier.prototype.sumOffset = function (parent,key){
    var sumKey = null;
    while(parent !== document){
        sumKey += parent[key];
        parent = parent.parentNode;
    }
    return sumKey;
};