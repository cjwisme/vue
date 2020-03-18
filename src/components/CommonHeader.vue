<template>
    <header>
        <div class="l-header">
            <el-button  type="primary" icon="el-icon-menu" @click="isCollapse" size="mini"></el-button>
            <el-breadcrumb separator="/">
                <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item :to="currentMenu.path" v-if="currentMenu && currentMenu.label !== '首页'">{{currentMenu.label}}
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="r-header">
            <el-dropdown @command="handleCommand">
                <span class="el-dropdown-link">
                    <img src="@/assets/image/user-default.png" alt="">
                </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item command="userInfo">个人中心</el-dropdown-item>
                    <el-dropdown-item command="logOut">退出</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
    </header>
</template>

<script>
    import {mapState} from "vuex"
    import {mapMutations} from "vuex"

    export default {
        name: "CommonHeader",
        computed: {
            ...mapState({
                currentMenu: state => state.tab.currentMenu
            })
        },
        methods: {
            ...mapMutations({
                isCollapse: "isCollapse",
            }),
            handleCommand(command) {
                switch (command) {
                    case "userInfo":
                        console.log("用户中心")
                        break;
                    case "logOut":
                        this.$emit("logout")
                }
            },
        },
    }
</script>

<style lang="stylus" scoped>
    header
        height 60px
        line-height 60px
        display flex
        justify-content space-between

    .el-button
        margin-right 15px

    .el-breadcrumb
        display inline-block

    .r-header
        line-height 60px

        img
            height 40px
            width 40px
            border-radius 50%
            margin-top 15px
</style>

<style lang="stylus">
    .el-breadcrumb__item
        .el-breadcrumb__separator
            color black
            font-weight normal

        .el-breadcrumb__inner
            font-weight normal

    .el-dropdown
        height 100%
</style>