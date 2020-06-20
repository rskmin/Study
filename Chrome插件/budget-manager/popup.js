/* eslint-disable no-undef */
$(function() {
  const Amount = $('#amount')
  const Total = $('#total')
  let total = 0
  // 获取缓存 & 初始化总支出
  chrome.storage.sync.get('total', function(budget) {
    total = Number(budget.total)
    Total.text(total)
  })
  // 计算总支出
  $('#spendAmount').click(function() {
    let amount = Number(Amount.val())
    if (amount) {
      total += amount
      chrome.storage.sync.set({
        'total': total
      })
      Total.text(total)
      Amount.val('')
    }
  })
})