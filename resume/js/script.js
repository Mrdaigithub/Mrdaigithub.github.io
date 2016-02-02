(function (document) {
    "use strict";
    const DOC = document;

    let str = [
            //开机内容
            '<h3 class="tc">Welcome Mrdai\'s resume</h3>\\' +
            '<span>Starting auditd:</span>\\<span class="fr"> ] </span>\\<span class="fr green"> ok </span>\\<span class="fr"> [ </span>\\<p></p>\\' +
            '<span>Starting restorecond:</span>\\<span class="fr"> ] </span>\\<span class="fr green"> ok </span>\\<span class="fr"> [ </span>\\<p></p>\\' +
            '<span>Starting system logger:</span>\\<span class="fr"> ] </span>\\<span class="fr green"> ok </span>\\<span class="fr"> [ </span>\\<p></p>\\' +
            '<span>Starting kernel logger:</span>\\<span class="fr"> ] </span>\\<span class="fr green"> ok </span>\\<span class="fr"> [ </span>\\<p></p>\\' +
            '<span>Starting irqbalance:</span>\\<span class="fr"> ] </span>\\<span class="fr green"> ok </span>\\<span class="fr"> [ </span>\\<p></p>\\' +
            '<span>Starting mcstransd:</span>\\<span class="fr"> ] </span>\\<span class="fr green"> ok </span>\\<span class="fr"> [ </span>\\<p></p>\\' +
            '<span>Starting setroubleshootd:</span>\\<span class="fr"> ] </span>\\<span class="fr green"> ok </span>\\<span class="fr"> [ </span>\\<p></p>\\' +
            '<span>Starting NFS statd:</span>\\<span class="fr"> ] </span>\\<span class="fr green"> ok </span>\\<span class="fr"> [ </span>\\<p></p>\\' +
            '<span>RPC idmapd:</span>\\<span class="fr"> ] </span>\\<span class="fr green"> ok </span>\\<span class="fr"> [ </span>\\<p></p>\\' +
            '<span>Determin IP information for eth0...</span>\\',

            //登录界面
            '<p>Username: Mrdai</p>\\' +
            '<p>Password: *********</p>\\' +
            '<p>ACCESS TO SYSTEM</p>\\' +
            '<p>Initializing...</p>\\' +
            '<span>press enter to continue</span>\\'
        ],
        text = DOC.getElementById('text'),
        btnBox = DOC.getElementsByClassName('btnBox')[0],
        enterBtn = DOC.getElementsByClassName('enterBtn')[0];


    class Resume{
        constructor(str,delay,parentNode,showBtn){
            this.str = str;
            this.delay = delay;
            this.parentNode = parentNode;
            this.sumReg = /<\w+\s*(\w+=('|")\w+('|")\s*)*>.*<\/\w+>\\/g;
            this.labelReg = /<\w+\s*(\w+=('|")\w+\s*\w*('|")\s*)*>/;
            this.contentReg = />.*</;
            this.statements = [];
            this.labels = [];
            this.contents = [];
            this.showBtn = showBtn || false;
        }

        //得到html语句的数组集合
        getStatements(){
            this.statements = this.sumReg.exec(this.str.substr(0))[0].split('\\');
            this.statements.pop();
            return this;
        }

        //得到html标签的数组集合
        getLabel(){
            for(let i=0; i<this.statements.length; i++){
                let label = /\w+/.exec(this.labelReg.exec(this.statements[i]))[0],
                labelsChild = this.labelReg.exec(this.statements[i])[0] + '</' + label + '>';
                this.labels.push(labelsChild);
            }
            return this;
        }

        //得到html内容的数组集合
        getContent(){
            for(let i=0; i<this.statements.length; i++){
                let content = this.contentReg.exec(this.statements[i])[0];
                content = content.substring(0,content.length-1);
                content = content.substring(1,content.length);
                this.contents.push(content);
            }
            return this;
        }

        //添加html标签
        addLabels(){
            this.parentNode.innerHTML = '';
            for(let i=0; i<this.labels.length; i++){
                this.parentNode.innerHTML += this.labels[i];
            }
            return this;
        }

        //添加闪烁的光标在末尾
        addCursor(bool){
            if(bool){
                let cursor = DOC.createElement('span');
                cursor.innerHTML = ' _';
                cursor.className = 'cursor';
                this.parentNode.appendChild(cursor);
            }else{
                this.parentNode.removeChild(this.parentNode.children[this.parentNode.children.length-1]);
            }
        }

        //打印内容
        printContent(count,contentCount){
            let that = this;
            if(contentCount > this.contents[count].length-1){
                contentCount = 0;
                count++;
            }
            if(count >= this.statements.length){
                if(this.showBtn){
                    btnBox.style.opacity = 1;
                }
                this.addCursor(true);
                return this;
            }
            if(this.contents[count][contentCount] === ' '){
                this.parentNode.children[count].innerHTML += '&nbsp;';
            }else if(!this.contents[count][contentCount]);
            else{
                this.parentNode.children[count].innerHTML += this.contents[count][contentCount];
            }
            contentCount++;
            setTimeout(function () {
                that.printContent(count,contentCount);
            },this.delay);
        }

        start(){
            this.getStatements().getLabel().getContent().addLabels().printContent(0,0);
        }
    }
    let resume =  (str,delay,parentNode,showBtn) => new Resume(str,delay,parentNode,showBtn);

    //显示开机画面
    let str0 = resume(str[0],10,text);
    str0.start();

    //显示登录界面
    setTimeout(function () {
        let str1 = resume(str[1],10,text,true);
        str1.start();
    },7000);

    enterBtn.addEventListener('touchstart', function () {
    },false)
})(document);