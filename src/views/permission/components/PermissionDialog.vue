<template>
  <div>
    <el-dialog :title="dialogName" :visible.sync="dialogShow" destroy-on-close @close="$emit('update:show', false)">
      <el-form ref="form" :model="detailList" :rules="dataRule" label-width="120px">
        <el-form-item label="权限名称" prop="name">
          <el-input v-model="detailList.name" />
        </el-form-item>
        <el-form-item label="权限标识" prop="code">
          <el-input v-model="detailList.code" />
        </el-form-item>
        <el-form-item label="权限描述">
          <el-input v-model="detailList.description" />
        </el-form-item>
        <el-form-item label="开启">
          <el-switch v-model="detailList.enVisible" disabled />
        </el-form-item>
        <el-form-item>
          <el-row type="flex" justify="center">
            <el-button type="primary" @click="saveData">确定</el-button>
            <el-button @click="$emit('update:show', false)">取消</el-button>
          </el-row>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { editPermission, addNewPermission } from '@/api/permission.js'
import routerRule from '@/components/TagBar/RouterMarkDown.js'
export default {
  props: {
    data: {
      type: Object,
      default() {
        return {}
      }
    },
    permission: {
      type: Array,
      default() {
        return {}
      }
    },
    type: {
      type: String,
      default: ''
    },
    show: {
      type: Boolean,
      default: false
    },
    pid: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      detailList: {},
      dialogName: '弹窗',
      dataRule: {
        name: [
          { required: true, trigger: 'blur', message: '请填入权限名称' },
          { validator: this.verifyName, trigger: 'blur' }
        ],
        code: [
          { required: true, trigger: 'blur', message: '请填入权限标识' },
          { validator: this.verifyCode, trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    dialogShow: {
      set(val) {},
      get() {
        return this.show
      }
    }
  },
  watch: {
    type() {
      if (this.type === 'edit') {
        this.dialogName = '编辑权限'
        this.detailList = { ...this.data }
      } else if (this.type === 'add') {
        this.dialogName = '新增权限'
        this.detailList = {}
        this.detailList.pid = this.pid
      }
    }
  },
  methods: {
    verifyName(rule, value, callback) {
      let bool = false
      if (this.type === 'add') {
        bool = this.permission.filter((item) => item.pid === this.detailList.pid).every((item) => item.name !== value)
      } else if (this.type === 'edit') {
        if (!this.verify()) callback(new Error('当前数据为重要权限，禁止修改!'))
        bool = this.permission.filter((item) => item.id !== this.detailList.id && item.pid === this.detailList.pid).every((item) => item.name !== value)
      }
      bool ? callback() : callback(new Error('当前名称已存在于同部门中，请重新修改!'))
    },
    verifyCode(rule, value, callback) {
      let bool = false
      if (this.type === 'add') {
        bool = this.permission.every((item) => item.code !== value)
      } else if (this.type === 'edit') {
        if (!this.verify()) callback(new Error('当前数据为重要权限，禁止修改!'))
        bool = this.permission.filter(item => item.id !== this.detailList.id).every((item) => item.code !== value)
      }
      bool ? callback() : callback(new Error('当前标识已存在，请重新修改!'))
    },
    verify() {
      if ('/' + this.data.code === '/import') return true
      const i = routerRule.findIndex((item) => item.path === '/' + this.data.code)
      return i === -1
    },
    async saveData() {
      if (this.type === 'edit') {
        await editPermission(this.detailList)
        this.$message.success('权限修改成功!')
      } else if (this.type === 'add') {
        await addNewPermission(this.detailList)
      }
      this.$emit('update:show', false)
      this.$emit('reRander')
      this.$message.success('权限添加成功!')
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep .el-input__inner{
  width: 700px;
}
</style>
