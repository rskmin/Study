"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Student = /** @class */ (function () {
    function Student(name, rollNo) {
        this._name = name;
        this._rollNo = rollNo;
    }
    Object.defineProperty(Student.prototype, "name", {
        get: function () {
            return this._name;
        },
        set: function (v) {
            this._name = v;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Student.prototype, "rollNo", {
        get: function () {
            return this._rollNo;
        },
        set: function (v) {
            this._rollNo = v;
        },
        enumerable: true,
        configurable: true
    });
    return Student;
}());
exports.default = Student;
