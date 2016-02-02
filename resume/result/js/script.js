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
    '<p>Username: Mrdai</p>\\' + '<p>Password: *********</p>\\' + '<p>ACCESS TO SYSTEM</p>\\' + '<p>Initializing...</p>\\' + '<span>press enter to continue</span>\\'],
        text = DOC.getElementById('text'),
        btnBox = DOC.getElementsByClassName('btnBox')[0],
        enterBtn = DOC.getElementsByClassName('enterBtn')[0];

    var Resume = function () {
        function Resume(str, delay, parentNode, showBtn) {
            _classCallCheck(this, Resume);

            this.str = str;
            this.delay = delay;
            this.parentNode = parentNode;
            this.sumReg = /<\w+\s*(\w+=('|")\w+('|")\s*)*>.*<\/\w+>\\/g;
            this.labelReg = /<\w+\s*(\w+=('|")\w+\s*\w*('|")\s*)*>/;
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

    //显示开机画面
    var str0 = resume(str[0], 10, text);
    str0.start();

    //显示登录界面
    setTimeout(function () {
        var str1 = resume(str[1], 10, text, true);
        str1.start();
    }, 7000);

    enterBtn.addEventListener('touchstart', function () {}, false);
})(document);