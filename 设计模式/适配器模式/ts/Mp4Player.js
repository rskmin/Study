"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Mp4Player = /** @class */ (function () {
    function Mp4Player() {
    }
    Mp4Player.prototype.playVlc = function (fileName) { };
    Mp4Player.prototype.playMp4 = function (fileName) {
        console.log("Playing mp4 file. Name: " + fileName);
    };
    return Mp4Player;
}());
exports.default = Mp4Player;
