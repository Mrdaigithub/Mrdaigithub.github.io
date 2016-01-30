(function () {
    "use strict";
    var text = document.getElementById('text'),
        str = 'hello world!&hello javascript and nodeJs!',
        count = 1,
        arr = [];
    function typewrite(){
        for(var i=0; i<str.length; i++){
            arr.push(str[i]);
        }
        if(count > arr.length){
            return 0;
        }
        text.innerHTML = '';
        for(var j=0; j<count; j++){
            if(/&/.test(arr[j])){
                arr.splice(j,1);
                text.innerHTML += '<br>';
            }
            text.innerHTML += arr[j];
        }
        text.innerHTML += '<span class="cursor">_</span>';
        count++;
        setTimeout(typewrite,100);
    }
    typewrite();
})();