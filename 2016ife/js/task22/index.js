(function (WIN, DOC) {

    let treeList = DOC.querySelector('.tree'),
        btnBox = DOC.querySelector('.btnBox');
    /**
     * 二叉树类
     */
    class BST{
        constructor(){
            this.arr = [];
        }

        /**
         * 前序
         * @param node
         */
        preOrder(node){
            if (node){
                this.arr.push(node);
                this.preOrder(node.firstElementChild);
                this.preOrder(node.lastElementChild);
            }
        }

        /**
         * 中序
         * @param node
         */
        inOrder(node){
            if (node){
                this.inOrder(node.firstElementChild);
                this.arr.push(node);
                this.inOrder(node.lastElementChild);
            }
        }

        /**
         * 后序
         * @param node
         */
        posOrder(node){
            if (node){
                this.posOrder(node.firstElementChild);
                this.posOrder(node.lastElementChild);
                this.arr.push(node);
            }
        }

        /**
         * 重绘
         * @param i
         */
        render(i=0){
            let that = this;
            this.arr[i].style.backgroundColor = '#FF0000';
            setTimeout(function () {
                that.arr[i].style.backgroundColor = '';
                if (i >= that.arr.length-1){
                    that.arr = [];
                    return true;
                }
                that.render(++i);
            },500)
        }
    }

    let a = new BST();

    btnBox.addEventListener('click',(event)=>{
        let e = WIN.event || event;

        switch (e.target.innerHTML){
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
    },false);
})(window,document);