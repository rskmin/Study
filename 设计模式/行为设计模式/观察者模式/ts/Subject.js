"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 观察者管理类
 */
var Subject = /** @class */ (function () {
    function Subject() {
        this.observers = [];
    }
    Subject.prototype.getState = function () {
        return this.state || 0;
    };
    Subject.prototype.setState = function (state) {
        this.state = state;
        this.notifyAllObservers();
    };
    Subject.prototype.attach = function (observer) {
        this.observers.push(observer);
    };
    Subject.prototype.notifyAllObservers = function () {
        for (var _i = 0, _a = this.observers; _i < _a.length; _i++) {
            var observer = _a[_i];
            observer.update();
        }
    };
    return Subject;
}());
exports.default = Subject;
