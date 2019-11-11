import { getToken } from './util.js'

let baseUrl = 'http://localhost:3000';
// let baseUrl = 'https://www.linjunzeng.top';

async function post(url, data = {}) {
  let header = {};
  header.token = url.indexOf('login') < 0 ? await getToken() : '';
  
  return new Promise((resolve, reject) => {
    wx.request({
      url: url,
      method: 'POST',
      data: data,
      header: header,
      success(res) {
        if (res.data.errorCode == '01'){
          reject(res.data)
        }else {
          let token = res.header.token;
          if (token){
            res.data.returnObject.token = token;
          }
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
 * @param tid 投票id
 * @param isAll 是否统计答案
 * @returns {Promise}
 */
export function getVote(tid = '', isAll = false) {
  return post(baseUrl + '/getVote', { tid, isAll });
}

/**
 * 添加|编辑 投票主题
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
// postData = {tid, title, choseNumber, choseType, timeStart, timeEnd, voteChose, delVoteChose}
export function addVote(postData) {
  return post(baseUrl + '/addVote', postData);
}

/**
 * 参与投票
 * @param tid 投票id
 * @param checkArr 选择答案
 * @returns {Promise}
 */
export function joinVote(tid, checkArr) {
  return post(baseUrl + '/joinVote', { tid, checkArr});
}

/**
 * 获取用户投票列表
 * @returns {Promise}
 */
export function getUserVote() {
  return post(baseUrl + '/getUserVote');
}


/**
 * 获取用户投票列表
 * @param code 登录code
 * @returns {Promise}
 */
export function login(code) {
  return post(baseUrl + '/login', {code});
}