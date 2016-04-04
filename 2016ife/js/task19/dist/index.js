'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// 任务描述
//
// 如图，模拟一个队列，队列的每个元素是一个数字，初始队列为空
// 有一个input输入框，以及4个操作按钮
// 点击"左侧入"，将input中输入的数字从左侧插入队列中；
// 点击"右侧入"，将input中输入的数字从右侧插入队列中；
// 点击"左侧出"，读取并删除队列左侧第一个元素，并弹窗显示元素中数值；
// 点击"右侧出"，读取并删除队列又侧第一个元素，并弹窗显示元素中数值；
// 点击队列中任何一个元素，则该元素会被从队列中删除

(function (WIN, DOC) {
    var form = DOC.getElementById('form'),
        text = DOC.getElementById('text');

    var Team = function () {
        function Team() {
            _classCallCheck(this, Team);

            this.list = DOC.getElementById('list');
            this.arr = [];
        }

        /**
         * 右侧入
         * @param data
         * @returns {*}
         */


        _createClass(Team, [{
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