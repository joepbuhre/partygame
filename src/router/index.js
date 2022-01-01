/* eslint-disable */
import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import store from '../store'

const routes = [{
        path: '/',
        name: 'home',
        component: HomeView
    },
    {
        path: '/setup',
        name: 'Setup',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        component: () =>
            import ( /* webpackChunkName: "Setup" */ '../views/SetupView.vue')
    },
    {
        path: '/game',
        name: 'Game',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import ( /* webpackChunkName: "Setup" */ '../views/GameView.vue')
    },
    {
        path: '/websocket',
        name: 'Websocket',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import ( /* webpackChunkName: "Websocket" */ '../views/WebSocket.vue')
    }
]

const router = createRouter({
    // history: createWebHistory(process.env.BASE_URL),
    history: createWebHashHistory(),
    routes
})
router.beforeEach((to, from, next) => {
    console.log(to)
    if(to.name === 'Websocket'){
        next()
        return false;
    }

    if (to.name !== 'Setup' && (store.getters.getConfig === false)) {
        next({ name: 'Setup' })
    } else if(to.name !== 'Game' && (store.getters.getConfig !== false && store.getters.getConfig !== null)) {
        next({name: 'Game'})
    } else {
        next()
    }
})

export default router