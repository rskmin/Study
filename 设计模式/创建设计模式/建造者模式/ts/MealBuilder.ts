import Meal from "./Meal";
import VegBurger from "./VegBurger";
import Coke from "./Coke";
import ChickenBurger from "./ChickenBurger";
import Pepsi from "./Pepsi";

// 套餐工厂
export default class MealBuilder {
  public prepareVegMeal(): Meal {
    const meal: Meal = new Meal()
    meal.addItem(new VegBurger()).addItem(new Coke())
    return meal
  }
  public prepareNonVegMeal(): Meal {
    const meal: Meal = new Meal()
    meal.addItem(new ChickenBurger()).addItem(new Pepsi())
    return meal
  }
}
