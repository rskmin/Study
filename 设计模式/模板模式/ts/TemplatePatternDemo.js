"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Cricket_1 = __importDefault(require("./Cricket"));
var Football_1 = __importDefault(require("./Football"));
var game = new Cricket_1.default();
game.play();
game = new Football_1.default();
game.play();
