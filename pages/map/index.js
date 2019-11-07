// 引入SDK核心类
var QQMapWX = require('../../common/qqmap-wx-jssdk.js');
var qqmapsdk;
Page({

    onLoad: function() {
        // 实例化API核心类
        qqmapsdk = new QQMapWX({
            key: 'OJIBZ-DU4E5-3BBIZ-QKBGK-PSKHJ-HGFFP'
        });
    },
    onShow: function() {
        // 调用接口
        qqmapsdk.search({
            keyword: '酒店',
            success: function(res) {
                console.log(res);
            },
            fail: function(res) {
                console.log(res);
            },
        });
    }
})