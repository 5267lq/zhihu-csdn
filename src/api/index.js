import http from './http'
// 获取今日新闻信息 & 轮播图信息
const queryNewsLatest = () => {
    return http.get('/api/news_latest')
}
// 获取往日新闻信息
const queryNewsBefore = (time) => {
    return http.get('/api/news_before', {
        params: {
            time
        }
    })
}
// 获取新闻详细信息
const queryNewsInfo = (id) => {
    return http.get('/api/news_info', {
        params: {
            id
        }
    })
}
// 获取新闻点赞信息
const queryStoreExtra = (id) => {
    return http.get('/api/story_extra', {
        params: {
            id
        }
    })
}
// 获取手机验证码
const sendPhoneCode = (phone) => {
    return http.post('/api/phone_code', {
        phone
    })
}
// 登录|注册
const login = (phone, code) => {
    return http.post('/api/login', {
        phone,
        code
    })
}
// 获取登录者信息
const queryUserInfo = () => {
    return http.get('/api/user_info')
}
// 暴露API
const api = {
    queryNewsLatest,
    queryNewsBefore,
    queryNewsInfo,
    queryStoreExtra,
    sendPhoneCode,
    login,
    queryUserInfo
}
export default api