// pages/vote/vote.js
let app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 参数
    tid: '',
    choseTypeObj: {
      ge: '至少',
      eq: '只能',
      le: '最多'
    },
    voteData: null,
    isRead: false,
    loading: false,
    isLoad: false,
    userId: app.userId
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let tid = options.tid || 47;
    if (tid) {
      wx.showLoading({
        title: '获取数据中',
      })

      wx.request({
        url: 'http://localhost:3000/getVote',
        method: 'POST',
        data: { 
          tid,
          userId: this.data.userId
        },
        success: res => {
          if (res.data.errorCode == '00') {
            let data = res.data.returnObject;

            if ((data.status == 1 && data.result.length == 0) || data.status == 2){
              this.setData({
                tid,
                voteData: data,
                isLoad: true
              })
            } else if (data.status == 4){
              wx.showToast({
                title: data.statusText,
                icon: 'none',
                duration: 2000
              })
              setTimeout(() => {
                wx.switchTab({
                  url: '/pages/index/index'
                })
              }, 2000)
            }else{
              wx.redirectTo({
                url: '/pages/vote/voteShow?tid=' + tid
              })
            }
            wx.hideLoading();
          } else {
            wx.showToast({
              title: res.data.message,
              icon: 'none',
              duration: 2000
            })
            setTimeout(() => {
              wx.switchTab({
                url: '/pages/index/index'
              })
            }, 2000)
          }
        }
      })
    }else{
      wx.showToast({
        title: '投票不存在',
        icon: 'none',
        duration: 2000
      })
      setTimeout(() => {
        wx.switchTab({
          url: '/pages/index/index'
        })
      }, 2000)
    }
  },
  // 选择选项
  checkChose(e){
    let index = e.target.dataset.index,
        voteChose = this.data.voteData.voteChose;
    
    voteChose[index].active = !voteChose[index].active;
    this.setData({
      voteData: this.data.voteData
    })

    this.verification();
  },
  // 是否满足条件
  verification(){
    let voteChose = this.data.voteData.voteChose,
        choseType = this.data.voteData.choseType,
        choseNumber = this.data.voteData.choseNumber;

    let index = voteChose.filter(item => {
          return item.active
        }).length,
        isRead = false;

    if ((choseType == 'ge' && choseNumber <= index) || 
        (choseType == 'eq' && choseNumber == index) ||  
        (choseType == 'le' && choseNumber >= index)){
      isRead = true;
    }
    this.setData({
      isRead
    })
  },
  // 提交
  submit(){
    if(!this.data.isRead){
      wx.showToast({
        title: `${this.data.choseTypeObj[this.data.voteData.choseType]}选择${this.data.voteData.choseNumber}个选项`,
        icon: 'none',
        duration: 2000
      })
    }else{
      this.setData({
        loading: true
      })
      let checkArr = [];
      this.data.voteData.voteChose.map(item => {
        if(item.active){
          checkArr.push(item.id)
        }
      })
      wx.request({
        url: 'http://localhost:3000/joinVote',
        method: 'POST',
        data: {
          checkArr,
          tid: this.data.tid,
          userId: this.data.userId
        },
        success: res => {
          if (res.data.errorCode == '00') {
            wx.redirectTo({
              url: '/pages/vote/voteShow?tid=' + this.data.tid
            })
            wx.hideLoading();
          } else {
            wx.showToast({
              title: res.data.message,
              icon: 'none',
              duration: 2000
            })
          }
          this.setData({
            loading: false
          })
        }
      })
    }
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return {
      title: this.data.voteData.title,
      path: '/page/vote/vote?tid=' + this.data.tid
    }
  }
})