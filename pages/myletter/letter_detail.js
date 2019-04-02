const app = getApp()
Page({

  data: {
    search_token: null,
    letter_detail: null,
    model_show: null,
    model_text: null,
    userInfo: null,
    item_show:false,
    loaded: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      if(options.search_token) {
        this.setData({ search_token: options.search_token })
      } else {
        this.setData({ model_show: true, model_text:'点进来的方式不对' })
        return false;
      }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var search_token = this.data.search_token
    if (search_token) {
      var datas = wx.getStorageSync('userkey')
      var openid = datas.data.openid;
      var that = this;
      wx.request({
        url: app.globalData.apiUrl + "sercert/getsercert",
        method: "POST",
        data: { openid: openid, secert_id: search_token,option:'secert' },
        success: function (response) {
          that.setData({ btn_loading: false, send_flag: false })
          switch (response.data.code) {
            case 1:
              that.setData({ letter_detail: response.data.data })
              break;
            case 2:
              that.setData({ model_show: true, model_text: response.data.msg })
              break;
          }
        }
      });
    } else {
      this.setData({ model_show: true, model_text: '点进来的方式不对' })
      return false;
    }
    setTimeout(function () { that.setData({ loaded: false, item_show: true }) }, 300);
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var has_userinfo = wx.getStorageSync('userInfo')
    if (has_userinfo) {
      this.setData({ userInfo: has_userinfo })
    } else {
      this.setData({ model_show: true, model_text: '用户未登录' })
    }
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


  model_ok: function () {
    wx.navigateBack({
      delta: 1
    })
  },
  model_cancel: function () {
    this.model_ok();
  }
})