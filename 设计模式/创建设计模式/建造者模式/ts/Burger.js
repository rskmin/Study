"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Wrapper_1 = __importDefault(require("./Wrapper"));
// 汉堡抽象类
var Burger = /** @class */ (function () {
    function Burger() {
    }
    Burger.prototype.packing = function () {
        return new Wrapper_1.default();
    };
    return Burger;
}());
exports.default = Burger;
