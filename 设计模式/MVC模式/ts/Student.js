"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Student = /** @class */ (function () {
    function Student(object) {
        var name = object.name, rollNo = object.rollNo;
        this._name = name;
        this._rollNo = rollNo;
    }
    Object.defineProperty(Student.prototype, "rollNo", {
        get: function () {
            return this._rollNo || '';
        },
        set: function (newRollNo) {
            this._name = newRollNo;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Student.prototype, "name", {
        get: function () {
            return this._name || '';
        },
        set: function (newName) {
            this._name = newName;
        },
        enumerable: true,
        configurable: true
    });
    return Student;
}());
exports.default = Student;
