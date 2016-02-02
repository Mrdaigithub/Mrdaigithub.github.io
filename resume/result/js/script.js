'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(function (document) {
    "use strict";

    var DOC = document;

    var str = '<h1 class="green">hello world!</h1>\\',
        text = DOC.getElementById('text');

    var Resume = function () {
        function Resume(str, delay, parentNode) {
            _classCallCheck(this, Resume);

            this.str = str;
            this.delay = delay;
            this.parentNode = parentNode;
            this.sumReg = /<\w+\s*(\w+=('|")\w+('|")\s*)*>.*<\/\w+>\\/g;
            this.labelReg = /<\w+\s*(\w+=('|")\w+('|")\s*)*>/;
            this.contentReg = />.*</;
            this.statements = [];
            this.labels = [];
            this.contents = [];
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
                for (var i = 0; i < this.labels.length; i++) {
                    this.parentNode.innerHTML += this.labels[i];
                }
                return this;
            }

            //打印内容

        }, {
            key: 'printContent',
            value: function printContent(count, contentCount) {
                var that = this;
                if (count > this.statements.length) {
                    return this;
                }
                if (contentCount >= this.contents[count].length) {
                    contentCount = 0;
                    count++;
                }
                console.log(this.parentNode.children[count]);
                this.parentNode.children[count].innerHTML += this.contents[count][contentCount];
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

    var resume = function resume(str, delay, parentNode) {
        return new Resume(str, delay, parentNode);
    };

    var xx = resume(str, 30, text);
    xx.start();
})(document);