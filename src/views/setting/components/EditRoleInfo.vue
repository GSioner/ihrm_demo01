<template>
  <el-dialog
    title="编辑角色"
    :visible.sync="editRoleShow"
    width="60%"
    :destroy-on-close="true"
  >
    <!-- 角色名称修改 -->
    <el-form :model="form" :rules="formRules">
      <el-form-item label="角色名称" label-width="15%" prop="name">
        <el-input
          v-model="form.name"
          placeholder="请输入2-12个字符的角色名称"
        />
      </el-form-item>

      <!-- 角色描述修改 -->
      <el-form-item label="角色描述" label-width="15%">
        <el-input v-model="form.description" placeholder="请输入角色描述" />
      </el-form-item>
    </el-form>

    <!-- 确认/取消按钮 -->
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="changeRoleShow(1)">确 定</el-button>
      <el-button @click="changeRoleShow(0)">取 消</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { getRoleInfo, editRoleInfo, addNewRole } from '@/api/setting.js'
export default {
  props: {
    roleData: {
      type: [Object, String],
      default() {
        return {}
      }
    },
    show: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      form: {
        name: '',
        description: ''
      },
      formRules: {
        name: [
          { required: true, trigger: 'blur', message: '请输入角色名称' },
          { min: 2, max: 12, trigger: 'blur', message: '请输入正确的角色名称' }
        ]
      }
    }
  },
  computed: {
    editRoleShow: {
      set() {},
      get() {
        return this.show
      }
    }
  },
  watch: {
    async roleData() {
      // ^--- 根据是否传入了非'add'参数进行角色数据请求
      if (this.roleData !== 'add') {
        const res = await getRoleInfo(this.roleData.id)
        this.form = res
      }
    }
  },
  methods: {
    // ^--- 分配确定/取消按钮效果
    async changeRoleShow(bool) {
      // *--- 根据传入的值判断是确定还是取消
      if (bool) {
        // TODO--- 根据传入的值判断是新增还是编辑
        if (this.roleData === 'add') {
          await addNewRole(this.form)
          this.$message.success('添加成功！')
        } else {
          await editRoleInfo(this.form, this.form.id)
          this.$message.success('编辑成功!')
        }
      }
      this.form = {
        name: '',
        description: ''
      }
      this.$emit('changeRoleShow', !this.show)
      this.$emit('reRander')
    }
  }
}
</script>

<style lang="scss" scoped>
.dialog-footer {
  display: flex;
  justify-content: center;
}
</style>
