import React from "react";
import { NavBar } from "antd-mobile";
import PropTypes from 'prop-types'
import './NavBarAgain.less'
import { useNavigate, useLocation, useSearchParams } from "react-router-dom";

const NavBarAgain = function NavBarAgain(props) {
    let { title } = props
    let navigate = useNavigate(),
        location = useLocation(),
        [usp] = useSearchParams()
    const handleBack = () => {
        // 特殊：登录页 && to的值是/detail/xxx，此时点击导航栏返回按钮返回的是相关详情页
        let to = usp.get('to')
        if (location.pathname === '/login' && /^\/detail\/\d+$/.test(to)) {
            navigate(to, { replace: true })
            return
        }
        navigate(-1)
    }
    return <NavBar className="navbar-again-box" onBack={handleBack}>
        {title}
    </NavBar>
}
NavBarAgain.defaultProps = {
    title: '个人中心' // 给当前函数添加一个静态私有属性defaultProps，设置默认值
}
NavBarAgain.propTypes = {
    title: PropTypes.string
}
export default NavBarAgain