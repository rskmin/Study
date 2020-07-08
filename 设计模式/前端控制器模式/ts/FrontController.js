"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Dispatcher_1 = __importDefault(require("./Dispatcher"));
// 前端控制器
var FrontController = /** @class */ (function () {
    function FrontController() {
        this._dispatcher = new Dispatcher_1.default();
    }
    /**
     * 用户身份验证
     * @return {boolean}
     */
    FrontController.prototype.isAuthenticUser = function () {
        console.log('User is authenticated successfully.');
        return true;
    };
    /**
     * 记录每一个请求
     * @param {string} request
     */
    FrontController.prototype.trackRequest = function (request) {
        console.log("Page requested: " + request);
    };
    FrontController.prototype.dispatchRequest = function (request) {
        this.trackRequest(request);
        if (this.isAuthenticUser()) {
            this._dispatcher.dispatch(request);
        }
    };
    return FrontController;
}());
exports.default = FrontController;
