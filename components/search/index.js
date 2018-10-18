Component({
  properties: {
    //搜索框输入的值
    inputVal: {
      type: String,
      value: ""
    },
    //是否显示清除历史记录、
    isClearshow: {
      type: Boolean,
      value: false
    },
    //是否显示历史记录
    isLoglistshow: {
      type: Boolean,
      value: true
    },
    //搜索和取消切换、
    isCancel: {
      type: Boolean,
      value: true
    },
    ///输入框聚焦、
    inputShowed: {
      type: Boolean,
      value: true,
    },
    //搜索记录list
    searchLoglist: {
      type: Array,
      value: []
    },
  },
  methods: {
    //点击键盘右下搜索开始搜索
    clickSearch: function(e) {
      this.triggerEvent('clickSearch')
    },
    //获取输入框的输入信息
    inputTyping: function(e) {
      var that = this;
      var value = e.detail.value; //通过这个传递数据
      var myEventDetail = {
        val: value
      } // detail对象，提供给事件监听函数
      this.setData({
        inputVal: value
      })
      this.triggerEvent('inputTyping', myEventDetail)
    },
    //清除输入框数据
    clearInput: function() {
      this.triggerEvent('clearInput')
    },
    //清除历史记录
    clickClearHistroy: function() {
      this.triggerEvent('clickClearHistroy')
    },
    //点了历史记录中的一条
    clickHistroy: function(e) {
      this.triggerEvent('clickHistroy', e.currentTarget.dataset.historynum)
    },
    //清除该条历史记录
    clickClearthisHistroy: function(e) {
      this.triggerEvent('clickClearthisHistroy', e.currentTarget.dataset.clearnum)
    }
  }
});