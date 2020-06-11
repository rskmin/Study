import Circle from "./Circle";
import RedShapeDecorator from "./RedShapeDecorator";
import Rectangle from "./Rectangle";
import Shape from "./Shape";

const circle: Shape = new Circle()
const redCircle: Circle = new RedShapeDecorator(new Circle)
const RedRectangle: Rectangle = new RedShapeDecorator(new Rectangle())

console.log('Circle with normal border')
circle.draw()

console.log('Circle of red border')
redCircle.draw()

console.log('Rectangle of red border')
RedRectangle.draw()