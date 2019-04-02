const app = getApp()
const { $Message } = require('../../dist/base/index');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    openid:null,
    loaded:true,
    list_show:false,
    salvage_list:[]
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
    var datas = wx.getStorageSync('userkey')
    var openid = datas.data.openid;
    this.setData({ openid: openid })
    this.get_list();
    var that = this;
    setTimeout(function () { that.setData({ loaded: false, list_show: true }) }, 400);
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

  get_list: function (s = 1) {
    var that = this;
    wx.request({
      url: app.globalData.apiUrl + "salvage/mysalvage",
      method: "POST",
      data: { openid: this.data.openid, s: s },
      success: function (response) {
        switch (response.data.code) {
          case 1:
            that.setData({ salvage_list: response.data.data })
            break;
          case 2:
            that.message(response.data.msg);
            break;
        }
      }
    });
  },
  message: function (text) {
    $Message({
      content: text,
      duration: 3
    });
  },
  secert_detail: function (e) {
    var search_token = e.currentTarget.dataset.search;
    if (!search_token) return false;
    wx.navigateTo({ url: "/pages/myletter/letter_passive_detail?search_token=" + search_token })
  },
})