<template>
    <div style="height: 100%" ref="echart">
    </div>
</template>

<script>
    import echart from "echarts"

    export default {
        name: "EChart",
        props: {
            isAxisOption: {
                type: Boolean,
                default: true
            },
            eChartData: {
                type: Object,
                default: () => {
                    return {
                        xAxis: [],
                        series: {}
                    }
                }
            }
        },
        computed: {
            option() {
                return this.isAxisOption ? this.axisOption : this.normalOption;
            },
        },
        watch: {
            eChartData: {
                handler() {
                    this.initEchart()
                },
                deep: true
            }
        },
        data() {
            return {
                eChart: "",
                axisOption: {
                    legend: {
                        textStyle: {
                            color: '#333'
                        }
                    },
                    grid: {
                        left: '20%'
                    },
                    tooltip: {
                        trigger: 'axis'
                    },
                    xAxis: {
                        type: 'category',
                        data: [],
                        axisLine: {
                            lineStyle: {
                                color: '#17b3a3'
                            }
                        },
                        axisLabel: {
                            color: '#333'
                        }
                    },
                    yAxis: {
                        type: 'value',
                        axisLine: {
                            lineStyle: {
                                color: '#17b3a3'
                            }
                        }
                    },
                    color: [
                        '#2ec7c9',
                        '#b6a2de',
                        '#5ab1ef',
                        '#ffb980',
                        '#d87a80',
                        '#8d98b3',
                        '#e5cf0d',
                        '#97b552',
                        '#95706d',
                        '#dc69aa',
                        '#07a2a4',
                        '#9a7fd1',
                        '#588dd5',
                        '#f5994e',
                        '#c05050',
                        '#59678c',
                        '#c9ab00',
                        '#7eb00a',
                        '#6f5553',
                        '#c14089'
                    ],
                    series: [],
                },
                normalOption: {
                    tooltip: {
                        trigger: 'item'
                    },
                    color: ['#0f78f4', '#dd536b', '#9462e5', '#a6a6a6', '#e1bb22', '#39c362', '#3ed1cf'],
                    series: [],
                }
            }
        },
        methods: {
            initEchart() {
                this.initEchartData()
                if (this.eChart) {
                    this.eChart.setOption(this.option)
                } else {
                    this.eChart = echart.init(this.$refs.echart);
                    this.eChart.setOption(this.option)
                }
            },
            initEchartData() {
                if (this.isAxisOption) {
                    this.axisOption.xAxis.data = this.eChartData.xData
                    this.axisOption.series = this.eChartData.series
                } else {
                    this.normalOption.series = this.eChartData.series
                }
            }
        },
    }
</script>

<style scoped>

</style>