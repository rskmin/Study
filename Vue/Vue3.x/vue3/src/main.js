import { reactive, effect, computed, ref } from '@vue/reactivity'

const state = reactive({
  name: 'rskmin',
  age: 21,
  arr: [1, 2, 3, 4]
})

// effect(() => {
//   console.log(state)
//   console.log(JSON.stringify(state.arr))
// })

// state.arr[0] = 100

console.log(state.arr)
console.log(state)