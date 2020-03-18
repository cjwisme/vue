import Cookie from "js-cookie"

export default {
    state: {
        isCollapse: false,
        currentMenu: null,
        tabsList: [
            {
                path: '/',
                name: 'home',
                label: '首页',
                icon: 'home'
            }
        ],
        menu: []
    },
    mutations: {
        clearMenu(state) {
            state.menu = []
            Cookie.remove('menu')
        }
        ,
        setMenu(state, val) {
            state.menu = val
            Cookie.set("menu", JSON.stringify(val))
        }
        ,
        addMenu(state, router) {
            if (!Cookie.get('menu')) {
                return
            }
            let menu = JSON.parse(Cookie.get('menu'))
            state.menu = menu
            let currentMenu = [
                {
                    path: '/',
                    component: () => import(`@/views/Index`),
                    children: []
                }
            ]
            menu.forEach(item => {
                if (item.children) {
                    item.children = item.children.map(item => {
                        item.component = () => import(`@/views/${item.url}`)
                        return item
                    })
                    currentMenu[0].children.push(...item.children)
                } else {
                    item.component = () => import(`@/views/${item.url}`)
                    currentMenu[0].children.push(item)
                }
            })
            router.addRoutes(currentMenu)
        }
        ,
        getMenu(state) {
            if (Cookie.get('menu')) {
                let tabList = JSON.parse(Cookie.get('menu'))
                state.tabsList = tabList
            }
        },
        selectAside(state, item) {
            state.currentMenu = item
        }
        ,
        isCollapse(state) {
            state.isCollapse = !state.isCollapse
        }
    }
    ,
    actions: {}
    ,
}