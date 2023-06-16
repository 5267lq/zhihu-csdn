import React, { Suspense, useState, useEffect } from "react";
import { Routes, Route, useNavigate, useLocation, useParams, useSearchParams, Navigate } from "react-router-dom";
import routes from "./routes";
import { Mask, DotLoading, Toast } from "antd-mobile";
import store from '../store'
import action from '../store/actions'

const isCheckLogin = (path) => {
    let { base: { info } } = store.getState(),
        checkList = ['/personal', '/update', '/store']
    return !info && checkList.includes(path)
}
/* 统一路由配置 */
const Element = function Element(props) {
    let { component: Component, meta, path } = props
    /* // 登录态校验
    let { base: { info } } = store.getState(),
        checkList = ['/personal', '/udpate', '/store']
    // 如果info不存在并且跳转的地址是三个地址中的一个：派发任务从服务器获取登录者信息
    if (!info && checkList.includes(path)) {
        (async () => {
            let infoAction = await action.base.queryUserInfoAsync()
            info = infoAction.info
            // 向服务器获取后info还是不存在：未登录
            if (!info) {
                Toast.show({
                    icon: 'fail',
                    content: '请先登录'
                })
                return <Navigate to={{
                    pathname: '/login',
                    search: `?to=${path}`
                }} />
            }
            // 如果获取到了信息，说明是登录的，我们派发任务将信息存储在store容器中
            store.dispatch(infoAction)
        })()
    } */
    let isShow = !isCheckLogin(path),
        [_, setRandom] = useState(0)
    // 登录态校验
    useEffect(() => {
        if (isShow) return
        (async () => {
            let infoAction = await action.base.queryUserInfoAsync(),
                info = infoAction.info
            // 向服务器获取后info还是不存在：未登录
            if (!info) {
                Toast.show({
                    icon: 'fail',
                    content: '请先登录'
                })
                // 跳转到登录页
                navigate({
                    pathname: '/login',
                    search: `?to=${path}`
                }, { replace: true })
                return
            }
            // 如果获取到了信息，说明是登录的，我们派发任务将信息存储在store容器中
            store.dispatch(infoAction)
            setRandom(+new Date())
        })()
    })
    // 修改页面title
    let { title = '52lkk-zhihu' } = meta || {}
    document.title = title
    // 获取路由信息，基于属性传递给组件
    const navigate = useNavigate(),
        location = useLocation(),
        params = useParams(),
        [usp] = useSearchParams()
    return <>
        {isShow ?
            <Component navigate={navigate} location={location} params={params} usp={usp} /> :
            <Mask visible={true}><DotLoading color="white" /></Mask>
        }
    </>
}
export default function RouterView() {
    return <Suspense fallback={<Mask visible={true}>
        <DotLoading color="white" />
    </Mask>}>
        <Routes>
            {
                routes.map(item => {
                    let { path, name } = item
                    return <Route key={name} path={path} element={<Element {...item} />}></Route>
                })
            }
        </Routes>
    </Suspense>
}