// 任务描述
//
// 如图，模拟一个队列，队列的每个元素是一个数字，初始队列为空
// 有一个input输入框，以及4个操作按钮
// 点击"左侧入"，将input中输入的数字从左侧插入队列中；
// 点击"右侧入"，将input中输入的数字从右侧插入队列中；
// 点击"左侧出"，读取并删除队列左侧第一个元素，并弹窗显示元素中数值；
// 点击"右侧出"，读取并删除队列又侧第一个元素，并弹窗显示元素中数值；
// 点击队列中任何一个元素，则该元素会被从队列中删除

(function (WIN, DOC) {
    let form = DOC.getElementById('form'),
        text = DOC.getElementById('text');
    class Team{

        constructor(){
            this.list = DOC.getElementById('list');
            this.arr = [];
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