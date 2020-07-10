"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var MediaAdapter_1 = __importDefault(require("./MediaAdapter"));
var AudioPlayer = /** @class */ (function () {
    function AudioPlayer() {
    }
    AudioPlayer.prototype.play = function (audioType, fileName) {
        if (audioType === 'mp3') {
            console.log("Playing mp3 file. Name: " + fileName);
        }
        else if (audioType === 'vlc' || audioType === 'mp4') {
            this.mediaAdapter = new MediaAdapter_1.default(audioType);
            this.mediaAdapter.play(audioType, fileName);
        }
        else {
            console.log("Invalid media. " + audioType + " format not supported");
        }
    };
    return AudioPlayer;
}());
exports.default = AudioPlayer;
