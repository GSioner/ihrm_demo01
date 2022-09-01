import request from '@/utils/request'

export const getCompanyDeparts = () => {
  return request({
    url: '/company/department'
  })
}

export const getCompanyUsername = () => {
  return request({
    url: '/sys/user/simple'
  })
}

export const deleteCompanyDeparts = (id) => {
  return request({
    url: `/company/department/${id}`,
    method: 'DELETE'
  })
}

export const addCompanyDeparts = (data) => {
  return request({
    url: '/company/department',
    method: 'POST',
    data
  })
}

export const editCompanyDeparts = (data, id) => {
  return request({
    url: `/company/department/${id}`,
    method: 'PUT',
    data
  })
}
