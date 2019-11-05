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
                site: wx.getStorageSync("site") || {},
                /* 商品信息 */
                goods: wx.getStorageSync("goods"),
                /* 总价格 */
                allPrice: 0
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

            /* 获取订单编号 */
            const {
                order_number
            } = res.data.message
            /* 请求支付的参数 */
            request({
                url: "/api/public/v1/my/orders/req_unifiedorder",
                method: "POSt",
                header: {
                    Authorization: wx.getStorageSync("token")
                },
                data: {
                    order_number
                }
            }).then(res => {
                const {
                    pay
                } = res.data.message
                /* 发起支付，调用微信原生的窗口 */
                wx.requestPayment({
                    ...pay,
                    success: () => {
                        /* 把本地的goods列表中selected为true的商品删除掉 */
                        let goods = wx.getStorageSync("goods")
                        Object.keys(goods).map(v => {
                            delete goods[v].selected === true
                            return goods[v]
                        })
                        wx.setStorageSync("goods", goods)
                        wx.switchTab({
                            url: '/pages/index/index',
                        })

                    }
                })
            })
        })
    }

})