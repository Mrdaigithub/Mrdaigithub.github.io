(function () {
    "use strict";
    let str = ['hello world!'],
        count = 1,
        text = document.getElementById('text');
    setTimeout(function () {
        text.innerHTML = null;
        for(let i=0; i<count; i++){
            text.innerHTML += str[i];
        }
        count++;
    },300)

})();