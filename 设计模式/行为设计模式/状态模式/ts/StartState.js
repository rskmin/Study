"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var StartState = /** @class */ (function () {
    function StartState() {
    }
    StartState.prototype.doAction = function (context) {
        console.log('Player is in start state');
        context.setState(this);
    };
    StartState.prototype.toString = function () {
        return 'Start State';
    };
    return StartState;
}());
exports.default = StartState;
