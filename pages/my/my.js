import { getUserVote } from '../../utils/api.js'
Page({
  data: {
    key: 'createVote',
    dataObj: null
  },
  onShow: function (options) {
    getUserVote()
    .then(res => {
      this.setData({
        dataObj: res.returnObject
      })
    }).catch(err =>{
      app.showToast(err.message)
    })
  },
  // 切换导航
  changeKey: function(e){
    this.setData({
      key: e.currentTarget.dataset.key
    })
  },
  // 跳转
  voteDetail: function (e) {
    let id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/vote/voteShow?tid=' + id
    })
  },
  // 编辑
  voteEdit: function(e){
    let id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/vote/addVote?tid=' + id
    })
  }
})