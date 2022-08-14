import { createRouter, createWebHistory } from 'vue-router'
import Login from "@/views/withoutLogin/children/Login";
import Register from "@/views/withoutLogin/children/Register";
import TemplateWithoutLogin from "@/views/withoutLogin/parents/Template";
import TemplateWithLogin from '@/views/withLogin/parents/Template';
import RegisterDisease from "@/views/withLogin/children/RegisterDisease";
import ViewNews from "@/views/withLogin/children/ViewNews";
import CheckUsers from "@/views/withLogin/children/ViewUsers";
import createNews from "@/views/withLogin/children/CreateNews";
import viewReports from "@/views/withLogin/children/viewReports";

import isAdmin from "@/guards/Admin";

const routes = [
    {
        path: '/',
        component: TemplateWithoutLogin,
        redirect: 'login',

        children: [
            {
                path: 'login',
                name: 'login',
                component: Login
            },

            {
                path: 'register',
                name: 'register',
                component: Register
            }
        ]
    },

    {
        path: '/app',
        component: TemplateWithLogin,

        children: [
            {
                name: "registerDisease",
                path: '/register/disease',
                component: RegisterDisease
            },

            {
                name: "viewNews",
                path: '/view/news',
                component: ViewNews
            },

            // Admin
            {
                name: "checkUsers",
                path: "/check/users",
                component: CheckUsers,
                beforeEnter: isAdmin
            },

            {
                name: "createNews",
                path: "/create/news",
                component: createNews,
                beforeEnter: isAdmin
            },

            {
                name: "viewReports",
                path: "/view/reports",
                component: viewReports,
                beforeEnter: isAdmin
            }
        ]
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router
