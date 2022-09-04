import request from '@/utils/request.js'

// 获取总公司信息
export const getCompanyInfoSetting = () => {
  return request({
    url: '/company'
  })
}

// 获取员工信息
export const getRole = (data) => {
  return request({
    url: '/sys/role',
    data
  })
}

// 提交员工权限
export const getPromission = data => {
  return request({
    url: '/sys/role/assignPrem',
    method: 'PUT',
    data
  })
}

// 获取所有权限列表
export const getPermission = () => {
  return request({
    url: '/sys/permission'
  })
}

// 获取角色详情
export const getRoleInfo = id => {
  return request({
    url: `/sys/role/${id}`
  })
}

// 分配角色权限
export const setRolePermission = data => {
  return request({
    url: '/sys/role/assignPrem',
    method: 'PUT',
    data
  })
}

// 修改角色名称/描述
export const editRoleInfo = (data, id) => {
  return request({
    url: `/sys/role/${id}`,
    method: 'PUT',
    data
  })
}

// 删除角色
export const deleteRole = id => {
  return request({
    url: `/sys/role/${id}`,
    method: 'DELETE'
  })
}

// 新增角色
export const addNewRole = data => {
  return request({
    url: '/sys/role',
    method: 'POST',
    data
  })
}
