'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(function (document) {
    "use strict";

    var DOC = document;

    var str = [
    //开机内容
    '<h3 class="tc">Welcome Mrdai\'s resume</h3>\\' + '<span>Starting auditd:</span>\\<span class="fr"> ] </span>\\<span class="fr green"> ok </span>\\<span class="fr"> [ </span>\\<p></p>\\' + '<span>Starting restorecond:</span>\\<span class="fr"> ] </span>\\<span class="fr green"> ok </span>\\<span class="fr"> [ </span>\\<p></p>\\' + '<span>Starting system logger:</span>\\<span class="fr"> ] </span>\\<span class="fr green"> ok </span>\\<span class="fr"> [ </span>\\<p></p>\\' + '<span>Starting kernel logger:</span>\\<span class="fr"> ] </span>\\<span class="fr green"> ok </span>\\<span class="fr"> [ </span>\\<p></p>\\' + '<span>Starting irqbalance:</span>\\<span class="fr"> ] </span>\\<span class="fr green"> ok </span>\\<span class="fr"> [ </span>\\<p></p>\\' + '<span>Starting mcstransd:</span>\\<span class="fr"> ] </span>\\<span class="fr green"> ok </span>\\<span class="fr"> [ </span>\\<p></p>\\' + '<span>Starting setroubleshootd:</span>\\<span class="fr"> ] </span>\\<span class="fr green"> ok </span>\\<span class="fr"> [ </span>\\<p></p>\\' + '<span>Starting NFS statd:</span>\\<span class="fr"> ] </span>\\<span class="fr green"> ok </span>\\<span class="fr"> [ </span>\\<p></p>\\' + '<span>RPC idmapd:</span>\\<span class="fr"> ] </span>\\<span class="fr green"> ok </span>\\<span class="fr"> [ </span>\\<p></p>\\' + '<span>Determin IP information for eth0...</span>\\',

    //登录界面
    '<p>Username: Mrdai</p>\\' + '<p>Password: *********</p>\\' + '<p>ACCESS TO SYSTEM</p>\\' + '<p>Initializing...</p>\\' + '<span>press enter to continue</span>\\',

    //信息介绍页面
    '<p>  以下是个人基本信息</p>↓\\' + '<span>姓名: </span>\\<span class="green">戴垚</span>\\<div></div>\\' + '<span>出身: </span>\\<span class="green">1995.4.17</span>\\<div></div>\\' + '<span>性别: </span>\\<span class="green">男</span>\\<div></div>\\' + '<span>名族: </span>\\<span class="green">汉</span>\\<div></div>\\' + '<span>婚姻状况: </span>\\<span class="green">未婚</span>\\<div></div>\\' + '<span>政治面貌: </span>\\<span class="green">团员</span>\\<div></div>\\' + '<span>学历: </span>\\<span class="green">大专</span>\\<div></div>\\' + '<span>专业: </span>\\<span class="green">机械类专业(我是个自学者~)</span>\\<div></div>\\' + '<span>电话: </span>\\<span class="green">15258420950</span>\\<div></div>\\' + '<span>E-mail: </span>\\<span class="green">mrdai346139312@gmail.com</span>\\<div></div>\\' + '<span>github: </span>\\<span class="green">https://github.com/Mrdaigithub</span>\\<div></div>\\' + '<span>press enter to continue</span>\\',

    //技能介绍页面
    '<p class="tc">相关技能</p>↓\\' + '<span>1. </span>\\<span class="green">熟练掌握语义化的 HTML 和具有兼容性的 CSS 模式，熟练手写符合 W3C 标准的结构和代码。</span>\\<div></div>\\' + '<span>2. </span>\\<span class="green">对前端css，js性能优化有一定的了解</span>\\<div></div>\\' + '<span>3. </span>\\<span class="green">掌握sublime Text, Webstorm, photoshop等软件的使用</span>\\<div></div>\\' + '<span>4. </span>\\<span class="green">能使用Sass等css编译工具,gulp前端构建工具,并了解使用es6的一些新特新，如class,module,let,const,箭头函数等..</span>\\<div></div>\\' + '<span>5. </span>\\<span class="green">能使用jQuery等基本库操作dom，实现日常需要的交互效果,也能使用原生js实现各种功能,后面2个作品是由原生js实现，没有借助任何框架及类库.</span>\\<div></div>\\' + '<span>6. </span>\\<span class="green">了解过HTML5的canvas,借助canvas写过微信打飞机游戏</span>\\<div></div>\\' + '<span>7. </span>\\<span class="green">了解 Ajax 工作原理和实现方法,及对应的json的使用</span>\\<div></div>\\' + '<span>8. </span>\\<span class="green">使用过一段时间的CentOS 和 ubuntu,对linux各种常用命令有一定了解</span>\\<div></div>\\' + '<span>9. </span>\\<span class="green">了解过git的工作原理,并使用过一段时间</span>\\<div></div>\\' + '<span>10. </span>\\<span class="green">喜欢接触新事物，有一定的自学能力。</span>\\',

    //作品介绍页面
    '<p class="tc">  下面是个人作品介绍 ↓</p>\\' + '<span> 作品列表 → </span>\\<a href="https://github.com/Mrdaigithub/Mrdaigithub.github.io">this</a>\\' + '<p>1. 游戏类网站的ps切图</p>\\' + '<span>  演示地址: </span>\\<a href="https://mrdaigithub.github.io/games/index.html">this</a>\\<div></div>\\' + '<span>  查看源码: </span>\\<a href="https://github.com/Mrdaigithub/Mrdaigithub.github.io/tree/master/games">this</a>\\' + '<p>2. 购物类网站的ps切图</p>\\' + '<span>  演示地址: </span>\\<a href="https://mrdaigithub.github.io/shop/index.html">this</a>\\<div></div>\\' + '<span>  查看源码: </span>\\<a href="https://github.com/Mrdaigithub/Mrdaigithub.github.io/tree/master/shop">this</a>\\' + '<p>3. 个人任务管理系统 (只兼容pc)</p>\\' + '<span>  演示地址: </span>\\<a href="https://mrdaigithub.github.io/task-pc/index.html">this</a>\\<div></div>\\' + '<span>  查看源码: </span>\\<a href="https://github.com/Mrdaigithub/dai_daiduIfe/tree/master/dai-baiduife/2015_spring/task/task0004/item-pc">this</a>\\' + '<p>4. 微信打飞机游戏</p>\\' + '<span>  演示地址: </span>\\<a href="https://mrdaigithub.github.io/fightPlain/index.html">this</a>\\<div></div>\\' + '<span>  查看源码: </span>\\<a href="https://github.com/Mrdaigithub/Mrdai-games/tree/master/fightPlain">this</a>\\' + '<p>5. linux打字机风格的个人简历</p>\\' + '<span>  演示地址: </span>\\<a href="https://mrdaigithub.github.io/resume/index.html">this</a>\\<div></div>\\' + '<span>  查看源码: </span>\\<a href="https://github.com/Mrdaigithub/Mrdaigithub.github.io/tree/master/resume">this</a>\\'],
        text = DOC.getElementById('text'),
        btnBox = DOC.getElementsByClassName('btnBox')[0],
        enterBtn = DOC.getElementsByClassName('enterBtn')[0];

    var Resume = function () {
        function Resume(str, delay, parentNode, showBtn) {
            _classCallCheck(this, Resume);

            this.str = str;
            this.delay = delay;
            this.parentNode = parentNode;
            this.sumReg = /<\w+\s*(\w+=('|").+('|")\s*)*>.*<\/\w+>\\/g;
            this.labelReg = /<\w+\s*(\w+=('|").+\s*\w*('|")\s*)*>/;
            this.contentReg = />.*</;
            this.statements = [];
            this.labels = [];
            this.contents = [];
            this.showBtn = showBtn || false;
        }

        //得到html语句的数组集合

        _createClass(Resume, [{
            key: 'getStatements',
            value: function getStatements() {
                this.statements = this.sumReg.exec(this.str.substr(0))[0].split('\\');
                this.statements.pop();
                return this;
            }

            //得到html标签的数组集合

        }, {
            key: 'getLabel',
            value: function getLabel() {
                for (var i = 0; i < this.statements.length; i++) {
                    var label = /\w+/.exec(this.labelReg.exec(this.statements[i]))[0],
                        labelsChild = this.labelReg.exec(this.statements[i])[0] + '</' + label + '>';
                    this.labels.push(labelsChild);
                }
                return this;
            }

            //得到html内容的数组集合

        }, {
            key: 'getContent',
            value: function getContent() {
                for (var i = 0; i < this.statements.length; i++) {
                    var content = this.contentReg.exec(this.statements[i])[0];
                    content = content.substring(0, content.length - 1);
                    content = content.substring(1, content.length);
                    this.contents.push(content);
                }
                return this;
            }

            //添加html标签

        }, {
            key: 'addLabels',
            value: function addLabels() {
                this.parentNode.innerHTML = '';
                for (var i = 0; i < this.labels.length; i++) {
                    this.parentNode.innerHTML += this.labels[i];
                }
                return this;
            }

            //添加闪烁的光标在末尾

        }, {
            key: 'addCursor',
            value: function addCursor(bool) {
                if (bool) {
                    var cursor = DOC.createElement('span');
                    cursor.innerHTML = ' _';
                    cursor.className = 'cursor';
                    this.parentNode.appendChild(cursor);
                } else {
                    this.parentNode.removeChild(this.parentNode.children[this.parentNode.children.length - 1]);
                }
            }

            //打印内容

        }, {
            key: 'printContent',
            value: function printContent(count, contentCount) {
                var that = this;
                if (contentCount > this.contents[count].length - 1) {
                    contentCount = 0;
                    count++;
                }
                if (count >= this.statements.length) {
                    if (this.showBtn) {
                        btnBox.style.opacity = 1;
                    }
                    this.addCursor(true);
                    return this;
                }
                if (this.contents[count][contentCount] === ' ') {
                    this.parentNode.children[count].innerHTML += '&nbsp;';
                } else if (!this.contents[count][contentCount]) ;else {
                    this.parentNode.children[count].innerHTML += this.contents[count][contentCount];
                }
                contentCount++;
                setTimeout(function () {
                    that.printContent(count, contentCount);
                }, this.delay);
            }
        }, {
            key: 'start',
            value: function start() {
                this.getStatements().getLabel().getContent().addLabels().printContent(0, 0);
            }
        }]);

        return Resume;
    }();

    var resume = function resume(str, delay, parentNode, showBtn) {
        return new Resume(str, delay, parentNode, showBtn);
    };

    var count = 2;
    //显示开机画面
    var xx = resume(str[0], 10, text);
    xx.start();

    //显示登录界面
    setTimeout(function () {
        var print = resume(str[1], 10, text, true);
        print.start();
    }, 7000);

    enterBtn.addEventListener('touchend', function () {
        btnBox.style.opacity = 0;
        if (count === 4) {
            var print = resume(str[count], 10, text);
            print.start();
        } else {
            var print = resume(str[count], 10, text, true);
            print.start();
            count++;
        }
    }, false);
})(document);