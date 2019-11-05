// pages/order_enter/index.js
import request from "../../utils/request.js"
Page({
    /**
     * 页面的初始数据
     */
    data: {
        site: wx.getStorageSync("site") || {},
        /* 商品信息 */
        goods: wx.getStorageSync("goods"),
        /* 总价格 */
        allPrice: 0
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        this.setData({
                /* 地址 */
                site: wx.getStorageSync("site") || {},
            }),
            this.handleAllPrice()
    },
    /* 封装计算总价格的方法 */
    handleAllPrice() {
        const {
            goods
        } = this.data
        let price = 0;

        /* 开始计算, v就是key，也就是商品id */
        Object.keys(goods).forEach(v => {
            /* 当前商品必须是选中的 */
            if (goods[v].selected) {
                /* 单价乘以数量 */
                price += (goods[v].goods_price * goods[v].number)
            }
        })
        this.setData({
            allPrice: price
        })
    },
    /* 发起支付 */
    handlePay() {
        const {
            goods,
            allPrice,
            site
        } = this.data
        /* 把goods对象的值合并成数组，并且给对象添加goods_number属性 */
        const newGoods = Object.keys(goods).map(v => {
            goods[v].goods_number = goods[v].number;
            return goods[v]
        })
        request({
            url: "/api/public/v1/my/orders/create",
            method: "POST",
            data: {
                order_price: allPrice,
                consignee_addr: site.detail,
                goods: newGoods
            },
            header: {
                Authorization: wx.getStorageSync('token')
            }
        }).then(res => {
            console.log(res)
        })
    }

})