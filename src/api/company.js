import request from '@/utils/request'

// 获取公司组织结构
export const getCompanyDeparts = () => {
  return request({
    url: '/company/department'
  })
}

// 获取公司负责人名单
export const getCompanyUsername = () => {
  return request({
    url: '/sys/user/simple'
  })
}

// 移除某个部门
export const deleteCompanyDeparts = (id) => {
  return request({
    url: `/company/department/${id}`,
    method: 'DELETE'
  })
}

// 添加某个部门
export const addCompanyDeparts = (data) => {
  return request({
    url: '/company/department',
    method: 'POST',
    data
  })
}

// 编辑某个部门
export const editCompanyDeparts = (data) => {
  return request({
    url: `/company/department`,
    method: 'PUT',
    data
  })
}

// 获取公司信息
export const getCompanyInfo = id => {
  return request({
    url: `/company/department/${id}`
  })
}
