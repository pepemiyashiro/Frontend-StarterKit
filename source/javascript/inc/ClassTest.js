export class ClassTest {

  constructor(){
    this.saludo = "Hola";
  }

  sayHi(name){
    console.log( this.saludo  + ' ' + name)
  }

}

// module.exports = ClassTest;