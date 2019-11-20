import { login } from './api.js';
import config from './config.js'

console.log(config)
export async function getToken(){
  return config.TOKEN || await wxlogin()
    /* wx.checkSession({
      success: async res => {
        resolve(config.Token || await wxlogin())
      },
      fail: async err => {
        
      }
    }) */
}

export function wxlogin(){
  return new Promise((resolve, reject) => {
    wx.login({
      success: res => {
        login(res.code)
        .then((data) => {
          let token = data.returnObject.token;

          wx.setStorageSync('token', token)
          config.TOKEN = token;
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
