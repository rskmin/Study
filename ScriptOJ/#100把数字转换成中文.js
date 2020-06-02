const toChineseNum = (num) => {
  toChineseNum.cnumber || (toChineseNum.cnumber = ["零", "一", "二", "三", "四", "五", "六", "七", "八", "九"])
  toChineseNum.unit || (toChineseNum.unit = ["个", "十", "百", "千", "万"])
  let str = ""
  let count = 0
  while(num > 0) {
    const cnumber = toChineseNum.cnumber[num%10]
    const unit = count > 0 ? toChineseNum.unit[count] : ""
    str = cnumber + unit + str
    count++
    num = parseInt(num/10)
  }
  return str
}

console.log(toChineseNum(12345));