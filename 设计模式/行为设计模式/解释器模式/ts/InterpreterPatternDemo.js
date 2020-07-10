"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var TerminalExpression_1 = __importDefault(require("./TerminalExpression"));
var OrExpression_1 = __importDefault(require("./OrExpression"));
var AndExpression_1 = __importDefault(require("./AndExpression"));
function getMaleExpression() {
    var robert = new TerminalExpression_1.default('Robert');
    var john = new TerminalExpression_1.default('John');
    return new OrExpression_1.default(robert, john);
}
function getMarriedWomanExpression() {
    var julie = new TerminalExpression_1.default('Julie');
    var married = new TerminalExpression_1.default('Married');
    return new AndExpression_1.default(julie, married);
}
var isMale = getMaleExpression();
var isMarriedWoman = getMarriedWomanExpression();
console.log("John is male? " + isMale.interpret('John'));
console.log("Julie is a married women? " + isMarriedWoman.interpret('Married Julie'));
