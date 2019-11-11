//app.js
import { showToast } from './utils/util.js'
App({
  onLaunch:  function () {
  },
  getInfo(){
    wx.getUserInfo({
      success: function (res) {
        console.log(res)
      }
    })
  },
  showToast: showToast
})