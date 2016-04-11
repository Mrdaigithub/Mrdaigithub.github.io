'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(function (WIN, DOC) {
    "use strict";

    var treeList = DOC.querySelector('.tree'),
        form = DOC.querySelector('.form'),
        text = DOC.querySelector('#text');

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
        }

        /**
         * 遍历
         * @param treeNode
         * @returns {boolean}
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
             * @param i
             * @returns {boolean}
             */

        }, {
            key: 'find',
            value: function find(treeNode, val) {
                var i = arguments.length <= 2 || arguments[2] === undefined ? 0 : arguments[2];

                if (!treeNode || !treeNode.children.length) {
                    return this.animation();
                } else {
                    this.stack = toArray(treeNode.children);
                    var item = void 0;
                    while (this.stack.length) {
                        item = this.stack.shift();
                        this.arr.push(item);
                        console.log(item.innerText.replace(/(\s.*)+/, ''));
                        if (item.innerText.replace(/(\s.*)+/, '') === val) {
                            break;
                        } else {
                            if (item.children && item.children.length) {
                                //深度遍历
                                this.stack = toArray(item.children).concat(this.stack);
                            }
                        }
                    }
                    this.stack = [];
                    return this.animation();
                }
            }

            /**
             * 动画
             */

        }, {
            key: 'animation',
            value: function animation() {
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
                            that.arr = [];
                            that.animationStatus = false;
                        }
                    }, 300);
                }
                start(this.arr[i]);
            }
        }]);

        return Tree;
    }();

    var aTree = new Tree();

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

            case '查找':
                if (aTree.animationStatus) {
                    alert('动画还没跑完~');
                } else {
                    aTree.find(treeList, text.value);
                }
                break;
        }
    }, false);
})(window, document);