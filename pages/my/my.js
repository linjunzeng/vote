import { getUserVote } from '../../utils/api.js'
let app = getApp();
Page({
  data: {
  },
  onLoad: function (options) {
    getUserVote(app.userId)
  }
})