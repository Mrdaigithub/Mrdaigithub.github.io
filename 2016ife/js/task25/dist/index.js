'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(function (WIN, DOC) {

    var treeList = DOC.querySelector('.box>ul'),
        searchBtn = DOC.querySelector('#searchBtn');

    var Tree = function () {
        function Tree(list) {
            _classCallCheck(this, Tree);

            this.list = list;
            this.icon = '<span class="icon hide"> - </span>';
            this.operate = '<div class="operate"><button class="add-btn">Add</button>\n<button class="rm-btn">Remove</button></div>';
        }

        _createClass(Tree, [{
            key: 'add',
            value: function add() {
                var _this = this;

                treeList.addEventListener('click', function (event) {
                    var e = WIN.event || event;
                    if (e.target.className === 'add-btn') {
                        var addVal = prompt('你想加点什么？');
                        e.target.parentNode.parentNode.className = 'bold';
                        console.log(e.target.parentNode.parentNode.getElementsByTagName('span'));
                        e.target.parentNode.parentNode.getElementsByTagName('span')[0].className = 'icon lineShow';
                        console.log(e.target.parentNode.parentNode);
                        e.target.parentNode.parentNode.nextElementSibling.innerHTML += '<li><div>' + addVal + _this.icon + _this.operate + '</div><ul></ul></li>';
                    }
                }, false);
            }

            /**
             * 删除节点
             */

        }, {
            key: 'remove',
            value: function remove() {
                treeList.addEventListener('click', function (event) {
                    var e = WIN.event || event;
                    if (e.target.className === 'rm-btn') {
                        e.target.parentNode.parentNode.parentNode.parentNode.removeChild(e.target.parentNode.parentNode.parentNode);
                    }
                }, false);
            }

            /**
             * 按照内容进行节点查找
             * @param key
             * @returns {boolean}
             */

        }, {
            key: 'find',
            value: function find(key) {
                var stack = [];

                for (var i = 0, leg = this.list.children.length; i < leg; i++) {
                    stack.push(this.list.children[i]);
                }

                var _loop = function _loop() {
                    if (!stack.length) {
                        return {
                            v: true
                        };
                    }

                    if (stack[0].querySelector('ul').children) {
                        for (var _i = 0, _leg = stack[0].querySelector('ul').children.length; _i < _leg; _i++) {
                            stack.push(stack[0].querySelector('ul').children[_i]);
                        }
                    }

                    var first = stack[0];
                    if (first.firstElementChild.innerHTML.match(/\w+/)[0] === key.trim()) {
                        first.style.backgroundColor = '#00ff00';
                        setTimeout(function () {
                            first.style.backgroundColor = '';
                        }, 1000);
                    }
                    stack.shift();
                };

                while (true) {
                    var _ret = _loop();

                    if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
                }
            }
        }, {
            key: 'init',
            value: function init() {
                this.add();
                this.remove();
            }
        }]);

        return Tree;
    }();

    //节点的折叠与展开


    treeList.addEventListener('click', function (event) {
        var e = WIN.event || event;
        if (e.target.nodeName === 'DIV' && e.target.className === 'bold') {
            var list = e.target.nextElementSibling;
            if (list.className === 'hide') {
                list.className = '';
                e.target.querySelector('span').innerHTML = ' - ';
            } else {
                list.className = 'hide';
                e.target.querySelector('span').innerHTML = ' + ';
            }
        } else if (e.target.nodeName === 'SPAN') {
            var _list = e.target.parentNode.nextElementSibling;
            console.log(_list);
            if (_list.className === 'hide') {
                _list.className = 'show';
                e.target.innerHTML = ' - ';
            } else {
                _list.className = 'hide';
                e.target.innerHTML = ' + ';
            }
        }
    }, false);

    var a = new Tree(treeList);
    a.init();

    searchBtn.addEventListener('click', function (event) {
        var e = WIN.event || event;
        a.find(e.target.previousElementSibling.value);
    }, false);
})(window, document);