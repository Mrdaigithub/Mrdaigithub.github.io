class Layout{
    constructor(name){
        this.name = name;
        this.age = 100;
    }
    
    callName(){
        alert(this.name);
    }
    callAge(){
        alert(this.age);
    }
}

export {Layout};