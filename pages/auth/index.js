import request from "../../utils/request.js"
Page({
    /* 用户同意授权后的事件方法，获取code的前4个参数 */
    handleGetUserInfo(res) {
        const {
            encryptedData,
            rawData,
            iv,
            signature
        } = res.detail;
        /* 获取token */
        wx.login({
            success(value) {
                const {
                    code
                } = value
                /* 请求必须要放在回调函数中 */
                request({
                    url: "/api/public/v1/users/wxlogin",
                    method: "POST",
                    data: {
                        encryptedData,
                        rawData,
                        iv,
                        signature,
                        code
                    }
                }).then(res => {
                    const {
                        token
                    } = res.data.message;
                    wx.setStorageSync("token", token);
                    /* 返回上一个页面 */
                    wx.navigateBack()
                })
            }

        })
    }
})