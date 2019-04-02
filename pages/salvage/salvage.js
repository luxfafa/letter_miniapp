const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    btn_loading:false,
    salvage_result:false,
    btn_text : '打捞',
    model_show: false,
    model_text: ''
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
  to_salvage : function() {
    if (this.data.send_flag) return false;
    this.setData({ btn_loading: true, send_flag: true, btn_text:'打捞中' })
    var datas = wx.getStorageSync('userkey')
    var openid = datas.data.openid;
    var that = this;
    var n_timestamp = (new Date()).getTime();
    setTimeout(function(){

      wx.request({
        url: app.globalData.apiUrl + "salvage/getsalvage",
        method: "POST",
        data: { openid: openid, timestamp: n_timestamp },
        success: function (response) {
          that.setData({ btn_loading: false, send_flag: false,  })
          switch (response.data.code) {
            case 1:
              that.setData({ model_show: true, model_text: response.data.msg, btn_text: response.data.msg })
              break;
            case 2:
              that.setData({ model_show: true, model_text: response.data.msg, btn_text: response.data.msg })
              break;
          }
        }
      });

    },1500);

  },
  model_ok: function () {
    this.setData({ model_show: false })
    wx.navigateTo({
      url: "/pages/salvage/my_salvage"
    })
    
  },
  model_cancel: function () {
    this.setData({ model_show: false })
  }
})