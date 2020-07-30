import { reactive, effect, computed, ref } from './reactivity'

const state = reactive({
  name: 'rskmin',
  age: 21,
  arr: [1, 2, 3, 4]
})

state.arr[0] = 2

console.log(state)