import request from '@/utils/request'

// ^--- 获取员工信息列表
export const getStaffInfo = (params) => {
  return request({
    url: '/sys/user',
    params
  })
}

// ^--- 删除员工
export const deleteStaffInfo = id => {
  return request({
    url: `/sys/user/${id}`
  })
}

// ^--- 新增员工
export const addNewStaffInfo = data => {
  return request({
    url: '/sys/user',
    method: 'POST',
    data
  })
}
