//一系列对象
class Rectangle {
  draw() {
    console.log( "Inside Rectangle::draw() method." )
  }
}

class Square {
  draw() {
    console.log( "Inside Square::draw() method." )
  }
}

class Circle {
  draw() {
    console.log( "Inside Circle::draw() method." )
  }
}

//黄族和蓝族
//黄族工厂
function yellowFactory( shape ) {
  if( shape === 'rectangle' ) {
    return new YellowRectangle()
  } else if( shape === 'square' ) {
    return new YellowSquare()
  } else if( shape === 'circle' ) {
    return new YellowCircle()
  }
  return null
}
//蓝族工厂
function blueFactory( shape ) {
  if( shape === 'rectangle' ) {
    return new BlueRectangle()
  } else if( shape === 'square' ) {
    return new BlueSquare()
  } else if( shape === 'circle' ) {
    return new BlueCircle()
  }
  return null
}

