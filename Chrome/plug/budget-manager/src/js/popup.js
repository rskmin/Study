/* eslint-disable no-undef */
$(function() {
  const Amount = $('#amount')
  const Total = $('#total')
  const Limit = $('#limit')
  let total = 0
  let limit
  // 获取缓存 : 初始化总支出 & 初始化支出限制
  chrome.storage.sync.get(['total', 'limit'], function(budget) {
    total = Number(budget.total) || 0
    limit = Number(budget.limit) || 0
    Total.text(total)
    Limit.text(limit)
  })
  // 计算总支出
  $('#spendAmount').click(function() {
    let amount = Number(Amount.val())
    if (amount) {
      total += amount
      chrome.storage.sync.set({
        'total': total
      }, function() {
        if (amount && total >= limit) {
          const notifyOpts = {
            type: 'basic',
            iconUrl: '../../static/img/48.png',
            title: '已达到上限值',
            message: 'Uh oh! 你的支出已超标了！'
          }
          chrome.notifications.create('limitNotify', notifyOpts)
        }
      })
      Total.text(total)
      Amount.val('')
    }
  })
})