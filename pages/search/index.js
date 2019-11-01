// pages/search/index.js
Page({
    /**
     * 页面的初始数据
     */
    data: {
        /* 是否显示取消按钮 */
        displayWay: false,
        /* 输入框的值 */
        searchValue: ""
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
        displayWay = value ? true : false

        this.setData({
            displayWay,
            /* 输入框的值 */
            searchValue: value
        })
    },
    /* 点击取消按钮 */
    handleClear() {
        this.setData({
            displayWay: false,
            searchValue: ""
        })
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {

    },


})