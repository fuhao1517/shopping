import request from "../../utils/request.js"
// pages/category/index.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        list: [],
        current: 0
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        /* 获取分类列表数据 */
        request({
            url: "/api/public/v1/categories"
        }).then(res => {
            const {
                message
            } = res.data
            this.setData({
                list: message
            })
        })
    },
    /* tab栏切换 */
    handleClick(event) {
        const {
            index
        } = event.target.dataset
        
        this.setData({
            current: index
        })
    }


})