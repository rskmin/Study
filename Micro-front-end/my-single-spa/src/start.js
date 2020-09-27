import { invoke } from './navigation/invoke';

let started = false;

export function start() {
  if (started) {
    return;
  }
  started = true;
  console.log('my-single-spa start');
  return invoke();
}

export function isStarted() {
  return started;
}