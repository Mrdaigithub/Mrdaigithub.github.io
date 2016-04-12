'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(function (WIN, DOC) {
    "use strict";

    var treeList = DOC.querySelector('.tree'),
        form = DOC.querySelector('.form'),
        text = DOC.querySelector('#text'),
        insertVal = DOC.querySelector('#insertVal');

    /**
     * 对象转数组
     * @param obj
     * @returns {Array}
     */
    var toArray = function toArray(obj) {
        var arr = [];
        for (var i = 0; i < obj.length; i++) {
            arr.push(obj[i]);
        }
        return arr;
    };

    var Tree = function () {
        function Tree() {
            _classCallCheck(this, Tree);

            this.stack = [];
            this.arr = [];
            this.animationStatus = false;
            this.current = null;
        }

        /**
         * 遍历
         * @param treeNode
         * @param flag
         * @returns {*}
         */


        _createClass(Tree, [{
            key: 'traversal',
            value: function traversal(treeNode, flag) {
                if (!treeNode || !treeNode.children.length) {
                    return this.animation();
                } else {
                    this.stack = toArray(treeNode.children);
                    var item = void 0;
                    while (this.stack.length) {
                        item = this.stack.shift();
                        this.arr.push(item);
                        if (item.children && item.children.length) {
                            if (flag) {
                                // 深度遍历
                                this.stack = toArray(item.children).concat(this.stack);
                            } else {
                                // 广度遍历
                                this.stack = this.stack.concat(toArray(item.children));
                            }
                        }
                    }
                }
                this.stack = [];
                return this.animation();
            }

            /**
             * 搜索
             * @param treeNode
             * @param val
             * @returns {*}
             */

        }, {
            key: 'find',
            value: function find(treeNode, val) {
                if (!treeNode || !treeNode.children.length) {
                    return this.animation();
                } else {
                    this.stack = toArray(treeNode.children);
                    var item = void 0;
                    while (this.stack.length) {
                        item = this.stack.shift();
                        this.arr.push(item);
                        if (item.innerText.replace(/(\s.*)+/, '') === val) {
                            // 找到了
                            this.stack = [];
                            return this.animation(true);
                        } else {
                            if (item.children && item.children.length) {
                                //深度遍历
                                this.stack = toArray(item.children).concat(this.stack);
                            }
                        }
                    }
                    // 没找到
                    return this.animation(true, false);
                }
            }

            /**
             * 选中节点
             * @param treeNode
             */

        }, {
            key: 'checkedNode',
            value: function checkedNode(treeNode) {
                var _this = this;

                treeNode.addEventListener('click', function (event) {
                    var e = WIN.event || event;
                    if (_this.current) {
                        //清除上次选中的node
                        _this.current.style.backgroundColor = '';
                    }
                    _this.current = e.target;
                    _this.current.style.backgroundColor = '#FF9999';
                }, false);
            }

            /**
             * 删除选中的节点及其子元素
             * @returns {boolean}
             */

        }, {
            key: 'removeNode',
            value: function removeNode() {
                if (this.current) {
                    this.current.parentNode.removeChild(this.current);
                    this.current = null;
                    return true;
                } else {
                    alert('选择要删除的节点');
                    return false;
                }
            }
        }, {
            key: 'insertNode',
            value: function insertNode(insertVal) {
                if (this.current) {
                    if (insertVal) {
                        this.current.innerHTML += '<div>' + insertVal + '</div>';
                    } else {
                        alert('写点什么吧~');
                        return false;
                    }
                } else {
                    alert('选择要插入的节点');
                    return false;
                }
            }

            /**
             * 动画
             */

        }, {
            key: 'animation',
            value: function animation(findMode) {
                var result = arguments.length <= 1 || arguments[1] === undefined ? true : arguments[1];

                var i = 0,
                    that = this;
                this.animationStatus = true;

                function start(node) {
                    node.style.backgroundColor = '#CC0000';
                    setTimeout(function () {
                        i++;
                        node.style.backgroundColor = '';
                        if (i < that.arr.length) {
                            start(that.arr[i]);
                        } else {
                            if (findMode) {
                                //在find模式
                                if (result) {
                                    // 找到
                                    node.style.backgroundColor = '#00ff00';
                                    alert('啊哈，找到了~');
                                } else {
                                    // 没找到
                                    alert('没找到');
                                }
                                that.arr = [];
                            } else {
                                // 在搜索模式
                                that.arr = [];
                                alert('遍历完成!');
                            }
                            that.animationStatus = false;
                        }
                    }, 300);
                }
                start(this.arr[i]);
            }

            /**
             * 初始化
             * @param treeNode
             */

        }, {
            key: 'init',
            value: function init(treeNode) {
                this.checkedNode(treeNode);
            }
        }]);

        return Tree;
    }();

    var aTree = new Tree();
    aTree.init(treeList);

    form.addEventListener('click', function (event) {
        var e = WIN.event || event;
        switch (e.target.value) {
            case '深度遍历':
                if (aTree.animationStatus) {
                    alert('动画还没跑完~');
                } else {
                    aTree.traversal(treeList, true);
                }
                break;

            case '广度遍历':
                if (aTree.animationStatus) {
                    alert('动画还没跑完~');
                } else {
                    aTree.traversal(treeList, false);
                }
                break;

            case 'search':
                if (aTree.animationStatus) {
                    alert('动画还没跑完~');
                } else {
                    aTree.find(treeList, text.value);
                }
                break;

            case '删除选中的节点及其子元素':
                aTree.removeNode();
                break;

            case 'insert':
                aTree.insertNode(insertVal.value);
                insertVal.value = '';
                break;
        }
    }, false);
})(window, document);