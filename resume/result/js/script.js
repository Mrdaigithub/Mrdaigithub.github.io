(function () {
    "use strict";
    var text = document.getElementById('text'),
        str = 'press enter to continue&' +
            '<span class="fontColorGreen">hello world!</span> ' +
            '<span class="fontColorGreen">good night!</span>',
        count = 0,
        arr = [];
    for(var i=0; i<str.length; i++){
        arr.push(str[i]);
    }
    function typewrite(){
        if(count > arr.length-1){
            text.innerHTML += ' <span class="cursor">_</span>';
            return 0;
        }

        if(/&/.test(arr[count])){
            text.innerHTML += '<br>';
        }else if(arr[count] === '<'){
            var obj = writeHTML(count);
            count = obj.count;
            text.innerHTML += obj.label;
            var timer = null,
                fontCount = 0;
            timer = setInterval(function () {
                if(fontCount >= obj.content.length-1){
                    clearInterval(timer);
                }
                text.getElementsByClassName('fontColorGreen')[text.getElementsByClassName('fontColorGreen').length-1].innerHTML +=
                    obj.content[fontCount];
                fontCount++;
            },50);
        }else{
            text.innerHTML += arr[count];
        }

        count++;
        setTimeout(typewrite,50);
    }
    typewrite();
    function writeHTML(start){
        var obj = {
                str : '',
                count : start,
                label: '',
                content: ''
        },
            reg = /^<\w+(\s+\w+=('|")(\s*\w+\s*)*('|"))*>.*<\/\w+>/;
        obj.str += str[obj.count];
        while(!(reg.test(obj.str))){
            obj.count++;
            obj.str += str[obj.count];
        }
        obj.content = obj.str.match(/>.*</)[0].replace(/<|>/g,'');
        var regLabel = new RegExp(obj.content);
        obj.label = obj.str.replace(regLabel,'');
        return obj;
    }
})();