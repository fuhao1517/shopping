// pages/search/index.js
Page({
    /**
     * 页面的初始数据
     */
    data: {
        /* 是否显示取消按钮 */
        displayWay: false,
        /* 输入框的值 */
        searchValue: "",
        /* 搜索历史记录 */
        keywords: []
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {

    },
    /* 输入框的值变化 */
    handleInput(event) {
        const {
            value
        } = event.detail
        let displayWay
        displayWay = value.trim() ? true : false

        this.setData({
            displayWay,
            /* 输入框的值 */
            searchValue: value,

        })
    },
    /* 点击取消按钮 */
    handleClear() {
        this.setData({
            displayWay: false,
            searchValue: "",

        })
    },

    /* 点击键盘回车出发 */
    handleCertain() {
        console.log(11)
        /* 先从本地存储拿出来数组，没有的等于空的数组 */
        const arr = wx.getStorageSync('search') || [];

        /* 判断本地是否有数据，有的话就追加unshift */
        arr.unshift(this.data.searchValue)

        /* 保存到本地 */
        wx.setStorageSync('search', arr);

        /* 跳转到搜索列表页 */
        wx.navigateTo({
            url: "/pages/goods_list/index?query=" + this.data.searchValue
        })
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {
      this.setData({
          keywords: wx.getStorageSync('search') || []
      })
    },


})