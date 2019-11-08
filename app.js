//app.js
import { login } from './utils/api.js'
App({
  onLaunch: function () {
    wx.getStorage({
      key: 'userId',
      success: res => {
        this.userId = res.data;
      },
      fail: err => {
        this.login()
      }
    })
  },
  login(){
    wx.login({
      success: res => {
        login(res.code)
        .then(data => {
          let userId = data.returnObject.userId;
          
          this.userId = userId;
          wx.setStorageSync('userId', userId)
        })
        .catch(err => {
          this.showToast(err.message)
        });
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
  userId: '',
  showToast: function (title = '', complete = null, icon = 'none'){
    wx.showToast({
      title,
      icon,
      duration: 2000
    })
    complete && setTimeout(complete, 2000)
  }
})