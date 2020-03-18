<template>
    <div class="common-table" style="height: 100%;">
        <el-table
                :data="tableData"
                stripe
                height="90%"
                v-loading="config.loading">
            <el-table-column width="80px" label="Id">
                <template v-slot="scope">
                    <span>{{(config.page - 1)* config.size + scope.$index + 1 }}</span>
                </template>
            </el-table-column>
            <el-table-column min-width="50px" show-overflow-tooltip :prop="item.prop" :label="item.label" v-for="item in tableLabel" :key="item.prop">
                <template v-slot="scope">
                    <span>{{ scope.row[item.prop]}}</span>
                </template>
            </el-table-column>
            <el-table-column min-width="80px" label="操作">
                <template v-slot="scope">
                    <el-button type="primary" @click="handleEdit(scope.row)">编辑</el-button>
                    <el-button type="danger" @click="handleDelete(scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination
                background
                layout="prev, pager, next"
                :total="config.total"
                :current-page.sync="config.page"
                :page-size="config.size"
                @current-change="change"
                class="fr">
        </el-pagination>
    </div>

</template>

<script>
    export default {
        name: "CommonTable",
        props: {
            tableData: Array,
            tableLabel: Array,
            config:Object,
        },
        data() {
            return {}
        },
        methods: {
            handleEdit(user) {
                this.$emit("editUser",user)
            },
            handleDelete(user) {
                this.$emit("delUser",user)
            },
            change(){
                this.$emit("change")
            }
        },
    }
</script>

<style scoped>

</style>