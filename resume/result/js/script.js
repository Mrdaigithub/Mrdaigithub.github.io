'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(function (window, document) {
    "use strict";

    var WIN = window,
        DOC = document;
    var btnBox = document.getElementsByClassName('btnBox')[0],
        enterBtn = btnBox.children[0],
        text = document.getElementById('text'),
        str = ['Hello world!\n 这是Mrdai的个人简历,这个简历暂不支持pc端\n press enter to continue\n\n', '以下是详细的个人介绍↓\n\n' + '  姓 名:林卿\n ' + '  民 族:汉 族\n' + '  性别:男\n' + '  出生日期:1987-09-22\n' + '  居住地:上海\n' + '  学 历:本科\n' + '  身高、体重:172CM、72KG\n' + '  专 业:计算机科学技术\n' + '  工作经验:5年\n' + '  毕业院校:上海复旦大学继续教育学院\n' + '  婚姻状况:已婚\n' + '  求职意向:前端制作/开发；前端主管\n' + '  目前状态:观望更好的工作机会\n' + '  联系电话:13661472175\n' + '  邮箱:Lancer07@126.com\n' + 'github:\n' + '  DIV+LESS 小黄人构造器 http://lancer07.github.io/css3Minons/\n' + '  DIV+CSS3 小丸子和爷爷 http://lancer07.github.io/css3_Chi-biMaruko/\n' + '语言能力:' + '  普通话：标准；上海话：精通；英语：大学英语四级' + '专业技能:\n' + '  1.掌握JavaScript语言、善用jQuery、Avalon、Vue、RequireJS、BootStrap 等框架\n' + '  2.熟练运用Photoshop、Sublime text、Atom、Firebug等常用网页设计制作软件。\n' + '  3.精通HTML+CSS网页布局与样式，了解HTML5与CSS3.0。\n' + '  4.了解 Yeoman+Bower+Gulp，FIS等前端自动化解决方案\n' + '  5.有一定的网页设计能力，偏向欧美简约风格。\n' + '  6.善用Axure RP、Sketcher等工具制作网站原型。'];

    var Resume = function () {
        function Resume(content, delay, parentNode) {
            _classCallCheck(this, Resume);

            this.content = content;
            this.delay = delay;
            this.parentNode = parentNode;
            return this;
        }

        _createClass(Resume, [{
            key: 'print',
            value: function print(count) {
                var that = this;
                if (count >= this.content.length) {
                    //出现闪烁的光标
                    var cursor = DOC.createElement('span');
                    cursor.className = 'cursor';
                    cursor.innerHTML = '_';
                    this.parentNode.appendChild(cursor);
                    btnBox.style.opacity = 1;
                    return 0;
                }
                if (/\n/.test(this.content[count])) {
                    this.parentNode.innerHTML += '<br>';
                } else if (/\s/.test(this.content[count])) {
                    this.parentNode.innerHTML += '&nbsp';
                } else {
                    this.parentNode.innerHTML += this.content[count];
                }
                count++;
                setTimeout(function () {
                    that.print(count);
                }, this.delay);
            }
        }, {
            key: 'start',
            value: function start() {
                this.print(0);
            }
        }]);

        return Resume;
    }();

    var resume = function resume(textStyle, delay, parentNode) {
        return new Resume(textStyle, delay, parentNode);
    };

    var printText = resume(str[0], 30, text);
    printText.start();

    enterBtn.addEventListener('touchstart', function () {
        //隐藏enter按钮
        btnBox.style.opacity = 0;
        //删除闪烁光标
        text.removeChild(text.getElementsByClassName('cursor')[0]);
        printText = resume(str[1], 30, text);
        printText.start();
    }, false);
})(window, document);