"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 请求处理程序
 */
var Target = /** @class */ (function () {
    function Target() {
    }
    Target.prototype.execute = function (request) {
        console.log("Executing request: " + request);
    };
    return Target;
}());
exports.default = Target;
