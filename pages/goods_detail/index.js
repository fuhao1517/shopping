// pages/goods_detail/index.js
import request from "../../utils/request.js"
Page({

    /**
     * 页面的初始数据
     */
    data: {
        detail: {}
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        const {
            goods_id
        } = options
        request({
            url: "/api/public/v1/goods/detail",
            data: {
                goods_id
            }
        }).then(res => {
            const {
                message
            } = res.data
            this.setData({
                detail: message
            })
        })
    },
    /* 把商品加入到本地的购物车 */
    handleAddcart() {
        console.log(123)
        /* 从本地获取购物车列表 */
        const goods = wx.getStorageSync("goods") || {};
        const {
            goods_id,
            goods_name,
            goods_small_logo,
            goods_price
        } = this.data.detail

        /* 判断商品是否已经在购物车中 */
        const number = goods[goods_id] ? goods[goods_id].number + 1 : 1;

        goods[goods_id] = {
            goods_id,
            goods_name,
            goods_small_logo,
            goods_price,

            number,
            selected: true
        }
        /* 保存到本地 */
        wx.setStorageSync("goods", goods)
    }



})