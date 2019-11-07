Page({
  data: {
  },
  goVote: function () {
    wx.navigateTo({
      url: '/pages/vote/addVote'
    })
  },
  onGotUserInfo(res){
    console.log(res)
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return {
      title: '欢迎使用投票助手小程序',
      path: '/page/index/index'
    }
  }
})