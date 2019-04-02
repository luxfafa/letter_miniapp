// pages/login/login.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    word : '欢迎使用',
    explain : '同意微信授权,登陆小程序'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },
  reg : function (userInfo) {
    var userkey = wx.getStorageSync('userkey');
    userInfo.openid = userkey.data.openid;
    wx.request({
      url: app.globalData.apiUrl+'wxuser/register',
      method: "POST",
      data: { userDetail: userInfo }
    })
  },
  getInfo : function(res) {
    var userDetail = res.detail.userInfo;
    wx.setStorage({ key: 'userInfo', data: userDetail })
    this.reg(userDetail);
    var has_userinfo = wx.getStorageSync('userInfo')
    if (has_userinfo) {
      wx.showModal({
        title: '提示',
        content: '登录成功',
        confirmText: '确定',
        showCancel: false,
        success: function(res) {
          console.log(res)
          if (res.confirm) {
            wx.redirectTo({
              url: '/pages/myletter/myletter',
            })
          }
        }
      })
    }
  }
})