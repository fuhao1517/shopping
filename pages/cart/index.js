import request from "../../utils/request.js"


Page({
    /**
     * 页面的初始数据
     */
    data: {
        goods: [],
        /* 收货地址 */
        site: {}
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {


    },
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

    }


})