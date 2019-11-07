//app.js
import { login } from './utils/api.js'
App({
  onLaunch: function () {
    login();
    /* wx.checkSession({
      success: res => {
        this.getInfo()
      },
      fail: err => {
        this.login()
      }
    }) */
  },
  login(){
    wx.login({
      success(res) {
        console.log(res);
      }
    })
  },
  getInfo(){
    wx.getUserInfo({
      success: function (res) {
        console.log(res)
      }
    })
  },
  userId: '005',
  showToast: function (title = '', complete = null, icon = 'none'){
    wx.showToast({
      title,
      icon,
      duration: 2000
    })
    complete && setTimeout(complete, 2000)
  }
})