"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Memento_1 = __importDefault(require("./Memento"));
var Originator = /** @class */ (function () {
    function Originator() {
        this.state = '';
    }
    Originator.prototype.setState = function (state) {
        this.state = state;
    };
    Originator.prototype.getState = function () {
        return this.state;
    };
    Originator.prototype.saveStateToMemento = function () {
        return new Memento_1.default(this.state);
    };
    Originator.prototype.getStateFromMemento = function (Memento) {
        this.state = Memento.getState();
    };
    return Originator;
}());
exports.default = Originator;
