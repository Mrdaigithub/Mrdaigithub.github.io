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
        }

        /**
         * 测试输入是否合法
         * @returns {boolean}
         */
        regText(){
            if (text.value <10 || text.value >100){
                alert('输入不合法，重新写个~');
                text.value = '';
                return false;
            }else if (this.arr.length > 60){
                alert('数组爆炸了!');
                return false;
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
            var leg = this.arr.length;
            for (let i=1; i<leg;i++){
                let j=0;
                function animation() {
                    if (j<i){
                        return this.arr;
                    }
                    if (this.arr[j]>=this.arr[i]){
                        this.arr.splice(j,0,this.arr[i]);
                        this.arr.splice(i+1,1);
                        this.render()
                    }
                    j++;
                    setTimeout(animation,30);
                }
            }
            return this.arr;
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
            console.log(1);
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