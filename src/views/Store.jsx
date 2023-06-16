import React from "react";
import { SwipeAction } from 'antd-mobile';
import NavBarAgain from '../components/NavBarAgain';
import NewsItem from '../components/NewsItem';
import styled from "styled-components";
import SkeletonAgain from '../components/SkeletonAgain'

/* 样式 */
const StoreBox = styled.div`
    .box {
        padding:30px;
    }
`;

const Store = function Store() {
    // 移除收藏
    const handleRemove = () => { }
    return <StoreBox>
        <NavBarAgain title="我的收藏" />
        <div className="box">
            < SwipeAction rightActions={
                [{
                    key: 'delete',
                    text: '删除',
                    color: 'danger',
                    // onClick() { handleRemove(id) }
                }]} >
                <NewsItem />
            </SwipeAction>
            <SkeletonAgain></SkeletonAgain>
        </div>
    </StoreBox >;
};
export default Store