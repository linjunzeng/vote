Page({
  data: {
    // 参数
    tid: '',
    // 选择限制条件
    choseTypeArray: [
      {
        key: 'ge',
        value: '至少'
      },
      {
        key: 'eq',
        value: '只能'
      },
      {
        key: 'le',
        value: '最多'
      }
    ],
    choseTypeIndex: 1,
    // 时间数据
    timeStartDate: '',
    timeStartTime: '',
    timeEndDate: '',
    timeEndTime: '',
    // 提交数据
    title: '',
    choseNumber: 1,
    voteChose: [
      {
        id: '',
        choseText: ''
      }
    ],
    delVoteChose: []
  },
  onLoad: function (options) {
    let tid = options.tid;
    if(tid){
      wx.setNavigationBarTitle({
        title: '编辑主题'
      })
      wx.showLoading({
        title: '获取数据中',
      })
      
      wx.request({
        url: 'http://localhost:3000/getVote',
        method: 'POST',
        data: { tid },
        success: res => {
          if (res.data.errorCode == '00') {
            let data = res.data.returnObject,
                choseTypeArray = this.data.choseTypeArray,
                choseTypeIndex = 2;

            if (data.status == 3 || data.status == 4){
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
              return false;
            }

            for (let i in choseTypeArray){
              if (choseTypeArray[i].key == data.choseType){
                choseTypeIndex = i;
              }
            }

            this.setData({
              tid,
              choseTypeIndex,
              title: data.title,
              choseNumber: data.choseNumber,
              title: data.title,
              timeStartDate: data.timeStart.substr(0, 10),
              timeStartTime: data.timeStart.substr(11, 5),
              timeEndDate: data.timeEnd.substr(0, 10),
              timeEndTime: data.timeEnd.substr(11, 5),
              voteChose: data.voteChose
            })
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
    }
   
  },
  // 数据写入
  setValue(e) {
    let key = e.target.dataset.key,
        value = e.detail.value;
      
    this.setData({
      [key]: value
    })
  },
  // 添加/删除 选择项
  changeChose(e) {
    let index = e.target.dataset.index,
      array = this.data.voteChose,
      delVoteChose = this.data.delVoteChose;

    if (index == 0) {
      array.push({
        id: '',
        choseText: ''
      });
    } else {
      if (array[index].id){
        delVoteChose.push(array[index].id)
      }
      array.splice(index, 1)
    }
    this.setData({
      voteChose: array,
      delVoteChose
    })
  },
  // 提交数据
  submit() {
    // 数据校验及整理
    let verification = {
      title: [
        { type: 'isNull', msg: '请输入投票主题' },
        { type: 'maxLen', msg: '主题最多40字符', len: 40 },
      ],
      choseNumber: [
        { type: 'isNull', msg: '请输入选择限制数量' }
      ],
      timeStartDate: [
        { type: 'isNull', msg: '请输入开始时间' }
      ],
      timeStartTime: [
        { type: 'isNull', msg: '请输入开始时间' }
      ],
      timeEndDate: [
        { type: 'isNull', msg: '请输入结束时间' }
      ],
      timeEndTime: [
        { type: 'isNull', msg: '请输入结束时间' }
      ]
    },
      msg = '';

    for (let i in verification) {
      if (msg) {
        break;
      }
      for (let y in verification[i]) {
        let type = verification[i][y].type,
            len = verification[i][y].len || 0,
            vMsg = verification[i][y].msg;

        if((type == 'isNull' && this.data[i] === '') ||
          (type == 'maxLen' && this.data[i].length > len)) {
            msg = vMsg;
            break;
        }
      }
    }

    if(!msg){
      let voteChose = this.data.voteChose;
      for (let i in voteChose){
        let choseText = voteChose[i].choseText;
        if (choseText === '' || choseText.length > 14){
          msg = choseText === '' ? `第${(i - -1)}个选择项为空` : `第${i - -1}个选择项最多14字符`;
          break;
        }
      }
    }

    if (msg) {
      wx.showToast({
        title: msg,
        icon: 'none',
        duration: 2000
      })
      return false;
    }

    // 发送数据成功跳转
    let postData = {
      tid: this.data.tid,
      title: this.data.title,
      choseNumber: this.data.choseNumber,
      choseType: this.data.choseTypeArray[this.data.choseTypeIndex].key,
      timeStart: this.data.timeStartDate + ' ' + this.data.timeStartTime + ':00',
      timeEnd: this.data.timeEndDate + ' ' + this.data.timeEndTime + ':00',
      voteChose: this.data.voteChose,
      delVoteChose: this.data.delVoteChose
    }
    
    wx.request({
      url: 'http://localhost:3000/addVote',
      method: 'POST',
      data: postData,
      success(res) {
        if (res.data.errorCode == '00') {
          wx.showToast({
            title: '添加成功',
            icon: 'success',
            duration: 2000,
            success() {
              wx.redirectTo({
                url: '/pages/vote/vote?tid=' + res.data.returnObject.tid
              })
            }
          })
        }
      }
    })
    
  }
})