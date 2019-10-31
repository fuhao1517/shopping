// pages/goods_list/index.js
import request from "../../utils/request.js"
Page({

    /**
     * 页面的初始数据
     */
    data: {
        /* 分类页传递过来的参数 */
        query: "",
        /* 列表数据 */
        goods: [],
        /* 当前页数 */
        pagenum: 1,
        /* 是否有更多 */
        hasMore: true,
        /* 是否在加载 */
        loading: false
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        /* options是页面的传参数，比如 {query: "曲面电视"} */
        const {
            query
        } = options;
        this.setData({
            query
        })

        /* 请求列表数据 */
        this.getList()
    },
    /* 请求列表数据 */
    getList() {
        /* 正在加载就不要请求数据数据了 */
        if (this.data.loading === true) {
            return;
        }

        /* 开始加载数据 */
        this.setData({
            loading: true
        })


        request({
            url: "/api/public/v1/goods/search",
            data: {
                query: this.data.query,
                pagenum: this.data.pagenum,
                pagesize: 10,
            }
        }).then(res => {
            const {
                goods
            } = res.data.message

            /* 判断是否到最后一页 */
            if (goods.length < 10) {
                this.setData({
                    hasMore: false
                })
            }
            /* 价格保留两位小数点 */
            const newGoods = goods.map(v => {
                v.goods_price = Number(v.goods_price).toFixed(2)
                return v
            })
            /* 赋值给goods */
            this.setData({
                goods: [...this.data.goods, ...newGoods],
                /* 页数加1 */
                pagenum: this.data.pagenum + 1,
                /* 请求成功之后吧loading改为false */
                loading: false
            })
        })
    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function() {
        /* 有更多才加载下一页 */
        if (this.data.hasMore) {
            this.getList()
        }
    },


})