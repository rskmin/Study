"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Client = /** @class */ (function () {
    function Client() {
    }
    Client.prototype.setFilterManager = function (filterManager) {
        this.filterManager = filterManager;
    };
    Client.prototype.sendRequest = function (request) {
        var _a;
        (_a = this.filterManager) === null || _a === void 0 ? void 0 : _a.filterRequest(request);
    };
    return Client;
}());
exports.default = Client;
