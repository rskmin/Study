import 'reflect-metadata';
import { Container } from './';
import { Inject } from './inject';
import { InjectionToken } from './provider';

const container = new Container();
const hoseToken = new InjectionToken('house')
class Car {}
class House {}
class GirlFriend {
  constructor(
    private car: Car,
    @Inject(hoseToken) private house: House
  ) {}
}
container.addProvider({ provide: Car, useValue: new Car() });
container.addProvider({ provide: hoseToken, useClass: House });
container.addProvider({ provide: GirlFriend, useClass: GirlFriend });

const girlFriend = container.inject(GirlFriend);
console.log(girlFriend);
