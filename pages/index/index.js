const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: null,
    hasUserInfo: false
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
    var isHas = wx.getStorageSync('userkey');
    if (!isHas) {
      this.getKey();
    }
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
  // 用code请求服务器
  getCode: function (code) {
    wx.request({
      url: app.globalData.apiUrl+"wxuser/exchange",
      method: "POST",
      data: { code: code },
      success: function (response) {
        try {
          wx.setStorage({ key: 'userkey', data: response })
        } catch (e) {
          console.log(e)
        }
      }
    });
  },

  // 获取code
  login: function () {
    var that = this;
    wx.login({
      success: function (res) {
        if (res.code) {
          that.getCode(res.code);
        }
      }
    })
  },
  // 验证sessionkey
  checkKey: function () {
    var that = this;
    wx.checkSession({
      success: function (res) {
        // console.log(res)
        that.getInfo()
      },
      fail: function (res) {
        that.login()
      }
    })
  },
  // 获取本地缓存key
  getKey: function () {
    var that = this;
    wx.getStorage({
      key: 'userkey',
      success: function (res) {
        that.checkKey();
      },
      fail: function (res) {
        that.login();
      }
    })
  },

  toM : function() {
    this.checkLogin("/pages/myletter/myletter")
  },
  toW : function () {
    this.checkLogin("/pages/write/write")
  },
  toG: function () {
    this.checkLogin("/pages/salvage/salvage")
  },
  toS: function () {
    this.checkLogin("/pages/salvage/my_salvage")
  },
  checkLogin: function(pagePath) {
    var has_userinfo = wx.getStorageSync('userInfo')
    
    wx.getSetting({
      success: (res) => {
        var authSetting = res.authSetting;
        
        if (authSetting['scope.userInfo'] === undefined || authSetting['scope.userInfo'] === false || has_userinfo == false) {
          wx.showModal({
            title: '提示',
            content: '程序功能仅对登录用户开放',
            confirmText: '登录',
            success: function (res) {
              if (res.confirm) {
                wx.navigateTo({
                  url: '/pages/login/login',
                })
              }
            }
          })
        } else {
          wx.navigateTo({
            url: pagePath
          })
        }
      }
    })

  }

})