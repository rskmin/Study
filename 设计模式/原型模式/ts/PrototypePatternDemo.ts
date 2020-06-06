import ShapeCache from './ShapeCache'
import Shape from './Shape'

ShapeCache.loadCache()

const cloneShape: Shape = ShapeCache.getShape('1')
console.log(`Shape : ${cloneShape.getType()}`)

const cloneShape2: Shape = ShapeCache.getShape('2')
console.log(`Shape : ${cloneShape2.getType()}`)

const cloneShape3: Shape = ShapeCache.getShape('3')
console.log(`Shape : ${cloneShape3.getType()}`)
