//产品信息
const ABCStock = (function() {
  let name = "ABC"
  let quantity = 10
  return class {
    buy() {
      console.log(`Stock [ Name: ${ name }, Quantity: ${ quantity } ] bought`)
    }
    sell() {
      console.log(`Stock [ Name: ${ name }, Quantity: ${ quantity } ] sold`)
    }
  }
})()


//购买请求
const BuyStock = (function() {
  let _Stock = null
  return class {
    constructor( Stock ) {
      _Stock = Stock
    }
    execute() {
      _Stock.buy()
    }
  }
})()

//销售请求
const SellStock = (function() {
  let _Stock = null
  return class {
    constructor( Stock ) {
      _Stock = Stock
    }
    execute() {
      _Stock.sell()
    }
  }
})()

//销售经理(请求处理中心)
const Broker = (function() {
  let _orderList = []
  return class {
    //添请求
    takeOrder( order ) {
      _orderList.push( order )
    }
    //处理请求
    placeOrders() {
      for(let order of _orderList) {
        order.execute()
      }
      //清空列表
      _orderList.length = 0
    }
  }
})()

let abcStock = new ABCStock()

let buyStockOrder = new BuyStock( abcStock )
let sellStockOrder = new SellStock( abcStock )

let broker = new Broker()
broker.takeOrder( buyStockOrder )
broker.takeOrder( sellStockOrder )

broker.placeOrders()

