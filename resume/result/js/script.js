(function () {
    "use strict";
    var str = ['h','e','l','l','o',' ','w','o','r','l','d','!','<br>',
            'h','e','l','l','o',' ','w','o','r','l','d','!','<br>',
            'h','e','l','l','o',' ','w','o','r','l','d','!','<br>',
            'h','e','l','l','o',' ','w','o','r','l','d','!','<br>',
            'h','e','l','l','o',' ','w','o','r','l','d','!','<br>',
            'h','e','l','l','o',' ','w','o','r','l','d','!','<br>',
            'h','e','l','l','o',' ','w','o','r','l','d','!','<br>',
            'h','e','l','l','o',' ','w','o','r','l','d','!'],
        space = '_',
        count = 1,
        text = document.getElementById('text');

    function typewriter(){
        text.innerHTML = '';
        for(var i=0; i<count; i++){
            if(i > str.length-1){
                return 0;
            }
            text.innerHTML += str[i];
        }
        text.innerHTML += space;
        count++;

        setTimeout(typewriter,100);
    }
    typewriter();
})();