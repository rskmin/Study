"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Shape {
    constructor() {
        this.id = '';
        this.type = '';
    }
    getType() {
        return this.type;
    }
    getId() {
        return this.id;
    }
    setId(id) {
        this.id = id;
    }
    clone() {
        // 将当前对象作为新对象的原型返回
        let clone = Object.create(this);
        return clone;
    }
}
exports.default = Shape;
