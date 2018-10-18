const innerAudioContext = wx.createInnerAudioContext(); //创建全局播放器
var oldtime = 0;
Page({
  /**
   * 页面的初始数据
   */
  data: {
    isPlay: false, //是否播放状态
    playedsec: '00', //播放了时间秒 单位s
    playedmin: '00', //播放了时间分 单位s
    defaultmin: '00', //文件默认时间分 单位s
    defaultsec: '00', //文件默认时间秒 单位s
    playedtime: 0 //已经播放进度条控制长度 单位rpx
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

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
  /**
   * 个位加0
   */
  formatAdd0: function(num) {
    if (num < 10) {
      return num = '0' + num
    } else {
      return num = num
    }
  },
  //播放音乐
  play: function() {
    var that = this;
    //播放初始化
    innerAudioContext.autoplay = true
    innerAudioContext.src = 'http://ws.stream.qqmusic.qq.com/M500001VfvsJ21xFqb.mp3?guid=ffffffff82def4af4b12b3cd9337d5e7&uin=346897220&vkey=6292F51E1E384E061FF02C31F716658E5C81F5594D561F2E88B854E81CAAB7806D5E4F103E55D33C16F3FAC506D1AB172DE8600B37E43FAD&fromtag=46'
    innerAudioContext.onPlay(() => {
      //console.log('开始播放')
    })
    //一些音乐无效要及时报错
    innerAudioContext.onError((res) => {

      console.log('错误信息', res.errMsg)
      console.log('错误编码', res.errCode)
    })
    innerAudioContext.play()
    this.progressUpadate();
  },
  //停止播放，并重置
  playerReset: function() {
    this.setData({
      isPlay: false,
      startX: 0,
      playedsec: '00', //播放了时间秒 单位s
      playedmin: '00', //播放了时间分 单位s
      playedtime: 0 //已经播放进度条控制长度 单位rpx
    })
    innerAudioContext.stop();
  },
  //更新时间信息
  progressUpadate: function() {
    var that = this;
    innerAudioContext.onTimeUpdate(() => {
      //格式化分秒
      let sdefaultmin = that.formatAdd0(parseInt(innerAudioContext.duration / 60));
      let sdefaultsec = that.formatAdd0(parseInt(innerAudioContext.duration % 60));
      let splayedmin = that.formatAdd0(parseInt(innerAudioContext.currentTime / 60));
      let splayedsec = that.formatAdd0(parseInt(innerAudioContext.currentTime % 60));
      that.setData({
        defaultmin: sdefaultmin,
        defaultsec: sdefaultsec,
        playedmin: splayedmin,
        playedsec: splayedsec,
        playedtime: 386 * (innerAudioContext.currentTime / innerAudioContext.duration) //已经播放进度条控制长度 
      })
      if (innerAudioContext.duration <= innerAudioContext.currentTime) {
        console.log("mp3 End")
        this.playerReset();
      }
    })
  },
  /**
   * 是否播放音频
   */
  playerControl: function() {
    if (!this.data.isPlay) {
      this.play();
      this.setData({
        isPlay: true
      })
    } else {
      innerAudioContext.pause();
      this.setData({
        isPlay: false
      })
    }
  },
})