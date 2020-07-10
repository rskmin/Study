"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Student_1 = __importDefault(require("./Student"));
var StudentController_1 = __importDefault(require("./StudentController"));
var StudentView_1 = __importDefault(require("./StudentView"));
var model = new Student_1.default({ name: 'Li', rollNo: '111' });
// let model: Student = new Student({name: 'Li', rollNo: '111'})
var view = new StudentView_1.default();
var controller = new StudentController_1.default(model, view);
controller.updateView();
// 跟新数据模型
controller.setStudentName('John');
controller.updateView();
