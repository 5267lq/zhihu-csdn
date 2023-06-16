import React from "react";
import NavBarAgain from '../components/NavBarAgain';
import ButtonAgain from '../components/ButtonAgain';
import styled from "styled-components";
import { ImageUploader, Input } from 'antd-mobile';

/* 样式 */
const UpdateBox = styled.div`
    .formBox {
        padding: 30px;

        .item {
            display: flex;
            align-items: center;
            height: 110px;
            line-height: 110px;
            font-size: 28px;

            .label {
                width: 20%;
                text-align: center;
            }

            .input {
                width: 80%;
            }
        }
    }

    .submit {
        display: block;
        margin: 0 auto;
        width: 60%;
        height: 70px;
        font-size: 28px;
    }
`;

const Update = function Update() {

    /* 定义状态 */

    /* 图片上传：限制图片大小 & 上传图片 */

    /* 提交信息 */
    const submit = () => {

    }
    return <UpdateBox>
        <NavBarAgain title="修改信息" />
        <div className="formBox">
            <div className="item">
                <div className="label">头像</div>
                <div className="input">
                    <ImageUploader
                        maxCount={1}
                        onDelete={() => { }}
                    />
                </div>
            </div>
            <div className="item">
                <div className="label">姓名</div>
                <div className="input">
                    <Input placeholder='请输入账号名称' />
                </div>
            </div>
            <ButtonAgain color='primary' className="submit" onClick={submit}>
                提交
            </ButtonAgain>
        </div>
    </UpdateBox>;
};
export default Update