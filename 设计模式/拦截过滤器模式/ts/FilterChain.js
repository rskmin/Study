"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var FilterChain = /** @class */ (function () {
    function FilterChain() {
        this._filters = [];
    }
    FilterChain.prototype.addFilter = function (filter) {
        this._filters.push(filter);
    };
    FilterChain.prototype.execute = function (request) {
        var _a;
        for (var _i = 0, _b = this._filters; _i < _b.length; _i++) {
            var filter = _b[_i];
            filter.execute(request);
        }
        (_a = this._target) === null || _a === void 0 ? void 0 : _a.execute(request);
    };
    FilterChain.prototype.setTarget = function (target) {
        this._target = target;
    };
    return FilterChain;
}());
exports.default = FilterChain;
