"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Meal_1 = __importDefault(require("./Meal"));
var VegBurger_1 = __importDefault(require("./VegBurger"));
var Coke_1 = __importDefault(require("./Coke"));
var ChickenBurger_1 = __importDefault(require("./ChickenBurger"));
var Pepsi_1 = __importDefault(require("./Pepsi"));
// 套餐工厂
var MealBuilder = /** @class */ (function () {
    function MealBuilder() {
    }
    MealBuilder.prototype.prepareVegMeal = function () {
        var meal = new Meal_1.default();
        meal.addItem(new VegBurger_1.default()).addItem(new Coke_1.default());
        return meal;
    };
    MealBuilder.prototype.prepareNonVegMeal = function () {
        var meal = new Meal_1.default();
        meal.addItem(new ChickenBurger_1.default()).addItem(new Pepsi_1.default());
        return meal;
    };
    return MealBuilder;
}());
exports.default = MealBuilder;
