import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Router from 'vue-router'
import store from './store'
import '@/assets/css/reset.styl'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import http from "./api/config"
import "./mock"

Vue.use(ElementUI)
Vue.use(Router)
Vue.config.productionTip = false
Vue.prototype.$http = http

const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}

router.beforeEach((to, from, next) => {
    // 防止刷新后vuex里丢失token
    store.commit('getToken')
    // 防止刷新后vuex里丢失标签列表tabList
    store.commit('getMenu')
    let token = store.state.user.token
    // 过滤登录页，防止死循环
    if (!token && to.name !== 'login') {
        next({name: 'login'})
    } else {
        next()
    }
})

new Vue({
    router,
    store,
    render: h => h(App),
    created() {
        store.commit('addMenu', router)
    }
}).$mount('#app')
