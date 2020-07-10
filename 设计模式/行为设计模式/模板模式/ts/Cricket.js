"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Game_1 = __importDefault(require("./Game"));
var Cricket = /** @class */ (function (_super) {
    __extends(Cricket, _super);
    function Cricket() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Cricket.prototype.initialize = function () {
        console.log('Cricket Game Initialized! Start playing.');
    };
    Cricket.prototype.startPlay = function () {
        console.log('Cricket Game Started. Enjoy the game!');
    };
    Cricket.prototype.endPlay = function () {
        console.log('Cricket Game Finished!');
    };
    return Cricket;
}(Game_1.default));
exports.default = Cricket;
