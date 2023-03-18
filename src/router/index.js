import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
const routes = [{
        path: '/',
        name: 'qwLogin',
        meta: {
            title: "企业微信登录",
            keepAlive: false,
        },
        component: () =>
            import ('@/views/login/qwLogin.vue'),
    },
    {
        path: '/amyLogin',
        name: 'amyLogin',
        meta: {
            title: "啊美雅账号登录",
            keepAlive: false,
        },
        component: () =>
            import ('@/views/login/amyLogin'),
    },
    {
        path: '/workbench',
        name: 'workbench',
        meta: {
            title: "工作台",
            keepAlive: false,
        },
        component: () =>
            import ('@/views/workbench/workbench'),
    },
    {
        path: '/recording',
        name: 'recording',
        meta: {
            title: "录单",
            keepAlive: false,
        },
        component: () =>
            import ('@/views/recording/recording'),
    },
    {
        path: '/editRecording',
        name: 'editRecording',
        meta: {
            title: "编辑订单",
            keepAlive: false,
        },
        component: () =>
            import ('@/views/editRecording/recording'),
    },
    {
        path: '/orderList',
        name: 'orderList',
        meta: {
            title: "订单列表",
            keepAlive: true,
        },
        component: () =>
            import ('@/views/orderList/orderList'),
    },
    {
        path: '/dispatchList',
        name: 'dispatchList',
        meta: {
            title: "派单列表",
            keepAlive: false,
        },
        component: () =>
            import ('@/views/dispatchList/dispatchList'),
    },
    {
        path: '/noDispatch',
        name: 'noDispatch',
        meta: {
            title: "未派单列表",
            keepAlive: true,
        },
        component: () =>
            import ('@/views/dispatchList/views/noDispatch'),
    },
    {
        path: '/dispatched',
        name: 'dispatched',
        meta: {
            title: "已派单列表",
            keepAlive: true,
        },
        component: () =>
            import ('@/views/dispatchList/views/dispatched'),
    },
    {
        path: '/detail',
        name: 'detail',
        meta: {
            title: "订单详情",
            keepAlive: false,
        },
        component: () =>
            import ('@/views/detail/detail'),
    },
    {
        path: '/deal',
        name: 'deal',
        meta: {
            title: "订单详情",
            keepAlive: false,
        },
        component: () =>
            import ('@/views/deal/deal'),
    },
    {
        path: '/dataCenter',
        name: 'dataCenter',
        meta: {
            title: "数据中心",
            keepAlive: false,
        },
        component: () =>
            import ('@/views/dataCenter/dataCenter'),
    },
    {
        path: '/naturalSeeding',
        name: 'naturalSeeding',
        meta: {
            title: "自播达人",
            keepAlive: false,
        },
        component: () =>
            import ('@/views/dataCenter/views/naturalSeeding'),
    },
    {
        path: '/assistantDetails',
        name: 'assistantDetails',
        meta: {
            title: "助理详情",
            keepAlive: false,
        },
        component: () =>
            import ('@/views/dataCenter/views/assistantDetails'),
    },
    {
        path: '/personal',
        name: 'personal',
        meta: {
            title: "个人中心",
            keepAlive: false,
        },
        component: () =>
            import ('@/views/personal/personal'),
    },
    {
        path: '/myData',
        name: 'myData',
        meta: {
            title: "我的数据",
            keepAlive: false,
        },
        component: () =>
            import ('@/views/personal/views/myData/myData'),
    },
    {
        path: '/accountNumber',
        name: 'accountNumber',
        meta: {
            title: "账号设置",
            keepAlive: false,
        },
        component: () =>
            import ('@/views/personal/views/accountNumber/accountNumber'),
    },
    {
        path: '/anchor',
        name: 'anchor',
        meta: {
            title: "主播数据",
            keepAlive: false,
        },
        component: () =>
            import ('@/views/personal/views/anchor/anchor'),
    },
]

const router = new VueRouter({
    routes
})

export default router