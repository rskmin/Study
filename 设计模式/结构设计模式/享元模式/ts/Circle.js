"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Circle {
    constructor(color) {
        this.x = 0;
        this.y = 0;
        this.radius = 0;
        this.color = color;
    }
    setX(x) {
        this.x = x;
    }
    setY(y) {
        this.y = y;
    }
    setRadius(radius) {
        this.radius = radius;
    }
    draw() {
        console.log(`Circle: Draw() [Color : "${this.color}", x : "${this.x}", y : "${this.radius}", radius : "${this.radius}"]`);
    }
}
exports.default = Circle;
