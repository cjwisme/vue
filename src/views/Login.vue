<template>
    <el-container>
        <el-main class="login">
            <el-card class="box-card">
                <common-form :form="loginForm" :tableLabel="formLabel">
                    <div class="login-but">
                        <el-button type="success" @click="login" round >登录</el-button>
                    </div>
                </common-form>
            </el-card>
        </el-main>
    </el-container>

</template>

<script>
    import CommonForm from "../components/CommonForm"

    export default {
        name: "Login",
        components: {
            CommonForm
        },
        data() {
            return {
                loginForm: {
                    username: "",
                    password: "",
                },
                formLabel: [
                    {
                        model: "username",
                        label: "用户名"
                    },
                    {
                        model: "password",
                        label: "密码",
                        type: "password",
                    },
                ]
            }
        },
        methods: {
            login() {
                this.$http.post("/permission/getMenu",this.loginForm).then(res =>{
                    res = res.data
                    console.log(res)
                    if(res.code !== 20000){
                        this.$message(res.data.message)
                    }else {
                        this.$store.commit('clearMenu')
                        this.$store.commit("setMenu",res.data.menu)
                        this.$store.commit("setToken",res.data.token)
                        this.$store.commit("addMenu",this.$router)
                        this.$router.push({ name: 'home' })
                    }
                })
            }
        },
    }
</script>

<style lang="stylus" scoped>
    .login
        display flex
        justify-content center
        margin-top 100px
    .box-card
        width 480px
        .login-but
            text-align center
</style>