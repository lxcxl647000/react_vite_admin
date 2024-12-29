import Login from "@/pages/Login";
import Layout from "@/pages/Layout";
import AuthRoute from "@/components/AuthRoute";
import { lazy, ReactNode, Suspense } from "react";
import NotFound from "@/pages/NotFound";
import { Navigate } from "react-router-dom";
import {
    HomeOutlined,
    LockOutlined,
    UserOutlined,
    TeamOutlined,
    MenuOutlined,
    ShoppingOutlined,
    ShoppingFilled,
    ProfileOutlined,
    AppstoreOutlined,
} from '@ant-design/icons';

const Home = lazy(() => import("@/pages/Home"));
const User = lazy(() => import("@/pages/Acl/User"));
const Role = lazy(() => import("@/pages/Acl/Role"));
const Permission = lazy(() => import("@/pages/Acl/Permission"));

export interface RouteConfig {
    path: string,
    element: ReactNode,
    isShow?: boolean,
    icon?: ReactNode,
    label?: string,
    children?: RouteConfig[],
    name?: string,
}

// 常量路由
export const constantRoutes: RouteConfig[] = [
    {
        path: '/login',
        element: <Login />,
        name: 'login',
    },
    {
        path: '/',
        element: <AuthRoute><Layout /></AuthRoute>,
        name: 'layout',
        isShow: true,
        children: [
            {
                path: '/home',
                element: <Suspense fallback='loading'><Home /></Suspense>,
                name: 'home',
                isShow: true,
                icon: <HomeOutlined />,
                label: '首页',
            }
        ]
    },
    {
        path: '/404',
        element: <NotFound />,
        name: '404',
    },
    {
        path: '*',
        element: <Navigate to='/404' />,
        name: 'Any',
    }
];

export const asyncRoutes: RouteConfig[] = [
    {
        path: '/acl', // 权限管理
        element: <AuthRoute><Layout /></AuthRoute>,
        name: 'Acl',
        isShow: true,
        icon: <LockOutlined />,
        label: '权限管理',
        children: [
            {
                path: '/acl/user', // 用户管理
                element: <Suspense fallback='loading'><User /></Suspense>,
                name: 'User',
                // index: true,
                isShow: true,
                icon: <UserOutlined />,
                label: '用户管理',
            },
            {
                path: '/acl/role', // 角色管理
                element: <Suspense fallback='loading'><Role /></Suspense>,
                name: 'Role',
                isShow: true,
                icon: <TeamOutlined />,
                label: '角色管理',
            },
            {
                path: '/acl/permission', // 菜单管理
                element: <Suspense fallback='loading'><Permission /></Suspense>,
                name: 'Permission',
                isShow: true,
                icon: <MenuOutlined />,
                label: '菜单管理',
            },
        ]
    },
    {
        // 商品管理//
        path: '/product',
        element: <AuthRoute><Layout /></AuthRoute>,
        name: 'Product',
        isShow: true,
        icon: <ShoppingOutlined />,
        label: '商品管理',
        children: [
            {
                // 品牌管理//
                path: '/product/trademark',
                element: <AuthRoute><Layout /></AuthRoute>,
                name: 'Trademark',
                isShow: true,
                icon: <ShoppingFilled />,
                label: '品牌管理',
            },
            {
                // 属性管理//
                path: '/product/attr',
                element: <AuthRoute><Layout /></AuthRoute>,
                name: 'Attr',
                isShow: true,
                icon: <ProfileOutlined />,
                label: '属性管理',
            },
            {
                // SPU管理//
                path: '/product/spu',
                element: <AuthRoute><Layout /></AuthRoute>,
                name: 'Spu',
                isShow: true,
                icon: <AppstoreOutlined />,
                label: 'SPU管理',
            },
            {
                // SKU管理//
                path: '/product/sku',
                element: <AuthRoute><Layout /></AuthRoute>,
                name: 'Sku',
                isShow: true,
                icon: <AppstoreOutlined />,
                label: 'SKU管理',
            }
        ]
    },
];