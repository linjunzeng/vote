import { getUserVote } from '../../utils/api.js'
let app = getApp();
Page({
  data: {
  },
  onLoad: function (options) {
    getUserVote(app.userId)
    .then(res => {
      console.log(res)
    }).catch(err =>{
      console.log(err)
      app.showToast(err.message)
    })
  }
})