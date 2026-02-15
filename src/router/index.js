import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import ErrorView from "@/views/ErrorView.vue";
import RegisterView from "@/views/RegisterView.vue";
import NewCatView from "@/views/NewCatView.vue";

const routes = [
    {
        path: '/',
        name: 'homeRoute',
        component: HomeView
    },

    {
        path: '/login',
        name: 'loginRoute',
        component: LoginView
    },

    {
        path: '/error',
        name: 'errorRoute',
        component: ErrorView
    },

    {
        path: '/register',
        name: 'registerRoute',
        component: RegisterView
    },

    {
        path: '/cat/new',
        name: 'newCatRoute',
        component: NewCatView
    },


]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router