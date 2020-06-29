/* eslint-disable no-undef */
$(function() {
  const Limit = $('#limit')

  // 初始化
  chrome.storage.sync.get('limit', function(budget) {
    Limit.val(Number(budget.limit) || 0)
  })

  // 保存限制
  $('#saveLimit').click(function() {
    const limitVal = Limit.val()
    if (limitVal) {
      chrome.storage.sync.set({
        'limit': limitVal
      }, function() {
        // close()
      })
    }
  })

  // 重置总支出
  $('#resetTotal').click(function() {
    chrome.storage.sync.set({
      'total': 0
    }, function() {
      const notifyOpts = {
        type: 'basic',
        iconUrl: '../../static/img/48.png',
        title: '重置',
        message: '重置支出成功!'
      }
      chrome.notifications.create('resetNotify', notifyOpts)
    })
  })
})