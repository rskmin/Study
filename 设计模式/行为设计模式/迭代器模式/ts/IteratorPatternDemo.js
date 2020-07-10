"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var NameRepository_1 = __importDefault(require("./NameRepository"));
var nameRepository = new NameRepository_1.default();
for (var iter = nameRepository.getIterator(); iter.hasNext();) {
    console.log("Name : " + iter.next());
}
