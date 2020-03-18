<template>
    <el-menu
            :default-active="$route.path"
            :collapse="isCollapse"
            class="el-menu-vertical-demo"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b"
            :router="true">
        <el-menu-item :index="aside.path" v-for="aside in noMenu" :key="aside.path" @click="selectAside(aside)">
            <i :class="'el-icon-'+ aside.icon"></i>
            <span slot="title">{{aside.label}}</span>
        </el-menu-item>

        <el-submenu :index="item.label" v-for="(item,index) in hasMenu" :key="index">
            <template slot="title">
                <i :class="'el-icon-' + item.icon"></i>
                <span>{{item.label}}</span>
            </template>
            <el-menu-item :index="subItem.path" v-for="subItem in item.children" :key="subItem.path" @click="selectAside(subItem)">
                <i :class="'el-icon-'+ subItem.icon"></i>
                <span slot="title">{{subItem.label}}</span>
            </el-menu-item>

        </el-submenu>
    </el-menu>
</template>

<script>
    export default {
        name: "CommonAside",
        computed: {
            noMenu() {
                return this.asideList.filter(v => !v.children);
            },
            hasMenu() {
                return this.asideList.filter(v => v.children);
            },
            isCollapse(){
                return this.$store.state.tab.isCollapse
            }
        },
        data() {
            return {
                asideList:[]
            }
        },
        methods: {
            selectAside(item){
                this.$store.commit("selectAside",item)
            }
        },
        created(){
            this.asideList = this.$store.state.tab.tabsList
        }
    }

</script>

<style lang="stylus" scoped>
    .el-menu
        height 100%
</style>