(function (WIN, DOC) {
    "use strict";
    let treeList = DOC.querySelector('.tree'),
        form = DOC.querySelector('.form');

    /**
     * 对象转数组
     * @param obj
     * @returns {Array}
     */
    let toArray = (obj)=>{
        let arr = [];
        for (let i=0;i<obj.length;i++){
            arr.push(obj[i]);
        }
        return arr;
    };

    class Tree{
        constructor(){
            this.stack = [];
        }

        /**
         * 遍历
         * @param treeNode
         * @returns {boolean}
         */
        traversal(treeNode){
            if (!treeNode || !treeNode.children.length){
                return this.animation();
            }else{
                this.stack = toArray(treeNode.children);

                let item;
                while (this.stack.length){
                    item = this.stack.shift();
                    if (item.children && item.children.length){
                        this.stack = toArray(item.children).concat(this.stack);
                    }
                }
                console.log(this.stack);

            }
        }

        find(treeNode,i=0){
            console.log(treeNode.children[i]);
            let val = treeNode.children[i].innerText.replace(/(\s.*)+/,'');

            if (val === DOC.querySelector('#text').value){
                //找到值了
                this.arr.push(treeNode.children[i]);
                console.log(this.arr);
                return true;
                // return this.animation();
            }else if(!treeNode || !treeNode.children.length){
                //没找到值
                return true;
                // return this.animation();
            }else{
                for (let i=0;i<treeNode.children.length;i++){
                    this.arr.push(treeNode.children[i],i);
                    this.find(treeNode.children[i],i+1);
                }
            }
        }

        /**
         * 动画
         */
        animation(){
            let i=0,
                that = this;
            console.log(this.arr);
            function start(node) {
                node.style.backgroundColor = '#CC0000';
                setTimeout(function () {
                    i++;
                    node.style.backgroundColor = '';
                    if (i<that.arr.length){
                        start(that.arr[i]);
                    }else{
                        that.arr = [];
                    }
                },300)
            }
            start(this.arr[i]);
        }
    }



    let aTree = new Tree();

    form.addEventListener('click',(event)=>{
        let e = WIN.event || event;
        switch (e.target.value){
            case '遍历':
                aTree.traversal(treeList);
                break;
            case '查找':
                aTree.find(treeList);
        }
    },false)
})(window,document);