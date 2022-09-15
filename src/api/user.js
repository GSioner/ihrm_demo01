import request from '@/utils/request'

// ^ --- 登录接口
export const login = (data) => {
  return request({
    url: '/sys/login',
    data,
    method: 'POST'
  })
}

// ^ --- 获取用户信息
export const getInfo = () => {
  return request({
    url: '/sys/profile',
    method: 'POST'
  })
}

// ^ --- 获取员工信息
export const getStaffInfo = data => {
  return request({
    url: `/sys/user/${data}`
  })
}
// ^ --- 获取员工信息
export const getUserDetailById = data => {
  return request({
    url: `/sys/user/${data}`
  })
}
