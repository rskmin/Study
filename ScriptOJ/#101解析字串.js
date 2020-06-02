const extractStr = (str) => {
  const reg = /:[^:\.]+\./g
  return Array.from(str.matchAll(reg)).map(item => {
    return item[0].split(":")[1].split(".")[0]
  })
}
console.log(extractStr('My name is:Jerry. My age is:12.'))