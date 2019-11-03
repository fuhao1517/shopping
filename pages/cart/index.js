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
        /* 是否选中 */
        selected: true,
        /* 总价格 */
        allPrice: 0,
        /* 是否全选 */
        allSelected:true

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
        /* 计算总价格 */
        this.handleAllPrice()
        /* 判断全选状态 */
        this.handleAllSelected()
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
        /* 计算总价格 */
        this.handleAllPrice()
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
                        /* 计算总价格 */
                        this.handleAllPrice()
                    }
                }
            })
        } else {
            goods[id].number -= 1
            this.setData({
                goods
            })
            wx.setStorageSync("goods", goods)
            /* 计算总价格 */
            this.handleAllPrice()
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
        /* 计算总价格 */
        this.handleAllPrice()
    },
    /* 是否为选中状态 */
    handleSelected(event) {
        const {
            id
        } = event.target.dataset
        const {
            goods
        } = this.data
        /* 把选中状态取反 */
        goods[id].selected = !goods[id].selected
        this.setData({
            goods
        })
        wx.setStorageSync("goods", goods)
        /* 计算总价格 */
        this.handleAllPrice()
        /* 判断全选状态 */
        this.handleAllSelected()
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
    /* 全选状态 */
    handleAllSelected(){
        const{goods}=this.data
        let isSelect=true;
        /* 判断是否有一个是没选中 */
        Object.keys(goods).forEach(v=>{
            if(!goods[v].selected){
                isSelect=false;
            }
        })
        this.setData({
            allSelected:isSelect
        })
    },
    /* 点击全选按钮的事件 */
    handleAllSelectedEvent(){
        console.log(123)
        const{goods,allSelected}=this.data;

        /* 循环取反选中状态，取反是根据allSelected */
        Object.keys(goods).forEach(v=>{
            goods[v].selected=!allSelected
        })
        this.setData({
            goods,
            /* 判断全选状态 */
            allSelected:!allSelected
        })
        /* 保存到本地 */
        wx.setStorageSync("goods",goods)
        /* 计算总价格 */
        this.handleAllPrice()
    }

})