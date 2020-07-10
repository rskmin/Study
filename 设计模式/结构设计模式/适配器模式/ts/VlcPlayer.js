"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var VlcPlayer = /** @class */ (function () {
    function VlcPlayer() {
    }
    VlcPlayer.prototype.playVlc = function (fileName) {
        console.log("Playing vlc file. Name: " + fileName);
    };
    VlcPlayer.prototype.playMp4 = function (fileName) { };
    return VlcPlayer;
}());
exports.default = VlcPlayer;
