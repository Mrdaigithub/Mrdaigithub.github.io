(function (WIN, DOC) {

    class Data{
        constructor(data){
            this.data = data;
            this.current = null;
        }

        addData(){
            
        }

        rmData(){

        }

        findData(){

        }

    }

    class View{

    }



    let jsonData = [
        {
            name:'main',
            child:[
                {
                    name:'file1.1',
                    child:[]
                },
                {
                    name:'file1.2',
                    child:[]
                }
            ]
        },
        {
            name:'file2',
            child:[
                {
                    name:'file2.1',
                    child:[
                        {
                            name:'file2.1.1',
                            child:[]
                        }
                    ]
                },
                {
                    name:'file2.2',
                    child:[]
                }
            ]
        }
    ],
        data = new Data(jsonData);
    data.show();
})(window,document);