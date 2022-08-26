import request from '@/utils/request'

// ^ --- 登录接口
export const login = (data) => {
  return request({
    url: '/sys/login',
    data,
    method: 'POST'
  })
}

export const getInfo = (data) => {}

export const logout = (data) => {}
