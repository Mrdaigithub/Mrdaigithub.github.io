'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// 基于任务18
// 限制输入的数字在10-100 ok
// 队列元素数量最多限制为60个，当超过60个时，添加元素时alert出提示
// 队列展现方式变化如图，直接用高度表示数字大小
// 实现一个简单的排序功能，如冒泡排序（不限制具体算法），用可视化的方法表达出来，参考见下方参考资料

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
         * 测试输入是否合法
         * @returns {boolean}
         */


        _createClass(Team, [{
            key: 'regText',
            value: function regText() {
                if (text.value < 10 || text.value > 100) {
                    alert('输入不合法，重新写个~');
                    text.value = '';
                    return false;
                } else if (this.arr.length > 60) {
                    alert('数组爆炸了!');
                    return false;
                }
                return true;
            }

            /**
             * 随即得到几个数字
             * @returns {Array}
             */

        }, {
            key: 'getSomeNum',
            value: function getSomeNum() {
                var leg = this.arr.length;
                for (var i = 0; i < 60 - leg; i++) {
                    this.arr.push(Math.floor((Math.random() * 9 + 1) * 10));
                }
                this.render();
                return this.arr;
            }

            /**
             * 插入排序法 （too low）
             * @returns {Array}
             */

        }, {
            key: 'insertSort',
            value: function insertSort() {
                var leg = this.arr.length;

                var _loop = function _loop(i) {
                    var j = 0;
                    function animation() {
                        if (j < i) {
                            return this.arr;
                        }
                        if (this.arr[j] >= this.arr[i]) {
                            this.arr.splice(j, 0, this.arr[i]);
                            this.arr.splice(i + 1, 1);
                            this.render();
                        }
                        j++;
                        setTimeout(animation, 30);
                    }
                };

                for (var i = 1; i < leg; i++) {
                    _loop(i);
                }
                return this.arr;
            }
        }, {
            key: 'clear',
            value: function clear() {
                this.arr = [];
                this.render();
            }

            /**
             * 右侧入
             * @param data
             * @returns {*}
             */

        }, {
            key: 'push',
            value: function push(data) {
                if (!this.regText()) {
                    return false;
                }
                console.log(1);
                this.arr.push(data);
                this.render();
                return data;
            }

            /**
             * 右侧出
             * @returns {*}
             */

        }, {
            key: 'pop',
            value: function pop() {
                var val = this.arr.pop();
                alert(val);
                this.render();
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
                if (!this.regText()) {
                    return false;
                }
                this.arr.unshift(data);
                this.render();
                return data;
            }

            /**
             * 左侧出
             * @returns {*}
             */

        }, {
            key: 'shift',
            value: function shift() {
                var val = this.arr.shift();
                alert(val);
                this.render();
                return val;
            }

            /**
             * 点击删除
             */

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
                    str += '<li style="height: ' + e + 'px;" title="' + e + '"></li>';
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
            case '随机出50个数':
                myTeam.getSomeNum();
                break;
            case '排序':
                myTeam.insertSort();
                break;
            case 'clear':
                myTeam.clear();
                break;
        }
    }, false);
})(window, document);