// pages/goods_list/index.js
import request from "../../utils/request.js"
Page({

    /**
     * 页面的初始数据
     */
    data: {
        query: "",
        goods: [],
        pagenum: 1,
        pagesize: 10
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        /* options是页面的传参数，比如 {query: "曲面电视"} */
        const {
            query
        } = options;
        this.setData({
            query
        })

        /* 请求列表数据 */
        request({
            url: "/api/public/v1/goods/search"
        }).then(res => {
            const {
                goods
            } = res.data.message
            const newGoods = goods.map(v => {
                v.goods_price = Number(v.goods_price).toFixed(2)
                return v
            })
            this.setData({
                goods: newGoods
            })
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

    }
})