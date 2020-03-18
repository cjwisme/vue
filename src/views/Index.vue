<template>
    <el-container style="height: 100%">
        <el-aside width="auto"><common-aside></common-aside></el-aside>
        <el-container>
            <el-header>
                <common-header @logout="logout"></common-header>
            </el-header>
            <el-main>
                <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
    import CommonAside from "../components/CommonAside"
    import CommonHeader from "../components/CommonHeader"
    export default {
        name: "index",
        components:{
            CommonAside,CommonHeader
        },
        methods: {
            logout() {
                this.$emit("clearMenu")
                this.$emit("clearToken")
                this.$router.push({ name: "login"})
            }
        },
    }
</script>

<style lang="stylus" scoped>
    .el-header
        background #B3C0D1
    .el-menu
        border-right 0px

</style>