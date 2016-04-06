'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// 任务描述
//
// 基于任务18进行升级
// 将新元素输入框从input改为textarea
// 允许一次批量输入多个内容，格式可以为数字、中文、英文等，可以通过用回车，逗号（全角半角均可），顿号，空格（全角半角、Tab等均可）等符号作为不同内容的间隔
// 增加一个查询文本输入框，和一个查询按钮，当点击查询时，将查询词在各个元素内容中做模糊匹配，将匹配到的内容进行特殊标识，如文字颜色等。举例，内容中有abcd，查询词为ab或bc，则该内容需要标识

(function (WIN, DOC) {
    var form = DOC.getElementById('form'),
        text = DOC.getElementById('text');

    var Team = function () {
        function Team() {
            _classCallCheck(this, Team);

            this.list = DOC.getElementById('list');
            this.arr = [];
            this.val = '';
        }

        /**
         *
         */


        _createClass(Team, [{
            key: 'getVal',
            value: function getVal() {
                this.val = text.value.trim();
                console.log(this.val);
                this.arr = this.val.split(/,+|，+|`+|\s+/);
                for (var i = 0; i < this.arr.length; i++) {
                    if (this.arr[i] === '') {
                        this.arr.splice(i, 1, 0);
                    }
                }
                console.log(this.arr);
                return this.arr;
            }

            /**
              * 右侧入
             * @param data
             * @returns {*}
             */

        }, {
            key: 'push',
            value: function push(data) {
                this.arr.push(data);
                this.render();
                return data;
            }

            /**
             * 右侧出
             * @returns {T}
             */

        }, {
            key: 'pop',
            value: function pop() {
                var val = this.arr.pop();
                this.render();
                alert(val);
                return val;
            }

            /**
             * 左侧入
             * @param data
             * @returns {*}
             */

        }, {
            key: 'unshift',
            value: function unshift(data) {
                this.arr.unshift(data);
                this.render();
                return data;
            }

            /**
             * 左侧出
             * @returns {*|T}
             */

        }, {
            key: 'shift',
            value: function shift() {
                var val = this.arr.shift();
                this.render();
                alert(val);
                return val;
            }
        }, {
            key: 'rmEverything',
            value: function rmEverything() {
                var _this = this;

                this.list.addEventListener('click', function (event) {
                    var e = WIN.event || event;
                    if (e.target.nodeName === 'LI') {
                        var val = e.target.innerHTML;
                        _this.list.removeChild(e.target);
                        alert(val);
                    }
                }, false);
            }

            /**
             * 重绘
             * @returns {boolean}
             */

        }, {
            key: 'render',
            value: function render() {
                var str = '';
                this.arr.forEach(function (e) {
                    str += '<li>' + e + '</li>';
                });
                this.list.innerHTML = str;
                return true;
            }
        }, {
            key: 'init',
            value: function init() {
                this.rmEverything();
                this.render();
            }
        }]);

        return Team;
    }();

    var myTeam = new Team();
    myTeam.init();
    form.addEventListener('click', function (event) {
        var e = window.event || event;
        switch (e.target.value) {
            case '左侧入':
                myTeam.unshift(parseInt(text.value));
                break;
            case '右侧入':
                myTeam.push(parseInt(text.value));
                break;
            case '左侧出':
                myTeam.shift();
                break;
            case '右侧出':
                myTeam.pop();
                break;
        }
    }, false);
})(window, document);