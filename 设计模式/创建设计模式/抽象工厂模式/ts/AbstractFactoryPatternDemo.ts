import FactoryProducer from './FactoryProducer'

// 获取形状工厂
const shapeFactory = FactoryProducer.getFactory('SHAPE')

// 获取形状为 Circle 的对象
const shape1 = shapeFactory?.getShape('CIRCLE')

// 调用 Circle 的 draw 方法
shape1?.draw()

// 获取形状为 Rectangle 的对象
const shape2 = shapeFactory?.getShape('RECTANGLE')

// 调用 Rectangle 的 draw 方法
shape2?.draw()

// 获取形状为 Square 的对象
const shape3 = shapeFactory?.getShape('SQUARE')

// 调用 Square 的 draw 方法
shape3?.draw()

// 获取颜色工厂
const colorFactory = FactoryProducer.getFactory('COLOR')

// 获取颜色为 Red 的对象
const color1 = colorFactory?.getColor('RED')

// 调用 Red 的 fill 方法
color1?.fill()

// 获取颜色为 Green 的对象
const color2 = colorFactory?.getColor('GREEN')

// 调用 Green 的 fill 方法
color2?.fill()

// 获取颜色为 Blue 的对象
const color3 = colorFactory?.getColor('Blue')

// 调用 Blue 的 fill 方法
color3?.fill()