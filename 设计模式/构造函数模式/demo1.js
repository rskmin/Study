/*
 *function Car(model, year, miles) {
 *  this.model = model
 *  this.year = year
 *  this.miles = miles
 *
 *  this.toString = function () {
 *    return this.model + " has dome " + this.miles + " miles"
 *  }
 *}
 *
 *let civic = new Car( "Honda Civic", 2009, 20000 )
 *let modeo = new Car( "Ford Mondeo" , 2010, 500 )
 *
 *console.log(civic.toString())
 */


/*
 *function Car( model, year, miles ) {
 *  this.model = model
 *  this.year = year
 *  this.miles = miles
 *}
 *
 *Car.prototype.toString = function() {
 *  return `${ this.model } has done ${ this.miles } miles`
 *}
 *
 *
 * let civic = new Car( "Honda Civic", 2009, 20000 )
 * let modeo = new Car( "Ford Mondeo" , 2010, 500 )
 *
 *console.log( Object.getPrototypeOf(civic).toString === Object.getPrototypeOf(modeo).toString )
 */


function Person( name, age ) {
  this.name = name
  this.age = age
}

Person.prototype.say = function() {
  console.log( `I am ${ this.name }, I am ${ this.age } years old` )
}

let person1 = new Person( "R", 18 )
person1.say()
let person2 = new Person( "Q", 19 )
person2.say()
console.log(person2.say === person1.say)
