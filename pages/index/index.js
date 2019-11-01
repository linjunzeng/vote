//index.js
//获取应用实例
const app = getApp()
Page({
  data: {
    addImgsrc: '../../static/images/icon-add.png',
    delImgsrc: '../../static/images/icon-del.png',
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
        value: '至多'
      }
    ],
    choseTypeIndex: 1,
    // 时间数据
    timeStartDate: '',
    timeStarttime: '',
    timeEndDate: '',
    timeEndTime: '',
    // 提交数据
    title: '',
    choseType: 'eq',
    choseNumber: 1,
    voteChose: ['', '', ''],
    timeStart: '',
    timeEnd: '',
  },
  onLoad: function () {

  },
  // 标题写入
  setTitle(e){
    this.setData({
      title: e.detail.value
    })
  },
  // 选择项写入
  setChose(e){
    let index = e.target.dataset.index,
        value = e.detail.value,
        array = this.data.voteChose;

    array[index] = value;
    this.setData({
      voteChose: array
    })
  },
  // 选择限制条件
  choseTypeChange(e){
    this.setData({
      choseTypeIndex: e.detail.value,
      choseType: this.data.choseTypeArray[e.detail.value].key
    })
  },
  // 添加/删除 选择项
  changeChose(e){
    let index = e.target.dataset.index,
        array = this.data.voteChose;
        
    if (index == 0) {
      array.push('');
    } else {
      array.splice(index, 1)
    }
    this.setData({
      voteChose: array
    })
  },
  // 时间写入
  changeTime(e){
    let timetype = e.target.dataset.timetype,
        value = e.detail.value;
    
    console.log(e.target.dataset)
    console.log(value)
    this.setData({
      [timetype]: value
    })
  },
  // 提交数据
  submit(){
    console.log(this.data)
  }
})