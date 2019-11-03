import request from "../../utils/request.js"
Page({
    /**
     * 页面的初始数据
     */
    data: {
       
        /* 收货地址 */
        site: {},
        /* 购物车商品列表 */
        goods:null,
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
onShow(){
    /* 每次打开页面时都在本地获取购物车的数据 */
  const goods=  wx.getStorageSync("goods")||null;
    this.setData({
        goods
    })
}


})