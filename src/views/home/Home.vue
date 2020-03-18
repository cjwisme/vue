<template>
    <el-row class="home" :gutter="20">
        <el-col :span="8">
            <el-card shadow="hover">
                <div class="user">
                    <img :src="userInfo" alt="">
                    <div class="userInfo">
                        <p class="name">cjw</p>
                        <p class="access">超级管理员</p>
                    </div>
                </div>
                <div class="login-info">
                    <p>上次登录时间:<span>2019-10-19</span></p>
                    <p>上次登录地点:<span>北京</span></p>
                </div>
            </el-card>
            <el-card shadow="hover">
                <el-table
                        :data="tableData"
                        style="width: 100%">
                    <el-table-column v-for="(val,key) in tableLabelData"
                                     :prop="key"
                                     :label="val"
                                     :key="key"
                                     show-overflow-tooltip>
                    </el-table-column>
                </el-table>
            </el-card>
        </el-col>
        <el-col :span="16">
            <div class="num">
                <el-card shadow="hover" v-for="item in goodsList" :key="item.label">
                    <i class="icon" :class="`el-icon-${item.icon}`" :style="{background:item.color}"></i>
                    <div class="detail">
                        <p class="num">￥ {{item.value}}</p>
                        <p class="txt"> {{item.label}}</p>
                    </div>
                </el-card>
            </div>
            <div class="m-graph">
                <el-card shadow="hover">
                    <e-chart :eChartData="eChartData.orderData"></e-chart>
                </el-card>
            </div>
            <div class="b-graph">
                <el-card shadow="hover">
                    <e-chart :eChartData="eChartData.userData"></e-chart>
                </el-card>
                <el-card shadow="hover">
                    <e-chart :eChartData="eChartData.videoData" :isAxisOption="false"></e-chart>
                </el-card>
            </div>
        </el-col>
    </el-row>

</template>

<script>
    import EChart from "../../components/EChart"

    export default {
        name: "Home",
        components: {
            EChart,
        },
        data() {
            return {
                userInfo: require("@/assets/image/user.png"),
                goodsList: [
                    {
                        label: "今日支付订单",
                        value: 1234,
                        icon: "success",
                        color: '#2CC8C9'
                    },
                    {
                        label: "今日收藏订单",
                        value: 12,
                        icon: "star-off",
                        color: '#FFBA80'
                    },
                    {
                        label: "今日未支付订单",
                        value: 3000,
                        icon: "s-goods",
                        color: '#5AB1EF'
                    },
                    {
                        label: "本月支付订单",
                        value: 20340,
                        icon: "success",
                        color: '#2CC8C9'
                    },
                    {
                        label: "本月收藏订单",
                        value: 15000,
                        icon: "star-off",
                        color: '#FFBA80'
                    },
                    {
                        label: "本月未支付订单",
                        value: 20000,
                        icon: "s-goods",
                        color: '#5AB1EF'
                    },
                ],
                tableData: [],
                tableLabelData: {
                    name: "课程",
                    todayBuy: "今日购买",
                    monthBuy: "当月购买",
                    totalBuy: "总购买",
                },
                eChartData: {
                    orderData: {
                        xData: [],
                        series: []
                    },
                    userData: {
                        xData: [],
                        series: []
                    },
                    videoData: {
                        // legendData: [],
                        series: []
                    }
                }
            }
        },
        methods: {
            initOrderData(order) {
                this.eChartData.orderData.xData = order.date
                const keys = Object.keys(order.data[0])
                keys.forEach(key => {
                    const seriesData = order.data.map(item => item[key])
                    let series = {}
                    series.data = seriesData
                    series.type = "line"
                    series.name = key
                    this.eChartData.orderData.series.push(series)
                })
            },
            initUserData(user) {
                this.eChartData.userData.xData = user.map(item => item.date)
                this.eChartData.userData.series.push({
                        type: "bar",
                        data: user.map(item => item.new),
                    }
                )
                this.eChartData.userData.series.push({
                        type: "bar",
                        data: user.map(item => item.active),
                    }
                )
            },
            initVideoData(video){
                this.eChartData.videoData.series.push({
                    type:"pie",
                    name:"视频",
                    data:video
                })
            }
        },
        created() {
            this.$http.get("/home/getData").then(response => {
                let res = response.data
                this.tableData = res.data.tableData
                const order = res.data.orderData
                this.initOrderData(order)
                this.initUserData(res.data.userData)
                this.initVideoData(res.data.videoData)
            })
        },
    }
</script>

<style lang="stylus" scoped>
    @import "~@/assets/css/home.styl"
</style>