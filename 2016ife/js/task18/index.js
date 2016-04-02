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
    var form = DOC.getElementById('form'),
        text = DOC.getElementById('text');

    function Team() {
        this.list = DOC.getElementById('list');
        this.arr = [];
    }


    Team.prototype = {

        /**
         * 右侧入
         * @param data
         * @returns {*}
         */
        push:function (data) {
            this.arr.push(data);
            Team.prototype.render();
            return data;
        },

        /**
         * 右侧出
         * @returns {*}
         */
        pop:function () {
            Team.prototype.render();
            return this.arr.pop();
        },

        /**
         * 左侧入
         * @param data
         * @returns {*}
         */
        unshift:function (data) {
            this.arr.unshift(data);
            Team.prototype.render();
            return data;
        },

        /**
         * 左侧出
         * @returns {*}
         */
        shift:function () {
            Team.prototype.render();
            return this.arr.shift();
        }
    };

    /**
     * 重绘
     */
    Team.prototype.render = function () {
        var str = '';
        console.log(this === Team);
        Team.arr.forEach(function (e) {
            str += '<li>' +e+ '</li>';
        });
        this.list.innerHTML = str;
    };

    /**
     * 初始化
     */
    Team.prototype.init = function () {
        Team.prototype.render();
    };

    var myTeam = new Team();
    console.log(myTeam);
    form.addEventListener('click',function (event) {
        var e = window.event || event;
        switch (e.target.value){
            case '左侧入':
                myTeam.unshift(text);
                break;
            case '右侧入':
                myTeam.push(text);
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