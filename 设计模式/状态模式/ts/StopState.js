"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var StopState = /** @class */ (function () {
    function StopState() {
    }
    StopState.prototype.doAction = function (context) {
        console.log('Player is in stop state');
        context.setState(this);
    };
    StopState.prototype.toString = function () {
        return 'Stop State';
    };
    return StopState;
}());
exports.default = StopState;
