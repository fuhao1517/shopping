import request from "../../utils/request.js"
Page({
    /**
     * 页面的初始数据
     */
    data: {
        /* 收货地址 */
        site: {},
        /* 购物车商品列表 */
        goods: null,
    },
    /* 获取收货地址 */
    handleAddress() {
        wx.chooseAddress({
            success: res => {
                console.log(res)
                this.setData({
                    site: {
                        /* 姓名 */
                        userName: res.userName,
                        /* 电话 */
                        telNumber: res.telNumber,
                        /* 详细地址 */
                        detail: res.provinceName + res.cityName + res.countyName + res.detailInfo
                    }
                })
            },
        })
    },
    onShow() {
        /* 每次打开页面时都在本地获取购物车的数据 */
        const goods = wx.getStorageSync("goods") || null;
        this.setData({
            goods
        })
    },
    /* 数量加一 */
    handleAdd(event) {
        const {
            id
        } = event.target.dataset
        const {
            goods
        } = this.data
        goods[id].number += 1
        this.setData({
            goods
        })
        wx.setStorageSync("goods", goods)
    },
    /* 数量减一 */
    handleReduce(event) {
        const {
            id
        } = event.target.dataset
        const {
            goods
        } = this.data
        if (goods[id].number === 1) {
            wx.showModal({
                title: '提示',
                content: '确定删除此商品？',
                success: (res) => {
                    if (res.confirm) {
                        /* 删除商品 */
                        delete goods[id]
                        this.setData({
                            goods
                        })
                        wx.setStorageSync("goods", goods)
                    }
                }
            })
        } else {
            goods[id].number -= 1
            this.setData({
                goods
            })
            wx.setStorageSync("goods", goods)
        }
    },
    /* 转换是否有小数点 */
    bindInput(event) {
        /* 获取输入框的值 */
        const value = +event.detail.value
        const {
            id
        } = event.target.dataset
        const {
            goods
        } = this.data;
        /* 判断是否有小数点 */
        goods[id].number = Math.floor(value);
        /* 修改data的值 */
        this.setData({
            goods
        })
    },
    /* 输入框输入数量 */
    bindChange(event) {
        /* 获取输入框的值 */
        const value = +event.detail.value
        const {
            id
        } = event.target.dataset
        const {
            goods
        } = this.data;

        /* 如果是空的或者0 */
        goods[id].number = value === 0 ? 1 : value
        /* 修改data的值 */
        this.setData({
            goods
        })
        /* 保存到本地 */
        wx.setStorageSync("goods", goods)
    }
})