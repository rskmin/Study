import { Type } from './type';
import {
  ClassProvider,
  FactoryProvider,
  InjectionToken,
  Provider,
  Token,
  ValueProvider,
} from './provider';
import {
  isClassProvider,
  isFactoryProvider,
  isValueProvider,
} from './provider';
import { getInjectionToken } from './inject';

const DESIGN_PARAMTYPES = 'design:paramtypes';

export class Container {
  private providers = new Map<Token<any>, Provider<any>>();
  // 注册提供者
  addProvider<T>(provider: Provider<T>) {
    this.providers.set(provider.provide, provider);
  }
  getProviders() {
    return this.providers;
  }
  inject(type: Token<any>) {
    const provider = this.providers.get(type);
    return this.injectWithProvider(type, provider);
  }
  injectWithProvider<T>(type: Token<T>, provider: Provider<T> | undefined) {
    if (provider === undefined) {
      throw new Error(`No provider for type ${this.getTokenName(type)}`);
    }
    if (isClassProvider(provider)) {
      return this.injectClass(provider as ClassProvider<T>);
    } else if (isValueProvider(provider)) {
      return this.injectValue(provider as ValueProvider<T>);
    } else if (isFactoryProvider(provider)) {
      return this.injectFactory(provider);
    } else {
      throw new Error(`provider ${type} is not supported`);
    }
  }
  injectClass<T>(provider: ClassProvider<T>) {
    const target = provider.useClass;
    const params = this.getInjectedParams(target);
    return Reflect.construct(target, params);
  }
  injectValue<T>(provider: ValueProvider<T>): T {
    return provider.useValue;
  }
  injectFactory<T>(provider: FactoryProvider<T>) {
    return provider.useFactory();
  }
  getTokenName<T>(type: Token<T>) {
    return type instanceof InjectionToken
      ? type.injectionIdentifier
      : type.name;
  }
  // 从类上获取注入的参数
  getInjectedParams<T>(target: Type<T>): any[] {
    const argTypes = <Array<Type<any>> | undefined>(
      Reflect.getMetadata(DESIGN_PARAMTYPES, target)
    );
    if (argTypes == undefined) return [];
    return argTypes.map((argType: Type<any>, index: number) => {
      const overrideToken = getInjectionToken(target, index);
      const actualToken = overrideToken === undefined ? argType : overrideToken;
      let provider = this.providers.get(actualToken);
      return this.injectWithProvider(actualToken, provider);
    });
  }
}
