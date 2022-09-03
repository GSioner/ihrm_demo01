/* eslint-disable vue/require-prop-types */
<template>
  <el-row
    type="flex"
    class="row-bg tree_main"
    justify="space-between"
    align="middle"
    style="line-height: 40px"
  >
    <!-- 左侧部分 -->
    <div>
      <svg-icon
        v-if="data.icon"
        :icon-class="data.icon"
        style="margin-right: 10px"
      />
      <!-- 部门名单 -->
      <span>{{ data.name }}</span>
    </div>

    <!-- 右侧内容 -->
    <div>
      <!-- 负责人名单 -->
      <span v-if="data.manager" style="margin-right: 50px; font-size: 15px">{{
        data.manager
      }}</span>

      <!-- 下拉菜单 -->
      <el-dropdown @command="handleCommand">
        <span class="el-dropdown-link" style="font-size: 15px">
          操作<i class="el-icon-arrow-down el-icon--right" />
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item
            style="color: #437dff"
            command="add"
          >添加子部</el-dropdown-item>
          <el-dropdown-item
            v-if="!data.isHost"
            style="color: #437dff"
            command="edit"
          >编辑子部</el-dropdown-item>
          <el-dropdown-item
            v-if="!data.isHost"
            style="color: #437dff"
            command="del"
          >删除子部</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>

    <!-- 气泡弹出删除确认框 -->
    <el-dialog
      class="dialog"
      title="警告！"
      :visible.sync="deleteDialog"
      width="30%"
      :before-close="handleClose"
    >
      <span>确认删除部门？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="deleteDialog = false">取 消</el-button>
        <el-button type="primary" @click="deleteDeparts">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 添加功能对话框 -->
    <el-dialog
      :title="type === 'add' ? '新增部门' : '编辑部门'"
      :visible.sync="addEditDialog"
      :destroy-on-close="true"
      @close="onCancel"
    >
      <el-form ref="ruleForm" :model="form" :rules="rules">
        <!-- 部门名称 -->
        <el-form-item
          label="部门名称"
          :label-width="formLabelWidth"
          prop="name"
        >
          <el-input v-model="form.name" placeholder="1-50个字符" />
        </el-form-item>

        <!-- 部门编码 -->
        <el-form-item
          label="部门编码"
          :label-width="formLabelWidth"
          prop="code"
        >
          <el-input v-model="form.code" placeholder="1-50个字符" />
        </el-form-item>

        <!-- 部门负责人 -->
        <el-form-item
          label="部门负责人"
          :label-width="formLabelWidth"
          prop="manager"
        >
          <el-select
            v-model="form.manager"
            placeholder="请选择负责人"
            @focus="getCompanyUsername"
          >
            <el-option
              v-for="k in companyUsername"
              :key="k.id"
              :label="k.username"
              :value="k.username"
            />
          </el-select>
        </el-form-item>

        <!-- 部门介绍 -->
        <el-form-item
          label="部门介绍"
          :label-width="formLabelWidth"
          prop="introduce"
        >
          <el-input
            v-model="form.introduce"
            type="textarea"
            :rows="5"
            placeholder="1-300个字符"
          />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="onCancel">取 消</el-button>
        <el-button type="primary" @click="addDepartsData">确 定</el-button>
      </div>
    </el-dialog>
  </el-row>
</template>

<script>
import {
  deleteCompanyDeparts,
  getCompanyUsername,
  addCompanyDeparts,
  editCompanyDeparts,
  getCompanyDeparts,
  getCompanyInfo
} from '@/api/company.js'
export default {
  name: 'CompanyTree',
  props: {
    data: {
      type: Object,
      default() {
        return { name: '', icon: '', manager: '' }
      }
    }
  },
  data() {
    return {
      deleteDialog: false,
      addEditDialog: false,
      form: {
        name: '',
        manager: '',
        introduce: '',
        code: ''
      },
      formLabelWidth: '100px',
      companyUsername: [],
      type: '',
      id: '',
      rules: {
        name: [
          { required: true, trigger: 'blur', message: '请输入部门名称' },
          {
            min: 1,
            max: 50,
            trigger: 'blur',
            message: '请输入1-50个之内的字符'
          },
          { validator: this.verityName, trigger: 'blur' }
        ],
        manager: [
          { required: true, trigger: 'change', message: '请输入负责人信息' }
        ],
        introduce: [
          { required: true, trigger: 'blur', message: '请输入部门介绍' },
          {
            min: 1,
            max: 300,
            trigger: 'blur',
            message: '请输入1-300个之内的字符'
          }
        ],
        code: [
          { required: true, trigger: 'blur', message: '请输入部门编码' },
          {
            min: 1,
            max: 50,
            trigger: 'blur',
            message: '请输入1-50个之内的字符'
          },
          { validator: this.verityCode, trigger: 'blur' }
        ]
      }
    }
  },
  async created() {
    await this.getCompanyUsername()
  },
  methods: {
    // ^--- 验证部门名称是否重复
    async verityName(rule, value, callback) {
      const { depts: res } = await getCompanyDeparts()
      let isTrue = null
      if (this.type === 'add') {
        const arr = res.filter((item) =>
          item.pid === this.data.id ? item.name === value : false
        )
        isTrue = arr.length
      } else if (this.type === 'edit') {
        isTrue = res.filter(
          (item) => item.id !== this.data.id && item.pid === this.data.pid
        ).some(item => item.name === value)
      }
      isTrue ? callback(new Error('当前已存在该部门')) : callback()
    },
    // ^--- 验证部门编码是否重复
    async verityCode(rule, value, callback) {
      const { depts: res } = await getCompanyDeparts()
      let isTrue = null
      if (this.type === 'add') {
        const arr = res.filter((item) => item.code === value && value)
        isTrue = arr.length
      } else if (this.type === 'edit') {
        isTrue = res
          .filter((item) => item.id !== this.data.id)
          .some((item) => item.code === value)
      }
      isTrue ? callback(new Error('当前编码已被占用')) : callback()
    },
    // ^--- 判断点击的类型
    async handleCommand(command) {
      if (command === 'del') {
        this.deleteDialog = true
      } else if (command === 'add') {
        this.addEditDialog = true
        this.type = 'add'
      } else if (command === 'edit') {
        const data = await getCompanyInfo(this.data.id)
        this.form = { ...data }
        this.addEditDialog = true
        this.type = 'edit'
      }
    },
    // ^--- 删除部门
    async deleteDeparts() {
      try {
        await deleteCompanyDeparts(this.data.id)
        this.$emit('reRander')
      } catch (err) {
        this.$message.error(err)
      }
      this.deleteDialog = false
    },
    // ^--- 删除按钮弹出框
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then((_) => {
          done()
        })
        .catch((_) => {})
    },
    // ^--- 获取部门负责人
    async getCompanyUsername() {
      this.companyUsername = await getCompanyUsername()
    },
    // ^--- 新增部门/编辑部门 --- 弹出框
    async addDepartsData() {
      await this.submitForm('ruleForm')

      // *--- 判断是否为新增部门
      const data = this.getFormData()
      if (this.type === 'add') {
        const res = await addCompanyDeparts(data)
        this.id = res._id
        this.addAndEditCodeFn()
      }

      // *--- 判断是否为编辑部门
      if (this.type === 'edit') {
        await editCompanyDeparts(data)
        this.addAndEditCodeFn()
      }
    },
    // ^--- 获取表单数据
    getFormData() {
      return {
        ...this.form,
        pid: this.data.id || ''
      }
    },
    // ^--- 相同代码封装
    addAndEditCodeFn() {
      this.$emit('reRander')
      this.addEditDialog = false
    },
    // ^--- 手动校验
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log('验证成功')
        } else {
          return false
        }
      })
    },
    // ^--- 取消事件
    onCancel() {
      this.form = {
        name: '',
        manager: '',
        introduce: '',
        code: ''
      }
      this.addEditDialog = false
    }
  }
}
</script>

<style lang="scss" scoped>
// ^--- 定制样式
.tree_main {
  box-sizing: border-box;
  width: 100%;
}
.el-dropdown-link {
  cursor: pointer;
  color: #409eff;
}
.el-icon-arrow-down {
  font-size: 12px;
}
::v-deep .el-dialog__header {
  background-color: #66b1ff;
}
::v-deep .el-dialog__body {
  padding-right: 200px;
}
::v-deep .el-form-item__error {
  color: red !important;
}
</style>
