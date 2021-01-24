import 'reflect-metadata';

interface Type<T> {
  new (...args: any[]): T;
}

class InjectionToken {
  constructor(public injectionIdentifier: string) {}
}

type Token<T> = Type<T> | InjectionToken;

const METADATA_INJECT_KEY = 'METADATA_INJECT_KEY';

function Inject(type: Token<any>) {
  return function(target: any, _: string, paramsIndex: number) {
    console.log(_);
    Reflect.defineMetadata(METADATA_INJECT_KEY, type, target, `index-${paramsIndex}`);
    return target;
  }
}

class Car {}
class House {}
class GirlFriend {
  constructor(
    private car: Car,
    @Inject(new InjectionToken('hose')) private host: House
  ) {}
}
