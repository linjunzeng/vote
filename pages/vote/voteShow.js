let app = getApp();
Page({
  data: {
    tid: '',
    userId: app.userId,
    voteData: null,
    isLoad: false,
    choseTypeObj: {
      ge: '至少',
      eq: '只能',
      le: '最多'
    }
  },
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
          userId: this.data.userId,
          isAll: true
        },
        success: res => {
          if (res.data.errorCode == '00') {
            let data = res.data.returnObject,
                // 圆饼图颜色数组
                colorArr = ['#4db2e6', '#fedb3f', '#64b85e', '#b268a7', '#bcbcbc', '#8087c1', '#964e1b', '#1b5d96', '#c317a6', '#806312'],
                // 总投票数
                allCount = 0;
            // 统计票数
            for (let i in data.voteChose){
              allCount += data.voteChose[i].count;
            }
            // 计算百分比，设置颜色，标识选择
            for (let i in data.voteChose) {
              data.voteChose[i].color = colorArr[i];
              data.voteChose[i].percen = (data.voteChose[i].count * 100 / allCount).toFixed(2);
              if (data.result.indexOf(data.voteChose[i].id) > -1){
                data.voteChose[i].active = true;
              }
            }

            this.setData({
              tid,
              voteData: data,
              isLoad: true
            })
            // 生成圆饼图
            this.creteTable();
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
    } else {
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
  creteTable: function () {
    const ctx = wx.createCanvasContext('Canvas');
    // 设置圆点 x  y   中心点
    let number = {
      x: 80,
      y: 80
    };
    // 获取数据 各类项的个数
    let term = this.data.voteData.voteChose;
    let termarr = [];
    for (let t = 0; t < term.length; t++) {
      // count
      let thisterm = Number(term[t].count)
      let thiscolor = term[t].color
      termarr.push({
        data: thisterm,
        color: thiscolor
      })
    }
    console.log(termarr)
    // 设置总数
    let sign = 0;
    for (var s = 0; s < termarr.length; s++) {
      sign += termarr[s].data
    }
    //设置半径 
    let radius = 80;
    for (var i = 0; i < termarr.length; i++) {
      var start = 0;
      // 开始绘制
      ctx.beginPath()
      if (i > 0) {
        for (var j = 0; j < i; j++) {
          start += termarr[j].data / sign * 2 * Math.PI
        }
      }
      var end = start + termarr[i].data / sign * 2 * Math.PI
      ctx.arc(number.x, number.y, radius, start, end);
      ctx.setLineWidth(1);
      ctx.lineTo(number.x, number.y);
      ctx.setStrokeStyle('#fff');
      ctx.setFillStyle(termarr[i].color);
      ctx.fill();
      ctx.closePath();
      ctx.stroke();
    }
    ctx.draw()
  },
  goVote: function(){
    wx.navigateTo({
      url: '/pages/vote/addVote'
    })
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