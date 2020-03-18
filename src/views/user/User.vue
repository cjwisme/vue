<template>
    <div class="user-manage">
        <el-dialog
                :title="operateLabel==='add' ? '新增用户' : '编辑用户' "
                :visible.sync="isShow"
                width="30%">
            <common-form :form="operateForm" :tableLabel="operateFormLable"></common-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="isShow = false">取 消</el-button>
                <el-button type="primary" @click="confirm">确 定</el-button>
            </div>
        </el-dialog>
        <div class="user-header">
            <el-button @click="addUser" style="height: 40px;" type="primary">+ 新增</el-button>
            <common-form inline class="u-form" :form="form" :tableLabel="formLabel">
                <el-button type="primary" @click="searchName(form.keyWord)">搜索</el-button>
            </common-form>
        </div>
        <!--        <div class="user-content">-->
        <common-table :tableData="tableData" :tableLabel="tableLabel" :config="config"
                      @change="getUserList" @editUser="editUser" @delUser="delUser"></common-table>
        <!--        </div>-->
    </div>
</template>

<script>
    import CommonForm from "../../components/CommonForm"
    import CommonTable from "../../components/CommonTable"

    export default {
        name: "user",
        components: {
            CommonForm,
            CommonTable,
        },
        data() {
            return {
                inline: true,
                isShow: false,
                operateLabel: "add",
                config: {
                    loading: false,
                    total: 10,
                    page: 1,
                    size: 10,
                },
                form: {
                    keyWord: ""
                },
                operateForm: {
                    name: "",
                    age: "",
                    addr: "",
                    birth: "",
                    sex: ""
                },
                operateFormLable: [
                    {
                        label: "姓名",
                        model: 'name',
                    },
                    {
                        label: "年龄",
                        model: 'age',
                    },
                    {
                        label: "性别",
                        model: 'sex',
                        type: "select",
                        opts: [
                            {
                                label: "男",
                                value: 1
                            },
                            {
                                label: "女",
                                value: 0
                            },
                        ]
                    },
                    {
                        label: "出身日期",
                        model: 'birth',
                        type: 'date',
                    },
                    {
                        label: "地址",
                        model: 'addr',
                    },
                ],
                formLabel: [{
                    label: "",
                    model: 'keyWord',
                    type: "",
                }],
                tableLabel: [
                    {
                        prop: "name",
                        label: "姓名"
                    },
                    {
                        prop: "age",
                        label: "年龄"
                    },
                    {
                        prop: "sex",
                        label: "性别"
                    },
                    {
                        prop: "birth",
                        label: "日期"
                    },
                    {
                        prop: "addr",
                        label: "地址"
                    },
                ],
                tableData: [],
            }
        },
        methods: {
            getUserList(name="") {
                this.config.loading = true
                name ? this.config.page = 1 : ""
                this.$http.get("/user/getUser", {
                    params: {
                        limit: this.config.size,
                        page: this.config.page,
                        name:name
                    }
                }).then(res => {
                    this.tableData = res.data.list.map(item => {
                        item.sex = item.sex === 0 ? "女" : "男"
                        return item
                    })
                    this.config.total = res.data.count
                    this.config.loading = false
                }).catch(err => {
                    console.log(err)
                })
            },
            editUser(user) {
                this.operateLabel = "edit"
                this.operateForm = user
                this.isShow = true
            },
            addUser() {
                this.operateLabel = "add"
                this.isShow = true
            },
            delUser(user) {
                console.log(user)
            },
            confirm() {
                this.operateLabel = "add"
                this.isShow = true
                this.$http.post("/user/edit", this.operateForm).then(res => {
                    res = res.data
                    if (res.code === 20000) {
                        this.isShow = false
                        this.$message(res.data.message)
                    }
                })
                this.getUserList()
            },
            searchName(name) {
                this.getUserList(name)
            },
        },
        created() {
            this.getUserList()
        }
    }
</script>

<style lang="stylus" scoped>
    @import "~@/assets/css/common.styl";
</style>