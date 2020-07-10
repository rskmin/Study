//用户
function User( name ) {
  this.name = name
  this.wind = []
}

User.prototype.sendMessage = function( msg ) {
  mediator.pushMessage( msg )
}

let mediator = {
  users: [],
  pushMessage( msg ) {
    this.users.forEach( user => user.wind.push( msg ) )
  }
}

let user1 = new User("R")
let user2 = new User("Q")
let user3 = new User("X")
mediator.users.push( user1, user2, user3 )

//此后由中介者向各个用户的窗体推送信息
user1.sendMessage( "Hello" )
user2.sendMessage( "Who are you?" )
console.log( user1.wind )
console.log( user2.wind )
console.log( user3.wind )
