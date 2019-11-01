// pages/search/index.js
Page({
    /**
     * 页面的初始数据
     */
    data: {
        displayWay: false
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {

    },

    handleInput(event) {
        const {
            value
        } = event.detail
        let displayWay
        displayWay = value ? true : false

        this.setData({
            displayWay
        })
    },



    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {

    },


})