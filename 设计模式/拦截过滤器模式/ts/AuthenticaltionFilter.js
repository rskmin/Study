"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var AuthenticationFilter = /** @class */ (function () {
    function AuthenticationFilter() {
    }
    AuthenticationFilter.prototype.execute = function (request) {
        console.log("Authenticating request: " + request);
    };
    return AuthenticationFilter;
}());
exports.default = AuthenticationFilter;
