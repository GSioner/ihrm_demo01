import request from '@/utils/request'

// ^--- 获取所有权限点
export const getAllPermission = () => {
  return request({
    url: '/sys/permission'
  })
}

// ^--- 获取权限点详情
export const getPermissionInfo = id => {
  return request({
    url: `/sys/permission/${id}`
  })
}

// ^--- 新增权限点
export const addNewPermission = data => {
  return request({
    url: '/sys/permission',
    method: 'POST',
    data
  })
}

// ^--- 修改权限点
export const editPermission = data => {
  return request({
    url: `/sys/permission/${data.id}`,
    method: 'PUT',
    data
  })
}

// ^--- 删除权限点
export const deletePermission = id => {
  return request({
    url: `/sys/permission/${id}`,
    method: 'DELETE'
  })
}
