"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var CompositeEntity_1 = __importDefault(require("./CompositeEntity"));
// 使用组合实体地客户端类
var Client = /** @class */ (function () {
    function Client() {
        this.compositeEntity = new CompositeEntity_1.default();
    }
    Client.prototype.printData = function () {
        for (var i = 0; i < this.compositeEntity.getData().length; i++) {
            console.log("Data: " + this.compositeEntity.getData()[i]);
        }
    };
    Client.prototype.setData = function (data1, data2) {
        this.compositeEntity.setData(data1, data2);
    };
    return Client;
}());
exports.default = Client;
