import ShapeFactory from './ShapeFactory'
import Circle from './Circle'
import Square from './Square'
import Rectangle from './Rectangle'

const shapeFactory: ShapeFactory = new ShapeFactory()

const shape1: Circle | Square | Rectangle | null = shapeFactory.getShape('CIRCLE')
shape1?.draw()

const shape2: Circle | Square | Rectangle | null = shapeFactory.getShape('RECTANGLE')
shape2?.draw()

const shape3: Circle | Square | Rectangle | null = shapeFactory.getShape('SQUARE')
shape3?.draw()
