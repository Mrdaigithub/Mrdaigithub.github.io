(function (WIN, DOC) {
    "use strict";
    let treeList = DOC.querySelector('.tree'),
        form = DOC.querySelector('.form'),
        text = DOC.querySelector('#text');

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
            this.arr = [];
            this.animationStatus = false;
        }

        /**
         * 遍历
         * @param treeNode
         * @param flag
         * @returns {*}
         */
        traversal(treeNode,flag){
            if (!treeNode || !treeNode.children.length){
                return this.animation();
            }else{
                this.stack = toArray(treeNode.children);
                let item;
                while (this.stack.length){
                    item = this.stack.shift();
                    this.arr.push(item);
                    if (item.children && item.children.length){
                        if (flag){
                            // 深度遍历
                            this.stack = toArray(item.children).concat(this.stack);
                        }else{
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
        find(treeNode,val){
            if (!treeNode || !treeNode.children.length){
                return this.animation();
            }else{
                this.stack = toArray(treeNode.children);
                let item;
                while(this.stack.length){
                    item = this.stack.shift();
                    this.arr.push(item);
                    if (item.innerText.replace(/(\s.*)+/,'') === val){
                        // 找到了
                        this.stack = [];
                        return this.animation(true);
                    }else{
                        if (item.children && item.children.length){
                            //深度遍历
                            this.stack = toArray(item.children).concat(this.stack);
                        }
                    }
                }
                // 没找到
                return this.animation(true,false);
            }
        }

        /**
         * 动画
         */
        animation(findMode,result=true){
            let i=0,
                that = this;
            this.animationStatus = true;

            function start(node) {
                node.style.backgroundColor = '#CC0000';
                setTimeout(function () {
                    i++;
                    node.style.backgroundColor = '';
                    if (i<that.arr.length){
                        start(that.arr[i]);
                    }else{
                        if (findMode){
                            //在find模式
                            if (result){
                                // 找到
                                node.style.backgroundColor = '#00ff00';
                                alert('啊哈，找到了~');
                            }else{
                                // 没找到
                                alert('没找到');
                            }
                            that.arr = [];
                        }else{
                            // 在搜索模式
                            that.arr = [];
                            alert('遍历完成!');
                        }
                        that.animationStatus = false;
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
            case '深度遍历':
                if (aTree.animationStatus){
                    alert('动画还没跑完~');
                }else{
                    aTree.traversal(treeList,true);
                }
                break;

            case '广度遍历':
                if(aTree.animationStatus){
                    alert('动画还没跑完~');
                }else{
                    aTree.traversal(treeList,false);
                }
                break;

            case '查找':
                if (aTree.animationStatus){
                    alert('动画还没跑完~');
                }else{
                    aTree.find(treeList,text.value);
                }
                break;
        }
    },false)
})(window,document);