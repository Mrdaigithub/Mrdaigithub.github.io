// 基于任务18
// 限制输入的数字在10-100 ok
// 队列元素数量最多限制为60个，当超过60个时，添加元素时alert出提示
// 队列展现方式变化如图，直接用高度表示数字大小
// 实现一个简单的排序功能，如冒泡排序（不限制具体算法），用可视化的方法表达出来，参考见下方参考资料

(function (WIN, DOC) {
    let form = DOC.getElementById('form'),
        text = DOC.getElementById('text');
    class Team{

        constructor(){
            this.list = DOC.getElementById('list');
            this.arr = [];
            this.val = null;
        }

        /**
         * 测试输入是否合法
         * @returns {boolean}
         */
        regText(){
            this.val = text.value.trim();
            this.val = this.val-0;
            if (this.val <10 || this.val >100 || typeof this.val !== 'number'){
                alert('输入不合法，重新写个~');
                text.value = '';
                return false;
            }else if (this.arr.length > 60){
                alert('数组爆炸了!');
                return false
            }
            return true;
        }

        /**
         * 随即得到几个数字
         * @returns {Array}
         */
        getSomeNum(){
            var leg = this.arr.length;
            for (let i=0;i<(60-leg);i++){
                this.arr.push(Math.floor((Math.random()*9+1)*10));
            }
            this.render();
            return this.arr;
        }

        /**
         * 插入排序法 （too low）
         * @returns {Array}
         */
        insertSort(){
            let leg = this.arr.length,
                i = 1;
            animation(this);
            function animation(that) {
                if (i>=leg){
                    return that.arr;
                }
                for (let j=0; j<i; j++){
                    if (that.arr[j]>=that.arr[i]){
                        that.arr.splice(j,0,that.arr[i]);
                        that.arr.splice(i+1,1);
                        that.render();
                    }
                }
                i++;
                setTimeout(function () {
                    animation(that);
                },50);
            }
        }

        /**
         * 重绘
         * @returns {boolean}
         */
        render(){
            let str = '';
            this.arr.forEach(function (e) {
                str += '<li style="height: '+e+'px;" title="' + e + '"></li>';
            });
            this.list.innerHTML = str;
            return true;
        }

        clear(){
            this.arr = [];
            this.render();
        }

        /**
         * 右侧入
         * @param data
         * @returns {*}
         */
        push(data){
            if (!this.regText()){
                return false;
            }
            this.arr.push(data);
            this.render();
            return data;
        }

        /**
         * 右侧出
         * @returns {*}
         */
        pop(){
            let val = this.arr.pop();
            alert(val);
            this.render();
            return val;
        }

        /**
         * 左侧入
         * @param data
         * @returns {*}
         */
        unshift(data){
            if (!this.regText()){
                return false
            }
            this.arr.unshift(data);
            this.render();
            return data;
        }

        /**
         * 左侧出
         * @returns {*}
         */
        shift(){
            let val = this.arr.shift();
            alert(val);
            this.render();
            return val;
        }

        /**
         * 点击删除
         */
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
        var e = window.event || event;
        myTeam.val = text.value;
        switch (e.target.value){
            case '左侧入':
                myTeam.unshift(myTeam.val);
                break;
            case '右侧入':
                myTeam.push(parseInt(myTeam.val));
                break;
            case '左侧出':
                myTeam.shift();
                break;
            case '右侧出':
                myTeam.pop();
                break;
            case '随机出50个数':
                myTeam.getSomeNum();
                break;
            case '排序':
                myTeam.insertSort();
                break;
            case 'clear':
                myTeam.clear();
                break;
        }
    },false)
})(window,document);