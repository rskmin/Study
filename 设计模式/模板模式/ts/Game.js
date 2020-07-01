"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Game = /** @class */ (function () {
    function Game() {
    }
    Game.prototype.play = function () {
        this.initialize();
        this.startPlay();
        this.endPlay();
    };
    return Game;
}());
exports.default = Game;
