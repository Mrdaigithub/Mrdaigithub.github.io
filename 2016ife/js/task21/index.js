// 基于任务20，将任务20的代码进行抽象、封装，然后在此基础上实现如图中的两个需求：Tag输入和兴趣爱好输入
// 如示例图上方，实现一个tag输入框
// 要求遇到用户输入空格，逗号，回车时，都自动把当前输入的内容作为一个tag放在输入框下面。
// Tag不能有重复的，遇到重复输入的Tag，自动忽视。
// 每个Tag请做trim处理
// 最多允许10个Tag，多于10个时，按照录入的先后顺序，把最前面的删掉
// 当鼠标悬停在tag上时，tag前增加删除二字，点击tag可删除
// 如示例图下方，实现一个兴趣爱好输入的功能
// 通过一个Textarea进行兴趣爱好的输入，可以通过用回车，逗号（全角半角均可），顿号，空格（全角半角、Tab等均可）等符号作为间隔。
// 当点击“确认兴趣爱好”的按钮时，将textarea中的输入按照你设定的间隔符，拆解成一个个的爱好，显示在textarea下方
// 爱好不能重复，所以在下方呈现前，需要做一个去重
// 每个爱好内容需要做trim处理
// 最多允许10个兴趣爱好，多于10个时，按照录入的先后顺序，把最前面的删掉


(function (WIN, DOC) {
    class Form{
        constructor(){
            this.tag = DOC.querySelector('#tag');
            this.tagList = DOC.querySelector('.tagList');
            this.tagData = ['HTMLCSS','JAVASCRIPT','NODEJS'];

            this.favoriteText = DOC.querySelector('.favoriteText');
            this.favoriteList = DOC.querySelector('.favoriteList');
            this.favoriteBtn = DOC.querySelector('.favoriteBtn');
            this.favoriteData = [];
        }


        /**
         * 测试tag输入
         */
        testTag(){
            DOC.addEventListener('keydown',(event)=>{
                let e = WIN.event || event;

                if (/\S/g.test(this.tag.value) && (e.keyCode === 13 || e.keyCode === 32 || e.keyCode === 188)){

                    //data大于10删掉最前
                    this.rmOver(this.tagData);

                    //去重
                    if (this.rmRepeat(this.tagData,this.tag.value)){
                        this.tagData.push(this.tag.value.trim());
                        this.render(this.tagList,this.tagData);
                    }

                    this.tag.value = '';
                }
            },false);
        }


        /**
         * 点击删除tag出现删除字样
         */
        rmTag(){
            this.tagList.addEventListener('mouseover',(event)=>{
                let e = WIN.event || event;
                if (e.target.nodeName === 'LI'){
                    e.target.className = 'remove';
                }
            },false);

            this.tagList.addEventListener('mouseout',(event)=>{
                let e = WIN.event || event;
                if (e.target.nodeName === 'LI'){
                    e.target.className = '';
                }
            },false);

            this.tagList.addEventListener('click',(event)=>{
                let e = WIN.event || event,
                    nodeVal = null;
                if (e.target.nodeName === 'LI'){
                    nodeVal = e.target.innerHTML;
                    let leg = this.tagData.length;
                    for (let i=0; i<leg; i++){
                        if (nodeVal === this.tagData[i]){
                            this.tagData.splice(i,1);
                        }
                    }
                    this.render(this.tagList,this.tagData);
                }
            },false)
        }

        /**
         * 验证爱好
         */
        testFavorite(){
            this.favoriteBtn.addEventListener('click',()=>{
                let val = this.favoriteText.value.trim(),
                    arr = val.split(/[,，、\s]+/);
                arr.forEach((e)=>{
                    if (this.rmRepeat(this.favoriteData,e)){
                        if (this.rmOver(this.favoriteData)){
                            this.favoriteData.shift();
                        }
                        this.favoriteData.push(e);
                    }
                });
                this.render(this.favoriteList,this.favoriteData);
            },false)
        }

        /**
         * 去重验证
         * @param arr
         * @param data
         * @returns {boolean}
         */
        rmRepeat(arr,data){
            let key = true;
            arr.forEach((e)=>{
                if (data === e){
                    key = false;
                    return false;
                }
            });
            if (key){
                return true;
            }
        }

        /**
         * 验证是否大于10个,大于删除队头
         * @param arr
         * @returns {*}
         */
        rmOver(arr){
            if (arr.length > 10){
                return arr.shift();
            }
            return false;
        }


        /**
         * 渲染
         */
        render(node,data){
            let str = '';
            data.forEach((e)=>{
                str += '<li>' +e+ '</li>\n';
            });
            node.innerHTML = str;
        }

        init(){
            this.testTag();
            this.rmTag();
            this.testFavorite();
            this.render(this.tagList,this.tagData);
        }
    }


    let myClass = new Form();
    myClass.init();
})(window,document);