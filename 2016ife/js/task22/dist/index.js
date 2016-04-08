'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(function (WIN, DOC) {

    var treeList = DOC.querySelector('.tree'),
        btnBox = DOC.querySelector('.btnBox');
    /**
     * 二叉树类
     */

    var BST = function () {
        function BST() {
            _classCallCheck(this, BST);

            this.arr = [];
        }

        /**
         * 前序
         * @param node
         */


        _createClass(BST, [{
            key: 'preOrder',
            value: function preOrder(node) {
                if (node) {
                    this.arr.push(node);
                    this.preOrder(node.firstElementChild);
                    this.preOrder(node.lastElementChild);
                }
            }

            /**
             * 中序
             * @param node
             */

        }, {
            key: 'inOrder',
            value: function inOrder(node) {
                if (node) {
                    this.inOrder(node.firstElementChild);
                    this.arr.push(node);
                    this.inOrder(node.lastElementChild);
                }
            }

            /**
             * 后序
             * @param node
             */

        }, {
            key: 'posOrder',
            value: function posOrder(node) {
                if (node) {
                    this.posOrder(node.firstElementChild);
                    this.posOrder(node.lastElementChild);
                    this.arr.push(node);
                }
            }

            /**
             * 重绘
             * @param i
             */

        }, {
            key: 'render',
            value: function render() {
                var i = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];

                var that = this;
                this.arr[i].style.backgroundColor = '#FF0000';
                setTimeout(function () {
                    that.arr[i].style.backgroundColor = '';
                    if (i >= that.arr.length - 1) {
                        that.arr = [];
                        return true;
                    }
                    that.render(++i);
                }, 500);
            }
        }]);

        return BST;
    }();

    var a = new BST();

    btnBox.addEventListener('click', function (event) {
        var e = WIN.event || event;

        switch (e.target.innerHTML) {
            case 'preOrder':
                a.preOrder(treeList);
                a.render();
                break;
            case 'inOrder':
                a.inOrder(treeList);
                a.render();
                break;
            case 'posOrder':
                a.posOrder(treeList);
                a.render();
                break;
        }
    }, false);
})(window, document);