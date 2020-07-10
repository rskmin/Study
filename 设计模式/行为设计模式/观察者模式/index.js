//观察者列表构造函数
function ObserverList() {
  this.observerList = []
}

//注册方法
ObserverList.prototype.add = function( obj ) {
  return this.observerList.push( obj )
}

//统计方法
ObserverList.prototype.count = function() {
  return this.observerList.length
}

//获取观察者的方法
ObserverList.prototype.get = function( index ) {
  if( index > -1 && index < this.observerList.length ) {
    return this.observerList[ index ]
  }
}

//取消注册的方法
//获取观察者在注册表的位置
ObserverList.prototype.indexOf = function( obj, startIndex ) {
  let i = startIndex

  while( i < this.observerList.length ) {
    if( this.observerList[i] === ogj ) {
      return i
    }
    i++
  }
  return -1
}
//删除观察者
ObserverList.prototype.remove = function( index ) {
  this.observerList.splice( index, 1 )
}



//主题构造函数
function Subject() {
  this.observers = new ObserverList()
}

//向列表添加观察者的方法
Subject.prototype.addObserver = function( observer ) {
  this.observers.add( observer )
}

//移除列表中的观察者的方法
Subject.prototype.removeObserver =function( observer ) {
  this.observers.removeAt( this.observers.indexOf( observer, 0 ) )
}

//向观察者发起通知的方法
Subject.prototype.notify = function( context ) {
  //统计观察者数量
  let observerCount = this.observers.count()
  for( let i = 0; i < observerCount; i++ ) {
    //让每个观察者调用更新方法
    this.observers.get(i).updata( context )
  }
}



//观察者构造函数
function Observer() {
  //这里模拟具有不同更新方法的不同类型对象
  this.updata = function() {

  }
}
