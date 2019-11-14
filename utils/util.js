import { login } from './api.js';

export function getToken(){
  return new Promise((resolve, reject) => {
    wx.checkSession({
      success: async res => {
        let token = wx.getStorageSync('token');
        resolve(token || await wxlogin())
      },
      fail: async err => {
        resolve(await wxlogin())
      }
    })
  })
}

export function wxlogin(){
  return new Promise((resolve, reject) => {
    wx.login({
      success: res => {
        login(res.code)
        .then((data) => {
          let token = data.returnObject.token;

          wx.setStorageSync('token', token)
          resolve(token)
        })
        .catch(err => {
          showToast(err.message)
          reject(err)
        });
      }
    })
  })
}

export function showToast(title = '', complete = null, icon = 'none') {
  wx.showToast({
    title,
    icon,
    duration: 2000
  })
  complete && setTimeout(complete, 2000)
}
