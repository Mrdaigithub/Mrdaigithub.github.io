import '../sass/style.scss';
import {fun,a,b} from './app.js';
class Person{
    constructor(name,age){
        this.name=name;
        this.age=age;
        this.sex='man';
    }
    callName(){
        console.log(this.name);
    }
}
let c = new Person('dai',100);
c.callName();
console.log(a,b);
let xx = fun();
xx();
xx();
xx();
xx();
xx();
xx();
xx();