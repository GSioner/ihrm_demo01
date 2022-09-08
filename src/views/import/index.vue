<template>
  <div>
    <UpdateExcel :on-success="onSuccess" />
  </div>
</template>

<script>
import { batchStaff } from '@/api/employees.js'
export default {
  methods: {
    async onSuccess({ header, results }) {
      const relation = {
        入职日期: 'timeOfEntry',
        手机号: 'mobile',
        姓名: 'username',
        转正日期: 'correctionTime',
        工号: 'workNumber',
        部门: 'departmentName'
      }
      const arr = results.map((outer) => {
        const obj = {}
        // Object.keys(relation).forEach((inner) => {
        //   const enName = relation[inner]
        //   obj[enName] = outer[inner]
        //   if (enName === 'timeOfEntry' || enName === 'correctionTime') {
        //     obj[enName] = this.formatDate(obj[enName], '-')
        //   }
        // })
        for (const k in relation) {
          const enName = relation[k]
          obj[enName] = outer[k]
          if (enName === 'timeOfEntry' || enName === 'correctionTime') {
            obj[enName] = this.formatDate(obj[enName], '-')
          }
        }
        return obj
      })
      await batchStaff(arr)
      this.$message.success('文件导入成功')
      this.$router.back()
    },
    formatDate(numb, format) {
      const time = new Date((numb - 1) * 24 * 3600000 + 1)
      time.setYear(time.getFullYear() - 70)
      const year = time.getFullYear() + ''
      const month = time.getMonth() + 1 + ''
      const date = time.getDate() - 1 + ''
      if (format && format.length === 1) {
        return year + format + month + format + date
      }
      return (
        year +
        (month < 10 ? '0' + month : month) +
        (date < 10 ? '0' + date : date)
      )
    }
  }
}
</script>

<style lang="scss" scoped></style>
