/* eslint-disable no-undef */
const contextMenuItem = {
  id: 'spendMoney',
  title: '我就爱花钱怎么滴',
  contexts: ['selection']
}

// 创建右键菜单
chrome.contextMenus.create(contextMenuItem)

function isInt(value) {
  return !isNaN(value) &&
    parseInt(value, 10) == value &&
      !isNaN(parseInt(value, 10))
}

chrome.contextMenus.onClicked.addListener(function(clickData) {
  console.log(clickData)
  if (clickData.menuItemId === 'spendMoney' && clickData.selectionText && isInt(clickData.selectionText)) {
    chrome.storage.sync.get(['total', 'limit'], function(budget) {
      let newTotal = 0
      newTotal = parseInt(budget.total || 0, 10) + parseInt(clickData.selectionText, 10)
      chrome.storage.sync.set({total: newTotal}, function() {
        if (newTotal >= parseInt(budget.limit, 10)) {
          const notifyOpts = {
            type: 'basic',
            iconUrl: '../../static/img/48.png',
            title: '已达到上限值',
            message: 'Uh oh! 你的支出已超标了！'
          }
          // 弹出超标通知
          chrome.notifications.create('limitNotify', notifyOpts)
        }
      })
    })
  }
})

chrome.storage.onChanged.addListener(function(changes) {
  chrome.browserAction.setBadgeText({
    text: changes.total.newValue.toString()
  })
})