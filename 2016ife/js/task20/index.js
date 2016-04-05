// 任务描述
//
// 基于任务18进行升级
// 将新元素输入框从input改为textarea
// 允许一次批量输入多个内容，格式可以为数字、中文、英文等，可以通过用回车，逗号（全角半角均可），顿号，空格（全角半角、Tab等均可）等符号作为不同内容的间隔
// 增加一个查询文本输入框，和一个查询按钮，当点击查询时，将查询词在各个元素内容中做模糊匹配，将匹配到的内容进行特殊标识，如文字颜色等。举例，内容中有abcd，查询词为ab或bc，则该内容需要标识

(function (WIN, DOC) {
    let form = DOC.getElementById('form'),
        text = DOC.getElementById('text');


    class Team{

        constructor(){
            this.list = DOC.getElementById('list');
            this.arr = [];
            this.val = '';
        }

        /**
         *
         */
        getVal(){
            this.val = text.value.trim();
            console.log(this.val);
            this.arr = this.val.split(/,+|，+|`+|\s+/);
            for (let i=0; i<this.arr.length; i++){
                if (this.arr[i] === ''){
                    console.log(this.arr.length);
                    this.arr.splice(i,1,0);
                }
            }
            return this.arr;
        }

        /**
          * 右侧入
         * @param data
         * @returns {*}
         */
        push(data){
            this.arr.push(data);
            this.render();
            return data;
        }

        /**
         * 右侧出
         * @returns {T}
         */
        pop(){
            let val = this.arr.pop();
            this.render();
            alert(val);
            return val;
        }

        /**
         * 左侧入
         * @param data
         * @returns {*}
         */
        unshift(data){
            this.arr.unshift(data);
            this.render();
            return data;
        }

        /**
         * 左侧出
         * @returns {*|T}
         */
        shift(){
            let val = this.arr.shift();
            this.render();
            alert(val);
            return val;
        }

        rmEverything(){
            this.list.addEventListener('click',(event)=>{
                let e = WIN.event || event;
                if (e.target.nodeName === 'LI'){
                    let val = e.target.innerHTML;
                    this.list.removeChild(e.target);
                    alert(val);
                }
            },false)
        }

        /**
         * 重绘
         * @returns {boolean}
         */
        render(){
            let str = '';
            this.arr.forEach(function (e) {
                str += '<li>'+e+'</li>';
            });
            this.list.innerHTML = str;
            return true;
        }

        init(){
            this.rmEverything();
            this.render();
        }
    }

    var myTeam = new Team();
    myTeam.init();
    form.addEventListener('click',function (event) {
        myTeam.getVal();
        var e = window.event || event;
        switch (e.target.value){
            case '左侧入':
                myTeam.unshift(parseInt(text.value));
                break;
            case '右侧入':
                myTeam.push(parseInt(text.value));
                break;
            case '左侧出':
                myTeam.shift();
                break;
            case '右侧出':
                myTeam.pop();
                break;
        }
    },false)
})(window,document);