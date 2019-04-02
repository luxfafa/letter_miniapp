const { $Message } = require('../../dist/base/index');
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    letter_content: "",
    btn_loading: false,
    model_show:false,
    send_flag: false
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
  letter_change: function (t) {  // 监听输入同步textarea的value
    this.setData({ letter_content: t.detail.detail.value })
  },
  upload_letter: function () {
    
    var letter_text = this.data.letter_content
    if (!letter_text || letter_text.length == 0) {
      $Message({
        content: '请输入信件内容',
        type: 'warning'
      });
      return false;
    }
    if (this.data.send_flag) return false;
    this.setData({ send_flag: true, btn_loading: true })
    var that = this;
    var datas = wx.getStorageSync('userkey')
    if (datas.data.openid==undefined) {
      that.setData({ model_show: true, model_text: '用户未登录' })
      return false;
    }
    var openid = datas.data.openid;
    wx.request({
      url: app.globalData.apiUrl + "sercert/savesercert",
      method: "POST",
      data: { openid: openid, content: letter_text },
      success: function (response) {
        that.setData({ btn_loading: false, send_flag: false })
        switch (response.data.code) {
          case 1:
            that.setData({ model_show: true, model_text: response.data.msg })
            break;
          case 2:
            that.setData({ model_show: true, model_text: response.data.msg })
            break;
        }
      }
    });
  },
  model_ok: function() {
    wx.redirectTo({
      url: "/pages/myletter/myletter"
    })
  },
  model_cancel: function() {
    wx.redirectTo({
      url: "/pages/myletter/myletter"
    })
  }
})