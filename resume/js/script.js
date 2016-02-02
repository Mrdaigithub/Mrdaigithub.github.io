(function (document) {
    "use strict";
    const DOC = document;

    let str = '<h1 class="green">hello world!</h1>\\',
        text = DOC.getElementById('text');

    class Resume{
        constructor(str,delay,parentNode){
            this.str = str;
            this.delay = delay;
            this.parentNode = parentNode;
            this.sumReg = /<\w+\s*(\w+=('|")\w+('|")\s*)*>.*<\/\w+>\\/g;
            this.labelReg = /<\w+\s*(\w+=('|")\w+('|")\s*)*>/;
            this.contentReg = />.*</;
            this.statements = [];
            this.labels = [];
            this.contents = [];
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
            for(let i=0; i<this.labels.length; i++){
                this.parentNode.innerHTML += this.labels[i];
            }
            return this;
        }

        //打印内容
        printContent(count,contentCount){
            let that = this;
            if(count > this.statements.length){
                return this;
            }
            if(contentCount >= this.contents[count].length){
                contentCount = 0;
                count++;
            }
            console.log(this.parentNode.children[count]);
            this.parentNode.children[count].innerHTML += this.contents[count][contentCount];
            contentCount++;
            setTimeout(function () {
                that.printContent(count,contentCount);
            },this.delay);
        }

        start(){
            this.getStatements().getLabel().getContent().addLabels().printContent(0,0);
        }
    }
    let resume =  (str,delay,parentNode) => new Resume(str,delay,parentNode);

    let xx = resume(str,30,text);
    xx.start();
})(document);