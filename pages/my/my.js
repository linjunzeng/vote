import { getUserVote } from '../../utils/api.js'
let app = getApp();
Page({
  data: {
    title:[
      {
        'title':'我发起的',
        'returnObject':'createVote'
      },
      {
        'title': '我参与的',
        'returnObject': 'joinVote'
      }
    ],
    showdata:[],
    returnObject:{}
  },
  onLoad: function (options) {
    getUserVote(app.userId)
    .then(res => {
      console.log(res)
      this.setData({
        returnObject: res.returnObject,
        showdata: res.returnObject.createVote
      })
    }).catch(err =>{
      app.showToast(err.message)
    })
    
  },
  towhere: function (event) {
    let _id = event.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/vote/voteShow?tid=' + _id
    })
  },
  tab: function (event){
    let kaa = event.currentTarget.dataset.id;
    this.setData({
      showdata: this.data.returnObject[kaa]
    })
  }
})