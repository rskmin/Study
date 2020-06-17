"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Stock_1 = __importDefault(require("./Stock"));
var BuyStock_1 = __importDefault(require("./BuyStock"));
var SellStock_1 = __importDefault(require("./SellStock"));
var Broker_1 = __importDefault(require("./Broker"));
var abcStock = new Stock_1.default();
var buyStockOrder = new BuyStock_1.default(abcStock);
var sellStockOrder = new SellStock_1.default(abcStock);
var broker = new Broker_1.default();
broker.takeOrder(buyStockOrder);
broker.takeOrder(sellStockOrder);
broker.placeOrders();
