import React, { useState, useEffect } from "react";
import NavBarAgain from "../components/NavBarAgain";
import { Form, Input, Toast } from "antd-mobile";
import './Login.less'
import ButtonAgain from "../components/ButtonAgain";
import api from '../api'
import _ from '../assets/utils'

const Login = function Login() {
    /* 状态 */
    const [formIns] = Form.useForm()
    let [disabled, setDisabled] = useState(false),
        [sendText, setSendText] = useState('发送验证码')
    /* 发送验证码 */
    let timer = null,
        num = 11
    const countdown = () => {
        num--
        if (num === 0) {
            clearInterval(timer)
            timer = null
            setDisabled(false)
            setSendText('发送验证码')
            return
        }
        setSendText(`${num}秒后重发`)
    }
    const send = async () => {
        try {
            await formIns.validateFields(['phone'])
            // 手机号格式校验通过
            let phone = formIns.getFieldValue('phone')
            let { code } = await api.sendPhoneCode(phone)
            if (+code !== 0) {
                Toast.show({
                    icon: 'fail',
                    content: '发送失败',
                })
                return
            }
            // 发送成功
            setDisabled(true)
            countdown()
            if (!timer) timer = setInterval(countdown, 1000)
        } catch (_) { }
    }
    // 组件销毁的时候：把没有清除的定时器清除
    useEffect(() => {
        return () => {
            if (timer) {
                clearInterval(timer)
                timer = null
            }
        }
    }, [])
    /* 表单提交 */
    const submit = async () => {
        try {
            await formIns.validateFields()
            let results = formIns.getFieldsValue()
            let { code, token } = await api.login(results.phone, results.code)
            if (+code !== 0) {
                Toast({
                    icon: 'fail',
                    content: '登录失败'
                })
                formIns.resetFields(['code'])
                return
            }
            // 登录成功：存储token、存储登录者信息到redux、提示、跳转
            _.storage.set('tk', token)
        } catch (_) { }
    }
    /* 自定义表单校验规则 */
    const validate = {
        phone(_, value) {
            value = value.trim()
            let reg = /^(?:(?:\+|00)86)?1\d{10}$/
            if (value.length === 0) return Promise.reject(new Error('手机号是必填项'))
            if (!reg.test(value)) return Promise.reject(new Error('手机号格式有误'))
            return Promise.resolve()
        },
        code(_, value) {
            value = value.trim()
            let reg = /^\d{6}$/
            if (value.length === 0) return Promise.reject('验证码是必填项')
            if (!reg.test(value)) return Promise.reject('验证码格式有误')
            return Promise.resolve()
        }
    }
    return <div className="login-box">
        <NavBarAgain title="登录/注册"></NavBarAgain>
        <Form
            layout='horizontal'
            style={{ "--border-top": 'none' }}
            footer={
                <ButtonAgain color='primary' onClick={submit}>
                    提交
                </ButtonAgain>
            }
            form={formIns}
            initialValues={{ phone: '', code: '' }}
            requiredMarkStyle={false}
        >
            <Form.Item name='phone' label='手机号' rules={[{ validator: validate.phone }]}>
                <Input placeholder='请输入手机号' />
            </Form.Item>
            <Form.Item name='code' label='验证码'
                // rules={[{ validator: validate.code }]}
                rules={[{ required: true, message: '验证码是必填项' }, { pattern: /^\d{6}$/, message: '验证码格式有误' }]}
                extra={<ButtonAgain size="small" color="primary" disabled={disabled} onClick={send}>{sendText}</ButtonAgain>}>
                <Input />
            </Form.Item>
        </Form>
    </div>
}
export default Login