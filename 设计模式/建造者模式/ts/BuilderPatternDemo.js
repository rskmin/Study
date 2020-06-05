"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var MealBuilder_1 = __importDefault(require("./MealBuilder"));
var mealBuilder = new MealBuilder_1.default;
var vegMeal = mealBuilder.prepareVegMeal();
console.log('Veg Meal');
vegMeal.showItems();
console.log("Total Cost: " + vegMeal.getCost());
var nonVegMeal = mealBuilder.prepareNonVegMeal();
console.log('\n\nnonVeg Meal');
nonVegMeal.showItems();
console.log("Total Cost: " + nonVegMeal.getCost());
