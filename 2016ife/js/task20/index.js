// 任务描述
//
// 基于任务18进行升级
// 将新元素输入框从input改为textarea
// 允许一次批量输入多个内容，格式可以为数字、中文、英文等，可以通过用回车，逗号（全角半角均可），顿号，空格（全角半角、Tab等均可）等符号作为不同内容的间隔
// 增加一个查询文本输入框，和一个查询按钮，当点击查询时，将查询词在各个元素内容中做模糊匹配，将匹配到的内容进行特殊标识，如文字颜色等。举例，内容中有abcd，查询词为ab或bc，则该内容需要标识

(function (WIN, DOC) {
    let form = DOC.getElementById('form'),
        text = DOC.getElementById('text'),
        searchText = DOC.getElementById('searchText');


    class Team{

        constructor(){
            this.list = DOC.getElementById('list');
            this.arr = [];
        }

        /**
         * 分割字符串
         * @returns {string[]|*|Array}
         */
        getVal(){
            let val = text.value.trim();
            return val.split(/[,，、\s]+/);
        }

        /**
         * 查找匹配的数据
         * @returns {Array}
         */
        search(){
            let reg = new RegExp(searchText.value),
                arr = [];
            this.arr.forEach((e)=>{
                if (reg.test(e)){
                    arr.push(e);
                }
            });
            return arr;
        }

        /**
         * 重绘
         * @returns {boolean}
         */
        render(mark){
            let str = '';
            this.arr.forEach((e)=>{
                str += '<li>'+e+'</li>';
            });
            this.list.innerHTML = str;
            if (mark){
                let child = this.list.children,
                    cLeg = child.length,
                    searchArr = this.search();
                for (let i=0;i<cLeg;i++){
                    searchArr.forEach((e)=>{
                        if (child[i].innerHTML === e){
                            child[i].style.backgroundColor = '#ffc66d';
                        }
                    })
                }
            }
            return true;
        }


        /**
          * 右侧入
         * @returns {*}
         */
        push(){
            this.getVal().forEach((e)=>{
                this.arr.push(e);
            });
            this.render();
            return true;
        }

        /**
         * 右侧出
         * @returns {*}
         */
        pop(){
            let val = this.arr.pop();
            this.render();
            alert(val);
            return val;
        }

        /**
         * 左侧入
         * @returns {*}
         */
        unShift(){
            this.getVal().forEach((e)=>{
                this.arr.unshift(e);
            });
            this.render();
            return true;
        }

        /**
         * 左侧出
         * @returns {*}
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

        init(){
            this.rmEverything();
            this.render();
        }
    }

    var myTeam = new Team();
    myTeam.init();
    form.addEventListener('click',function (event) {
        let e = window.event || event;
        switch (e.target.value){
            case '左侧入':
                myTeam.unShift();
                break;
            case '右侧入':
                myTeam.push();
                break;
            case '左侧出':
                myTeam.shift();
                break;
            case '右侧出':
                myTeam.pop();
                break;
            case 'search':
                myTeam.search();
                myTeam.render(true);
                break;
        }
    },false)
})(window,document);