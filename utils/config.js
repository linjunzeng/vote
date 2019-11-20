let token = wx.getStorageSync('token') || '',
    isPord = true;

let config = {
  TOKEN: token,
  BASE_URL: isPord ? 'https://www.linjunzeng.top' : 'http://localhost:3000'
}

export default config