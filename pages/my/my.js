// pages/my/my.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      userInfo : null,
      hasUserInfo : false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      var that = this;
      wx.getStorage({
        key: 'userkey',
        success: function (res) {
          that.checkKey();
        },
        fail: function(res) {
          that.login();
        }
      })
      
  },

  getInfo : function() {
    wx.getUserInfo({
      success : function(res) {
        console.log(res)
      },
      fail : function(res) {
        console.log(res)
      }
    }) 
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
  // 用code请求服务器
  getCode : function (code) {
    wx.request({
      url:      "https://www.lxonly.com/api/wxuser/exchange",
      method:   "POST",
      data:     {code:code},
      success: function (response) {
        try{
          wx.setStorage({key:'userkey',data:response})
        } catch(e) {
          console.log(e)
        }
      }
    });
  },
  // 获取code
  login : function() {
    var that = this;
    wx.login({
      success: function (res) {
        if(res.code) {
          that.getCode(res.code);
        } else {
          console.log(res.errorMsg);
        }
      }
    })
  },
  checkKey : function() {
    var that = this;
    wx.checkSession({
      success: function (res) {
        console.log(res)
        that.getInfo()
      },
      fail: function (res) {
        // session_key 已经失效，需要重新执行登录流程
        console.log(res)
        that.login()
      }
    })
  }
  
})