class Car {
  constructor(public number: number, public name: string) {
    this.number = number
    this.name = name
  }
}

class ServiceCar extends Car {
  constructor(number: number, name: string, public price: number) {
    super(number, name)
    this.price = price
  }
}

class Trip {
  constructor(protected car: ServiceCar) {
    this.car = car
  }
  start() {
    console.log(`行程开始，名称：${this.car.name},
        车牌号：${this.car.number}`)
  }
  end() {
    console.log(`行程结束，价格：${this.car.price * 5}`)
  }
}

const kuaiche: ServiceCar = new ServiceCar(100, '桑塔纳', 1)
const trip: Trip = new Trip(kuaiche)
trip.start()
trip.end()
// const zhuanche = new ServiceCar(100, '桑塔纳', 2)
