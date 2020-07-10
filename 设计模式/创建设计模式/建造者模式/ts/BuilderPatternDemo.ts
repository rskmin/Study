import MealBuilder from './MealBuilder'
import Meal from './Meal'

const mealBuilder: MealBuilder = new MealBuilder

const vegMeal: Meal = mealBuilder.prepareVegMeal()
console.log('Veg Meal')
vegMeal.showItems()
console.log(`Total Cost: ${vegMeal.getCost()}`)

const nonVegMeal: Meal = mealBuilder.prepareNonVegMeal()
console.log('\n\nnonVeg Meal')
nonVegMeal.showItems()
console.log(`Total Cost: ${nonVegMeal.getCost()}`)