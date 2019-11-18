import { getVote } from '../../utils/api.js'
let app = getApp();
Page({
  data: {
    tid: '',
    voteData: null,
    isLoad: false,
    choseTypeObj: {
      ge: '至少',
      eq: '只能',
      le: '最多'
    }
  },
  onLoad: function (options) {
    let tid = options.tid;
    if (tid) {
      wx.showLoading({
        title: '获取数据中',
      })
      getVote(tid, true)
      .then(res => {
        let data = res.returnObject,
          // 圆饼图颜色数组
          colorArr = ['#4db2e6', '#fedb3f', '#64b85e', '#b268a7', '#bcbcbc', '#8087c1', '#964e1b', '#1b5d96', '#c317a6', '#806312'],
          // 总投票数
          allCount = 0;

        // 统计票数
        for (let i in data.voteChose) {
          allCount += data.voteChose[i].count;
        }
        // 计算百分比，设置颜色，标识选择
        for (let i in data.voteChose) {
          data.voteChose[i].color = colorArr[i];
          data.voteChose[i].percen = (data.voteChose[i].count * 100 / allCount).toFixed(2);
          if (data.result.indexOf(data.voteChose[i].id) > -1) {
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
      }).catch(err =>{
        app.showToast(err.message, () => {
          wx.switchTab({
            url: '/pages/index/index'
          })
        })
      })
    } else {
      app.showToast('投票不存在', () => {
        wx.switchTab({
          url: '/pages/index/index'
        })
      })
    }
  },
  creteTable: function () {
    const ctx = wx.createCanvasContext('Canvas');

    let data = this.data.voteData.voteChose,
        roundL = 2 * Math.PI,
        sAngle = 0,
        eAngle = 0,
        radius = 80;

    for (let i in data){
      sAngle = data[i - 1] && data[i - 1].percen/100 || 0;
      eAngle = data[i].percen/100 + sAngle;
      if (eAngle == 0){
        continue
      }
      ctx.beginPath()
      ctx.arc(radius, radius, radius, roundL * sAngle, roundL * eAngle);
      ctx.setLineWidth(1);
      ctx.lineTo(radius, radius);
      ctx.setFillStyle(data[i].color);
      ctx.fill();
      ctx.closePath();
    }

    ctx.beginPath()
    ctx.arc(radius, radius, radius* 0.7, roundL * 0, roundL * 1);
    ctx.setFillStyle('#fff');
    ctx.fill();
    ctx.closePath();

    ctx.draw();
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