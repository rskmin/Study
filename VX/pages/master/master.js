// pages/master/master.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    notice: [
      {
        message: '今晚一起去唱歌吧',
        name: '周杰伦'
      },
      {
        message: '今晚来么？',
        name: '007'
      }
    ]
  },
  imgLoad() {
    console.log("successful")
  },
  imgLoadError() {
    console.log("error")
  }
})