(function (WIN, DOC) {

    /**
     * 要插入二叉树的节点类
     */
    class Node{
        constructor(data,left,right){
            this.data = data;
            this.left = left;
            this.right = right;
        }
        showData(){
            return this.data;
        }
    }


    /**
     * 二叉树类
     */
    class BST{
        constructor(){
            this.root = null;
        }
        insert(data){
            let n = new Node(data,null,null);

            if (!this.root){
                //如果是空的二叉树
                this.root = n;
            }else{
                //如果不是空的二叉树
                let current = this.root,
                    parents = null;

                while (true){
                    if (data < current.data){
                        //append leftChild
                        current.left = current;
                        if (!current){
                            parents.left = n;
                            console.log(parents);
                            break;
                        }
                    }else{
                        //append leftChild
                        current.right = current;
                        if (!current){
                            parents.right = n;
                            console.log(parents);
                            break;
                        }
                    }
                }
            }
        }
        preOrder(){

        }
        inOrder(){

        }
        posOrder(){

        }
        render(){

        }
    }

    let a = new BST();
    a.insert(5);
    a.insert(3);
})(window,document);