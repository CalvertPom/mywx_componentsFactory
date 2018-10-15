Component({
  externalClasses: ['i-class'],

  properties: {
    //是否处于播放状态
    isPlay: {
      type: Boolean,
      value: false
    },
    // // 显示播放图标
    // playicon: {
    //   type: String,
    //   value: ''
    // },
    // // 显示暂停图标
    // pauseicon: {
    //   type: String,
    //   value: ''
    // },
    //显示播放条已播放，单位为rpx
    playedtime: {
      type: Number,
      value: 0
    },

    //用String是因为要转个位为00
    //已播放时间分 单位s
    playedmin: {
      type: String,
      value: 0
    },
    //已播放时间秒 单位s
    playedsec: {
      type: String,
      value: 0
    },
    //文件的时间分 单位s
    defaultmin: {
      type: String,
      value: 0
    },
    //文件的时间秒 单位s
    defaultsec: {
      type: String,
      value: 0
    },
  },
  methods: {
    playerControl: function() { 
      this.triggerEvent('playerControl')
    }
  }
});