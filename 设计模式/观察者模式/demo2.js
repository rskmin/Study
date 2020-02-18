let pubsub = {}

;(function(obj) {
  //存放订阅
  /*
   *  {
   *    event1: [ { token: token, func: func } ],
   *    event2: [ { token: token, func: func } ]
   *  }
   */
  let topics = {}

  let subUid = -1

  //发布方法
  obj.publish = function( topic, args ) {
    if( !topics[ topic ] ) {//该事件没有订阅者
      return false
    }

    const subscribers = topics[ topic ]
    let len = subscribers ? subscribers.length : 0

    while(len--) {
      subscribers[len].func( topic, args )
    }

    return this
  }

  //订阅方法
  obj.subscribe = function( topic, func ) {
    if( !topics[topic] ) {
      topics[topic] = []
    }

    let token = ( ++subUid ).toString()
    topics[ topic ].push({
      token: token,
      func: func
    })

    return token
  }

  //取消订阅方法
  obj.unsubscribe = function( token ) {
    for( let m in topics ) {
      if( topics[m] ) {
        for( let i = 0, j = topics[m].length; i < j; i++ ) {
          if( topics[m][i].token === token ) {
            topics[m].splice( i, 1 )
            return token
          }
        }
      }
    }
    return this
  }

})( pubsub )




//使用

let messageLogger = function( topics, data ) {
  console.log( `Logging: ${ topics } : ${ data }` )
}

//订阅事件
let subscription =pubsub.subscribe( "log", messageLogger )

//发布事件
pubsub.publish( "log", "hello world!" )

//取消订阅
pubsub.unsubscribe( subscription )

pubsub.publish( "log", "hello world!" )
