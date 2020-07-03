"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var StudentController = /** @class */ (function () {
    function StudentController(model, view) {
        this._model = model;
        this._view = view;
    }
    StudentController.prototype.setStudentName = function (name) {
        this._model.name = name;
    };
    StudentController.prototype.getStudentName = function () {
        return this._model.name;
    };
    StudentController.prototype.setStudentRollNo = function (rollNo) {
        this._model.rollNo = rollNo;
    };
    StudentController.prototype.getStudentRollNo = function () {
        return this._model.rollNo;
    };
    StudentController.prototype.updateView = function () {
        this._view.printStudentDetails(this._model.name, this._model.rollNo);
    };
    return StudentController;
}());
exports.default = StudentController;
