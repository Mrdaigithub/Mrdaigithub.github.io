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
        text = DOC.getElementById('text'),
        searchText = DOC.getElementById('searchText');

    var Team = function () {
        function Team() {
            _classCallCheck(this, Team);

            this.list = DOC.getElementById('list');
            this.arr = [];
        }

        /**
         * 分割字符串
         * @returns {string[]|*|Array}
         */


        _createClass(Team, [{
            key: 'getVal',
            value: function getVal() {
                var val = text.value.trim();
                return val.split(/[,，、\s]+/);
            }

            /**
             * 查找匹配的数据
             * @returns {Array}
             */

        }, {
            key: 'search',
            value: function search() {
                var reg = new RegExp(searchText.value),
                    arr = [];
                this.arr.forEach(function (e) {
                    if (reg.test(e)) {
                        arr.push(e);
                    }
                });
                return arr;
            }

            /**
             * 重绘
             * @returns {boolean}
             */

        }, {
            key: 'render',
            value: function render(mark) {
                var _this = this;

                var str = '';
                this.arr.forEach(function (e) {
                    str += '<li>' + e + '</li>';
                });
                this.list.innerHTML = str;
                if (mark) {
                    (function () {
                        var child = _this.list.children,
                            cLeg = child.length,
                            searchArr = _this.search();

                        var _loop = function _loop(i) {
                            searchArr.forEach(function (e) {
                                if (child[i].innerHTML === e) {
                                    child[i].style.backgroundColor = '#ffc66d';
                                }
                            });
                        };

                        for (var i = 0; i < cLeg; i++) {
                            _loop(i);
                        }
                    })();
                }
                return true;
            }

            /**
              * 右侧入
             * @returns {*}
             */

        }, {
            key: 'push',
            value: function push() {
                var _this2 = this;

                this.getVal().forEach(function (e) {
                    _this2.arr.push(e);
                });
                this.render();
                return true;
            }

            /**
             * 右侧出
             * @returns {*}
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
             * @returns {*}
             */

        }, {
            key: 'unShift',
            value: function unShift() {
                var _this3 = this;

                this.getVal().forEach(function (e) {
                    _this3.arr.unshift(e);
                });
                this.render();
                return true;
            }

            /**
             * 左侧出
             * @returns {*}
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
                var _this4 = this;

                this.list.addEventListener('click', function (event) {
                    var e = WIN.event || event;
                    if (e.target.nodeName === 'LI') {
                        var val = e.target.innerHTML;
                        _this4.list.removeChild(e.target);
                        alert(val);
                    }
                }, false);
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
                myTeam.unShift();
                break;
            case '右侧入':
                myTeam.push();
                break;
            case '左侧出':
                myTeam.shift();
                break;
            case '右侧出':
                myTeam.pop();
                break;
            case 'search':
                myTeam.search();
                myTeam.render(true);
                break;
        }
    }, false);
})(window, document);