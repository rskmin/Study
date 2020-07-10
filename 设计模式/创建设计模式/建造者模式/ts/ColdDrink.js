"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Bottle_1 = __importDefault(require("./Bottle"));
// 冷饮抽象类
var ColdDrink = /** @class */ (function () {
    function ColdDrink() {
    }
    ColdDrink.prototype.packing = function () {
        return new Bottle_1.default();
    };
    return ColdDrink;
}());
exports.default = ColdDrink;
