"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var StudentView_1 = __importDefault(require("./StudentView"));
var HomeView_1 = __importDefault(require("./HomeView"));
// 请求转发器 - 转发到对应视图层
var Dispatcher = /** @class */ (function () {
    function Dispatcher() {
        this._studentView = new StudentView_1.default;
        this._homeView = new HomeView_1.default();
    }
    Dispatcher.prototype.dispatch = function (request) {
        if (request.toLocaleUpperCase() === 'STUDENT') {
            this._studentView.show();
        }
        else {
            this._homeView.show();
        }
    };
    return Dispatcher;
}());
exports.default = Dispatcher;
