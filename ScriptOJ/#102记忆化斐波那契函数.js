const fibonacci = (n) => {
  const index = n - 1
  fibonacci.arr || (fibonacci.arr = [1, 1])
  if(fibonacci.arr[n] != null) return fibonacci.arr[index]
  // 递归计算并保留结果
  ;(function recursion(arr, index) {
    if(arr[index-1] != null && arr[index-2] != null) {
      arr[index] = arr[index - 1] + arr[index - 2]
    } else {
      recursion(arr, index - 1)
      arr[index] = arr[index - 1] + arr[index - 2]
    }
  }(fibonacci.arr, index))
  return fibonacci.arr[index]
}

console.log(fibonacci(8));