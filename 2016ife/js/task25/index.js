(function (WIN, DOC) {

    let treeList = DOC.querySelector('.box>ul'),
        searchBtn = DOC.querySelector('#searchBtn');

    class Tree{
        constructor(list){
            this.list = list;
            this.icon = '<span class="icon hide"> - </span>';
            this.operate = '<div class="operate"><button class="add-btn">Add</button>\n<button class="rm-btn">Remove</button></div>';
        }

        add(){
            treeList.addEventListener('click',(event)=>{
                let e = WIN.event || event;
                if (e.target.className === 'add-btn'){
                    let addVal = prompt('你想加点什么？');
                    e.target.parentNode.parentNode.className = 'bold';
                    console.log(e.target.parentNode.parentNode.getElementsByTagName('span'));
                    e.target.parentNode.parentNode.getElementsByTagName('span')[0].className = 'icon lineShow';
                    console.log(e.target.parentNode.parentNode);
                    e.target.parentNode.parentNode.nextElementSibling.innerHTML += '<li><div>' + addVal + this.icon + this.operate + '</div><ul></ul></li>';
                }
            },false)
        }

        /**
         * 删除节点
         */
        remove(){
            treeList.addEventListener('click',(event)=>{
                let e = WIN.event || event;
                if (e.target.className === 'rm-btn'){
                    e.target.parentNode.parentNode.parentNode.parentNode.removeChild(e.target.parentNode.parentNode.parentNode);
                }
            },false)
        }

        /**
         * 按照内容进行节点查找
         * @param key
         * @returns {boolean}
         */
        find(key){
            let stack = [];

            for (let i=0, leg=this.list.children.length; i<leg; i++){
                stack.push(this.list.children[i]);
            }

            while (true){
                if (!stack.length){
                    return true;
                }

                if (stack[0].querySelector('ul').children){
                    for (let i=0,leg=stack[0].querySelector('ul').children.length; i<leg; i++){
                        stack.push(stack[0].querySelector('ul').children[i]);
                    }
                }

                let first = stack[0];
                if (first.firstElementChild.innerHTML.match(/\w+/)[0] === key.trim()){
                    first.style.backgroundColor = '#00ff00';
                    setTimeout(()=>{
                        first.style.backgroundColor = '';
                    },1000)
                }
                stack.shift();
            }
        }

        init(){
            this.add();
            this.remove();
        }
    }




    
    //节点的折叠与展开
    treeList.addEventListener('click',(event)=>{
        let e = WIN.event || event;
        if (e.target.nodeName === 'DIV' && e.target.className === 'bold'){
            let list = e.target.nextElementSibling;
            if (list.className === 'hide'){
                list.className = '';
                e.target.querySelector('span').innerHTML = ' - ';
            }else{
                list.className = 'hide';
                e.target.querySelector('span').innerHTML = ' + ';
            }
        }else if(e.target.nodeName === 'SPAN'){
            let list = e.target.parentNode.nextElementSibling;
            console.log(list);
            if (list.className === 'hide'){
                list.className = 'show';
                e.target.innerHTML = ' - ';
            }else{
                list.className = 'hide';
                e.target.innerHTML = ' + ';
            }
        }
    },false);


    let a = new Tree(treeList);
    a.init();


    searchBtn.addEventListener('click',(event)=>{
        let e = WIN.event || event;
        a.find(e.target.previousElementSibling.value);
    },false)
})(window,document);