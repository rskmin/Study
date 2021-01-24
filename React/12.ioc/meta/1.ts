import 'reflect-metadata';
let target = {};

// Reflect.defineMetadata('name', 'rskmin', target);
// Reflect.defineMetadata('name', 'world', target, 'hello');
// console.log(Reflect.getOwnMetadata('name', target));
// console.log(Reflect.getOwnMetadata('name', target, 'hello'));

function classMetadata(key: any, value: any) {
  return function (target: Object) {
    Reflect.defineMetadata(key, value, target);
  }
}

function methodMetadata(key: any, value: any) {
  // target: 类的原型
  return function (target: Object, propertyName: string | symbol) {
    Reflect.defineMetadata(key, value, target, propertyName);
  }
}

// @Reflect.metadata('name', 'Person')
@classMetadata('name', 'Person')
class Person {
  // @Reflect.metadata('name', 'world')
  @methodMetadata('name', 'world')
  hello(): string { return 'world' }
}

console.log(Reflect.getMetadata('name', Person));
console.log(Reflect.getOwnMetadata('name', Person.prototype, 'hello'));