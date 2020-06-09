import Circle from "./Circle";
import RedCircle from "./RedCircle";
import GreenCircle from "./GreenCircle";

// 只要求知道是个圆
const redCircle: Circle = new Circle(100, 100, 10, new RedCircle())
const greenCircle: Circle = new Circle(100, 100, 10, new GreenCircle())

redCircle.draw()
greenCircle.draw()