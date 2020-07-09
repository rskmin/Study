"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var DebugFilter = /** @class */ (function () {
    function DebugFilter() {
    }
    DebugFilter.prototype.execute = function (request) {
        console.log("request log: " + request);
    };
    return DebugFilter;
}());
exports.default = DebugFilter;
