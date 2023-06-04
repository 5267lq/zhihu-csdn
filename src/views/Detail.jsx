import React, { useState, useEffect } from "react";
import './Detail.less'
import { LeftOutline, ChatCheckOutline, LikeOutline, StarOutline, UploadOutline } from 'antd-mobile-icons'
import { Space, Badge } from "antd-mobile";
import api from "../api";
import SkeletonAgain from "../components/SkeletonAgain";
import { flushSync } from "react-dom";

const Detail = function Detail(props) {
    let { navigate, params } = props
    /* 定义状态 */
    let [info, setInfo] = useState(null),
        [extra, setExtra] = useState(null)
    let link
    /* 定义样式和图片处理方法 */
    const handleStyle = (result) => {
        let { css } = result
        if (!Array.isArray(css)) return
        css = css[0]
        if (!css) return
        // 创建<Link>导入样式
        link = document.createElement('link')
        link.rel = 'stylesheet'
        link.href = css
        document.head.appendChild(link)
    }
    const handleImage = (result) => {
        let imgPlaceHolder = document.querySelector('.img-place-holder')
        if (!imgPlaceHolder) return
        // 创建大图
        let tmpImg = new Image
        tmpImg.src = result.image
        tmpImg.onload = () => {
            imgPlaceHolder.appendChild(tmpImg)
        };
        tmpImg.onerror = () => {
            let parent = imgPlaceHolder.parentElement
            parent.parentElement.removeChild(parent)
        }
    }
    /* 组件第一次渲染完毕：向服务器获取数据 */
    useEffect(() => {
        (async () => {
            try {
                let result = await api.queryNewsInfo(params.id)
                flushSync(() => {
                    setInfo(result)
                    // 处理样式和图片
                    handleStyle(result)
                })
                handleImage(result)
            } catch (_) { }
        })()
        // 销毁组件：移除创建的样式
        return () => {
            if (link) document.head.removeChild(link)
        }
    }, [])
    useState(() => {
        (async () => {
            try {
                let result = await api.queryStoreExtra(params.id)
                setExtra(result)
            } catch (_) { }
        })()
    }, [])
    return <div className="detail-box">
        {/* 新闻内容 */}
        {
            !info ? <SkeletonAgain /> :
                <div className="content" dangerouslySetInnerHTML={{ __html: info.body }}></div>
        }
        {/* 底部图标 */}
        <div className="tab-bar">
            <div className="back" onClick={() => navigate(-1)}><LeftOutline /></div>
            <div className="icons">
                <Space style={{ fontSize: 22 }}>
                    <Badge content={extra ? extra.comments : 0}>
                        <ChatCheckOutline />
                    </Badge>
                    <Badge content={extra ? extra.popularity : 0}>
                        <LikeOutline />
                    </Badge>
                    <span className="stored"><StarOutline /></span>
                    <span className="zhuanfa"><UploadOutline /></span>
                </Space>
            </div>
        </div>
    </div>
}
export default Detail