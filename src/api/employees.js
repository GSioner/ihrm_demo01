import request from '@/utils/request'

// ^--- 获取员工信息列表
export const getStaffInfo = (params) => {
  return request({
    url: '/sys/user',
    params
  })
}

// ^--- 删除员工
export const deleteStaffInfo = (id) => {
  return request({
    url: `/sys/user/${id}`
  })
}

// ^--- 新增员工
export const addNewStaffInfo = (data) => {
  return request({
    url: '/sys/user',
    method: 'POST',
    data
  })
}

// ^--- 批量导入员工信息
export const batchStaff = (data) => {
  return request({
    url: '/sys/user/batch',
    method: 'POST',
    data
  })
}

// ^--- 获取员工基本信息
export const getStaffInfomation = (id) => {
  return request({
    url: `/sys/user/${id}`
  })
}

// ^--- 获取员工简单列表
export const getStaffSimpleInfo = () => {
  return request({
    url: '/sys/user/simple'
  })
}

// ^--- 修改员工基本信息
export const editStaffInfo = (id, data) => {
  return request({
    url: `/sys/user/${id}`,
    method: 'PUT',
    data
  })
}

// ^--- 获取员工个人信息
export const getStaffPersonalInfo = (id) => {
  return request({
    url: `/employees/${id}/personalInfo`
  })
}

// ^--- 获取员工岗位信息
export const getStaffJobInfo = (id) => {
  return request({
    url: `/employees/${id}/jobs`
  })
}

// ^--- 保存员工岗位信息
export const editStaffJobInfo = (id, data) => {
  return request({
    url: `/employees/${id}/jobs`,
    method: 'PUT',
    data
  })
}

// ^--- 分配员工角色
export const assignmentStaffRole = data => {
  return request({
    url: '/sys/user/assignRoles',
    method: 'PUT',
    data
  })
}
