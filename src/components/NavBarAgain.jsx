import React from "react";
import { NavBar } from "antd-mobile";
import PropTypes from 'prop-types'
import './NavBarAgain.less'

const NavBarAgain = function NavBarAgain(props) {
    let { title } = props
    const handleBack = () => {
        // 复杂返回逻辑...
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