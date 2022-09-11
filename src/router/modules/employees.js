// 员工路由规则
import Layout from '@/layout'

export default {
  path: '/employees',
  component: Layout,
  children: [
    {
      path: '',
      name: 'employees',
      component: () => import('@/views/employees'),
      meta: { title: '员工管理', icon: 'people' }
    },
    {
      path: 'detail/:id',
      name: 'EmployeesInfo',
      component: () => import('@/views/employees/components/StaffInfo/index'),
      hidden: true
    },
    {
      path: 'printer/:id',
      name: 'EmployeesPrinter',
      component: () => import('@/views/employees/components/StaffInfo/PrinterPage'),
      hidden: true
    }
  ]
}
