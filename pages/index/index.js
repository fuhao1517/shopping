import request from "../../utils/request.js"
Page({
    data: {
        banner: [],
        menus: [],
        floors:[]
    },
    onLoad() {
        /* 轮播图 */
        request({
            url: "/api/public/v1/home/swiperdata"
        }).then(res => {
            const {
                message
            } = res.data
            this.setData({
                banner: message
            })
        });
        /* 菜单 */
        request({
            url: "/api/public/v1/home/catitems"
        }).then(res => {
            const {
                message
            } = res.data
            this.setData({
                menus: message
            })
        });
        /* 楼层 */
        request({
            url: "/api/public/v1/home/floordata"
        }).then(res => {
            const {
                message
            } = res.data
            this.setData({
                floors: message
            })
        });

    }
})