"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var RealImage = /** @class */ (function () {
    function RealImage(fileName) {
        this.fileName = fileName;
        this.loadFromDisk(fileName);
    }
    RealImage.prototype.display = function () {
        console.log("Displaying " + this.fileName);
    };
    RealImage.prototype.loadFromDisk = function (fileName) {
        console.log("Loading " + this.fileName);
    };
    return RealImage;
}());
exports.default = RealImage;
