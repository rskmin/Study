"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var AudioPlayer_1 = __importDefault(require("./AudioPlayer"));
var audioPlayer = new AudioPlayer_1.default();
audioPlayer.play('mp3', 'beyond the horizon.mp3');
audioPlayer.play('mp4', 'alone.mp4');
audioPlayer.play('vlc', 'far far away.vlc');
audioPlayer.play('avi', 'mind me.avi');
