<template>
    <el-form label-width="100px" ref="form" :inline="inline" :model="form">
        <el-form-item :label="item.label" v-for="item in tableLabel" :key="item.model">
            <el-input v-model="form[item.model]" placeholder="请输入" v-if="!item.type"></el-input>
            <el-input v-model="form[item.model]" placeholder="请输入密码" v-if="item.type === 'password'" show-password></el-input>
            <el-select v-model="form[item.model]" placeholder="请输入" v-if="item.type === 'select'">
                <el-option :label="opt.label" :value="opt.value" v-for="opt in item.opts"
                           :key="opt.label"></el-option>
            </el-select>
            <el-date-picker
                    v-model="form[item.model]"
                    type="date"
                    placeholder="选择日期"
                    v-if="item.type === 'date'">
            </el-date-picker>
        </el-form-item>
        <slot></slot>
    </el-form>
</template>

<script>
    export default {
        name: "CommonForm",
        props: {
            inline: Boolean,
            form: Object,
            tableLabel: Array,
        },
    }
</script>

<style lang="stylus" scoped>

</style>