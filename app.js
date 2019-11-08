//app.js
import { login } from './utils/api.js'
App({
  onLaunch: async function () {
    let userId = wx.getStorageSync('userId');

    if (!userId){
      userId = await this.login();
    }
    this.userId = userId;
  },
  login(){
    return new Promise((resolve, reject) => {
      wx.login({
        success: res => {
          login(res.code)
            .then(data => {
              let userId = data.returnObject.userId;

              wx.setStorageSync('userId', userId)
              resolve(userId)
            })
            .catch(err => {
              this.showToast(err.message)
              reject(err)
            });
        }
      })
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