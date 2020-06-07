"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var VlcPlayer_1 = __importDefault(require("./VlcPlayer"));
var Mp4Player_1 = __importDefault(require("./Mp4Player"));
var MediaAdapter = /** @class */ (function () {
    function MediaAdapter(audioType) {
        if (audioType === 'vlc') {
            this.advancedMusicPlayer = new VlcPlayer_1.default();
        }
        else if (audioType === 'mp4') {
            this.advancedMusicPlayer = new Mp4Player_1.default();
        }
    }
    MediaAdapter.prototype.play = function (audioType, fileName) {
        var _a, _b;
        if (audioType === 'vlc') {
            (_a = this.advancedMusicPlayer) === null || _a === void 0 ? void 0 : _a.playVlc(fileName);
        }
        else if (audioType === 'mp4') {
            (_b = this.advancedMusicPlayer) === null || _b === void 0 ? void 0 : _b.playMp4(fileName);
        }
    };
    return MediaAdapter;
}());
exports.default = MediaAdapter;
