<template>
  <el-button type="text" @click="click">{{ btnData.name }}</el-button>
</template>

<script>
import { deletePermission } from '@/api/permission.js'
import routerRule from '@/components/TagBar/RouterMarkDown.js'
export default {
  props: {
    btnData: {
      type: Object,
      default() {
        return {}
      }
    },
    data: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {}
  },
  created() {},
  methods: {
    // ^--- 点击类型
    click() {
      const data = this.data
      const type = this.btnData.type
      if (type === 'delete') {
        this.deleteBtn(data)
      } else if (type === 'edit') {
        this.$emit('activeEdit', data.id)
      } else if (type === 'add') {
        this.$emit('activeAdd', data.id)
      }
    },
    // ^--- 删除按钮
    async deleteBtn(data) {
      try {
        await this.$confirm('确认删除该权限点？', '删除权限')
        if (!this.verifyCode(data)) {
          return this.$message.error('当前数据为重要权限，禁止删除！')
        }
        await deletePermission(data.id)
        this.$emit('reRander')
        this.$message.success('权限删除成功!')
      } catch (er) {
        console.log(er)
      }
    },
    // ^--- 验证权限是否可删除
    verifyCode(data) {
      if ('/' + data.code === '/import') return true
      const i = routerRule.findIndex((item) => item.path === '/' + data.code)
      return i === -1
    }
  }
}
</script>

<style lang="scss" scoped></style>
