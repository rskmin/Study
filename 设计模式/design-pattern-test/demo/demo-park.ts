// 车辆进入信息接口
interface CarEntryInfo {
  num: number
  inTime: number
}

// 车辆停下的信息接口
interface CarStopInfo extends CarEntryInfo {
  place: Place
}

// 车
class Car {
  constructor(public num: number) {
    this.num = num
  }
}

// 摄像头
class Camera {
  shot(car: Car): CarEntryInfo {
    return {
      num: car.num,
      inTime: Date.now()
    }
  }
}

// 出口显示屏
class ExportScreen {
  show(car: Car, inTime: number) {
    console.log('车牌号', car.num)
    console.log('停车时间', Date.now() - inTime)
  }
}

// 停车场
class Park {
  camera: Camera
  carList: {
    [x: number]: CarStopInfo
    [x: string]: CarStopInfo
  }
  exportScreen: ExportScreen
  constructor(public floors: Array<Floor>) {
    this.floors = floors || []
    this.camera = new Camera()
    this.exportScreen = new ExportScreen()
    this.carList = {}
  }
  in(car: Car) {
    // 通过摄像头获取信息
    const entryInfo: CarEntryInfo = this.camera.shot(car)
    // 停到某某个停车位
    const i: number = parseInt(String(Math.random() * 100 % 100))
    const place: Place = this.floors[0].places[i]
    place.in()
    const stopInfo: CarStopInfo = {
      ...entryInfo,
      place
    }
    // 记录信息
    this.carList[car.num] = stopInfo
  }
  out(car: Car) {
    // 获取信息
    const stopInfo: CarStopInfo = this.carList[car.num]
    // 将停车位清空
    const place: Place = stopInfo.place
    place.out()
    // 显示时间
    this.exportScreen.show(car, stopInfo.inTime)
    // 清空记录
    Reflect.deleteProperty(this.carList, car.num)
  }
  emptyNum(): string {
    return this.floors.map(floor => {
      return `${floor.index} 层还有 ${floor.emptyPlaceNum()} 个空闲车位`
    }).join('\n')
  }
}

// 楼层
class Floor {
  constructor(public index: number, public places: Array<Place>) {
    this.index = index
    this.places = places || []
  }
  emptyPlaceNum(): number {
    let num = 0
    this.places.forEach(p => {
      if (p.empty) {
        num = num + 1
      }
    })
    return num
  }
}

// 停车位
class Place {
  empty: boolean
  constructor() {
    this.empty = true
  }
  in() {
    this.empty = false
  }
  out() {
    this.empty = true
  }
}

// 测试
// 初始化停车场
const floors: Array<Floor> = []
for (let i: number = 0; i < 3; i ++) {
  const places: Array<Place> = []
  for (let j: number = 0; j < 100; j++) {
    places[j] = new Place()
  }
  floors[i] = new Floor(i + 1, places)
}

const park: Park = new Park(floors)

// 初始化车辆
const car1: Car = new Car(100)
const car2: Car = new Car(200)
const car3: Car = new Car(300)

console.log('第一辆车进入')
console.log(park.emptyNum())
park.in(car1)
console.log('第二辆车进入')
console.log(park.emptyNum())
park.in(car2)
console.log('第一辆车离开')
park.out(car1)
console.log('第二辆车离开')
park.out(car2)

console.log('第三辆车进入')
console.log(park.emptyNum())
park.in(car3)
console.log('第三辆车离开')
park.out(car3)
