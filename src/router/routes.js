import Home from "../views/Home";
import { lazy } from "react";
import { withKeepAlive } from "keepalive-react-component/lib";

const routes = [{
    path: '/',
    name: 'home',
    component: withKeepAlive(Home, { cacheId: 'home', scroll: true }),
    meta: {
        title: '52lkk-首页'
    }
}, {
    path: '/detail/:id',
    name: 'detail',
    component: lazy(() => import('../views/Detail')),
    meta: {
        title: '52lkk-详情页'
    }
}, {
    path: '/personal',
    name: 'personal',
    component: lazy(() => import('../views/Personal')),
    meta: {
        title: '52lkk-个人中心页'
    }
}, {
    path: '/store',
    name: 'store',
    component: lazy(() => import('../views/Store')),
    meta: {
        title: '52lkk-收藏页'
    }
}, {
    path: '/update',
    name: 'update',
    component: lazy(() => import('../views/Update')),
    meta: {
        title: '52lkk-修改个人信息页'
    }
}, {
    path: '/login',
    name: 'login',
    component: lazy(() => import('../views/Login')),
    meta: {
        title: '52lkk-登录注册页'
    }
}, {
    path: '*',
    name: '404',
    component: lazy(() => import('../views/Page404')),
    meta: {
        title: '42lkk-404页'
    }
}]
export default routes