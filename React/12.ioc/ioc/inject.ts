import 'reflect-metadata';
import { Token } from './provider';

const METADATA_INJECT_KEY = 'METADATA_INJECT_KEY';

export function Inject(type: Token<any>) {
  return function (target: any, _: string, paramsIndex: number) {
    Reflect.defineMetadata(
      METADATA_INJECT_KEY,
      type,
      target,
      `index-${paramsIndex}`
    );
    return target;
  };
}

export function getInjectionToken(target: any, index: number) {
  return Reflect.getMetadata(
    METADATA_INJECT_KEY,
    target,
    `index-${index}`
  ) as Token<any> | undefined;
}
