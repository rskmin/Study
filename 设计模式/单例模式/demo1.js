/*
 *let SingletonInterface = (function () {
 *  //私有构造器
 *  function Singleton() {
 *    this.meg = "Hello!"
 *  }
 *
 *  //实例容器
 *  let instance
 *
 *  //暴露出一个访问点
 *  return {
 *    getInstance: function() {
 *      if(instance === undefined) {
 *        instance = new Singleton()
 *      }
 *      return instance
 *    }
 *  }
 *})()
 *
 *let singleton = SingletonInterface.getInstance()
 *console.log(singleton.meg) // Hello!
 *let singleton2 = SingletonInterface.getInstance()
 *console.log(singleton === singleton2) // true
 */


/*
 *function Singleton() {
 *  //判断是否存在实例
 *  if(typeof Singleton.instance === 'object') {
 *    return Singleton.instance
 *  }
 *
 *  this.msg = "Hello!"
 *
 *  //实例容器
 *   Singleton.instance = this
 *}
 *
 *let singleton = new Singleton()
 *console.log(singleton.msg) // Hello!
 *let singleton2 = new Singleton()
 *console.log(singleton === singleton2) // true
 */

function Singleton() {
  //实例容器
  let instance = this

  this.msg = "Hello!"

  //重写构造函数
  Singleton = function () {
    return instance
  }
}
let singleton = new Singleton()
console.log(singleton.msg) // Hello!
let singleton2 = new Singleton()
console.log(singleton === singleton2) // true
