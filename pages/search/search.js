// pages/search/search.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    inputVal: "", //搜索框输入的值  
    inputShowed: true, //输入框聚焦
    isCancel: true, //搜索和取消切换
    //历史记录
    isLoglistshow: true, //是否显示历史记录
    isClearshow: false, //是否显示清除历史记录、
    searchLoglist: [], //搜索记录list
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    wx.getStorage({
      key: 'searchLog',
      success: function(res) {
        that.setData({
          searchLoglist: res.data,
        })
        //数据条数大于0显示出清除历史数据按钮
        if (res.data.length > 0) {
          that.setData({
            isClearshow: true
          })
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
  //点击键盘右下搜索开始搜索
  clickSearch: function(e) {
    var that = this;
    /*
    搜索接口的调用
    */
    console.log("搜索完毕")
    that.setData({
      // searchRlist: [],//清空搜索结果列表
      isLoglistshow: false,
      inputShowed: false
    })
    //获取缓存 看是否有搜索记录
    wx.getStorage({
      key: 'searchLog',
      //初次使用无缓存失败进入下面
      fail: function(res) {
        //初次无值直接添加
        that.data.searchLoglist.push(that.data.inputVal)
        //更新搜索记录缓存
        wx.setStorage({
          key: "searchLog",
          data: that.data.searchLoglist
        })
        //显示新的搜索记录
        that.setData({
          searchLoglist: that.data.searchLoglist,
        })
        //  显示出清除历史数据按钮
        if (that.data.isClearshow != true) {
          that.setData({
            isClearshow: true
          })
        }
      },
      //非第一次使用，有缓存值
      success: function(res) {
        //如果记录里没有这条，即非重复数据添加
        if (!res.data.includes(that.data.inputVal)) {
          that.data.searchLoglist.push(that.data.inputVal)
          //数据满9减去数据列表第一条数据，即最早的数据
          if (that.data.searchLoglist.length > 8) {
            that.data.searchLoglist.shift();
          }
          //搜索记录更新缓存
          wx.setStorage({
            key: "searchLog",
            data: that.data.searchLoglist
          })
          //显示搜索记录
          that.setData({
            searchLoglist: that.data.searchLoglist,
          })
          //显示出清除历史数据按钮
          if (that.data.isClearshow != true) {
            that.setData({
              isClearshow: true
            })
          }
        }
      }
    })
  },
  //获取输入框的输入信息
  inputTyping: function(e) {
    this.setData({
      inputVal: e.detail.val,
      inputShowed: true,
      isCancel: false //输入框有数值"取消"变"搜索"
    })
    //输入框减到空时, "搜索"变"取消"
    if (e.detail.val.length === 0) {
      this.setData({
        isCancel: true,
        isLoglistshow: true,
      })
    }
  },

  //清除输入框数据
  clearInput: function() {
    console.log("我点了清空....")
    this.setData({
      inputVal: "",
      isCancel: true,
      isLoglistshow: true,
      inputShowed: true
    })
  },

  //清除历史记录
  clickClearHistroy: function() {
    this.setData({
      searchLoglist: [],
      isClearshow: false
    })
    wx.setStorage({
      key: "searchLog",
      data: this.data.searchLoglist
    })
  },
  //点了历史记录中的一条
  clickHistroy: function(e) {
    this.setData({
      inputVal: this.data.searchLoglist[e.detail],
      inputShowed: true,
      isCancel: false, //输入框有数值"取消"变"搜索"
      inputShowed: false
    })
    this.clickSearch();
  },
  //清除该条历史记录
  clickClearthisHistroy: function(e) {
    this.data.searchLoglist.splice(e.detail, 1)
    wx.setStorage({
      key: "searchLog",
      data: this.data.searchLoglist
    })
    this.setData({
      searchLoglist: this.data.searchLoglist
    })
    if (this.data.searchLoglist.length === 0) {
      this.setData({
        isClearshow: false
      })
    }
  },
})