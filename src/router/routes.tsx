import Login from "@/pages/Login";
import Layout from "@/pages/Layout";
import AuthRoute from "@/components/AuthRoute";
import { lazy, Suspense } from "react";
import NotFound from "@/pages/NotFound";
import { Navigate, RouteObject } from "react-router-dom";

const Home = lazy(() => import("@/pages/Home"));
const User = lazy(() => import("@/pages/Acl/User"));
const Role = lazy(() => import("@/pages/Acl/Role"));
const Permission = lazy(() => import("@/pages/Acl/Permission"));

// 常量路由
export const constantRoutes: RouteObject[] = [
    {
        path: '/login',
        element: <Login />,
    },
    {
        path: '/',
        element: <AuthRoute><Layout /></AuthRoute>,
        children: [
            {
                path: '/home',
                element: <Suspense fallback='loading'><Home /></Suspense>,
            }
        ]
    },
    {
        path: '/404',
        element: <NotFound />
    },
    {
        path: '*',
        element: <Navigate to='/404' />
    }
];

export const asyncRoutes: RouteObject[] = [
    {
        path: '/acl', // 权限管理
        element: <AuthRoute><Layout /></AuthRoute>,
        children: [
            {
                path: '/acl/user', // 用户管理
                element: <Suspense fallback='loading'><User /></Suspense>,
                index: true
            },
            {
                path: '/acl/role', // 角色管理
                element: <Suspense fallback='loading'><Role /></Suspense>,
            },
            {
                path: '/acl/permission', // 菜单管理
                element: <Suspense fallback='loading'><Permission /></Suspense>,
            },
        ]
    }
];