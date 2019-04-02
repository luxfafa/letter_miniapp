const app = getApp()
const { $Message } = require('../../dist/base/index');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    sercert_list:[],
    loaded: true,
    list_show:false,
    openid:null,
    letter_load:false,
    s:1,
    allow_get:true
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
    setTimeout(function () { that.setData({ loaded: false, list_show:true })},300);
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
    if (this.data.allow_get) {
      this.setData({ letter_load: true })
      this.get_list(this.data.s);
    } else {
      this.message('没有更多了哦');
    }
  },

  secert_detail: function (e) {
    var search_token = e.currentTarget.dataset.search;
    if(!search_token) return false;
    wx.navigateTo({ url: "/pages/myletter/letter_detail?search_token=" + search_token})
  },
  
  message: function(text) {
    $Message({
      content: text,
      duration: 3
    });
  },

  get_list: function(s=1) {
    var that = this;
    wx.request({
      url: app.globalData.apiUrl + "sercert/getsercertlist",
      method: "POST",
      data: { openid: this.data.openid,s:s },
      success: function (response) {
        if (response.data.code == 1) {
          if(that.data.sercert_list.length==0) {
            that.setData({ sercert_list: response.data.data })
          } else {
            that.setData({ sercert_list: that.data.sercert_list.concat(response.data.data) })
          }
          that.setData({ s: that.data.s + 1, letter_load:false})
        } else if (response.data.code == 2) {
          that.message(response.data.msg);
        } else if (response.data.code == 3) {
          that.setData({ allow_get: false, letter_load: false })
          that.message(response.data.msg);
        }
      }
    });
  }
})