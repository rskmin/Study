import Stock from "./Stock";
import BuyStock from "./BuyStock";
import SellStock from "./SellStock";
import Broker from "./Broker";

const abcStock = new Stock()

const buyStockOrder: BuyStock = new BuyStock(abcStock)
const sellStockOrder: SellStock = new SellStock(abcStock)

const broker: Broker = new Broker()
broker.takeOrder(buyStockOrder)
broker.takeOrder(sellStockOrder)

broker.placeOrders()