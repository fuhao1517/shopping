import request from "./utils/request.js"
//app.js
App({
    onLaunch: function() {
        /* 设置默认基准路径 */
        request.defaults.baseURL = "https://api.zbztb.cn"
    },
    globalData: {

    }
})