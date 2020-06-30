import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home.vue'

Vue.use(Router)

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [{
            path: '/',
            name: 'home',
            component: Home
        },
        {
            path: '/contacts',
            name: 'contacts',
            component: (resolve) => require(['@/views/Contacts/Contacts.vue'], resolve),
        },
        {
            path: '/cookie',
            name: 'cookie',
            component: (resolve) => require(['@/views/Cookie/index.vue'], resolve),
        },
        {
            path: '/screenshot',
            name: 'screenshot',
            component: (resolve) => require(['@/views/screenshot/index.vue'], resolve),
        },
        {
            path: '/tree',
            name: 'tree',
            component: (resolve) => require(['@/views/tree/index.vue'], resolve),
        },
        {
            path: '/map/search',
            name: 'MapSearch',
            component: (resolve) => require(['@/views/mapSearch/index.vue'], resolve),
        }
    ]
})
