let baseUrl = 'http://localhost:3000';
// let baseUrl = 'https://www.linjunzeng.top';

function post(url, data = null) {
  return new Promise((resolve, reject) => {
    wx.request({
      url: url,
      method: 'POST',
      data: data,
      success(res) {
        if (res.data.errorCode == '01'){
          reject(res.data)
        }else {
          resolve(res.data)
        }
      },
      fail(err) {
        console.log(err);
        wx.showToast({
          title: '接口出错请联系管理员',
          icon: 'none',
          duration: 2000
        })
      }
    })
  })
}

/**
 * 获取投票信息
 * @param userId 用户id
 * @param tid 投票id
 * @param isAll 是否统计答案
 * @returns {Promise}
 */
export function getVote(userId = '', tid = '', isAll = false) {
  return post(baseUrl + '/getVote', { tid, userId, isAll });
}

/**
 * 添加|编辑 投票主题
 * @param userId 用户id
 * @param tid 投票id 空为添加
 * @param title 标题
 * @param choseNumber 限制选择个数
 * @param choseType 限制选择类别
 * @param timeStart 开始时间
 * @param timeEnd 结束时间
 * @param voteChose 选择项
 * @param delVoteChose 删除的选项
 * @returns {Promise}
 */
// postData = {tid, userId, title, choseNumber, choseType, timeStart, timeEnd, voteChose, delVoteChose}
export function addVote(postData) {
  return post(baseUrl + '/addVote', postData);
}

/**
 * 参与投票
 * @param userId 用户id
 * @param tid 投票id
 * @param checkArr 选择答案
 * @returns {Promise}
 */
export function joinVote(userId, tid, checkArr) {
  return post(baseUrl + '/joinVote', { userId, tid, checkArr});
}

/**
 * 获取用户投票列表
 * @param userId 用户id
 * @returns {Promise}
 */
export function getUserVote(userId) {
  return post(baseUrl + '/getUserVote', { userId });
}


/**
 * 获取用户投票列表
 * @param userId 用户id
 * @returns {Promise}
 */
export function login() {
  return post(baseUrl + '/login', {aa: 123});
}