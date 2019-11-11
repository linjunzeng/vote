import { getUserVote } from '../../utils/api.js'
Page({
  data: {
  },
  onLoad: function (options) {
    getUserVote()
    .then(res => {
      console.log(res)
    }).catch(err =>{
      console.log(err)
      app.showToast(err.message)
    })
  }
})