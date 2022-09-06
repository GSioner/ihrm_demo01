<template>
  <el-dialog title="收货地址" :visible.sync="dialogFormVisible">
    <el-form ref="formData" :model="form" label-width="120px" :rules="rules">
      <!-- 姓名 -->
      <el-form-item label="姓名" prop="username">
        <el-input
          v-model="form.username"
          class="input"
          placeholder="请输入姓名"
        />
      </el-form-item>

      <!-- 手机号 -->
      <el-form-item label="手机号" prop="mobile">
        <el-input
          v-model="form.mobile"
          class="input"
          placeholder="请输入手机号"
        />
      </el-form-item>

      <!-- 入职时间 -->
      <el-form-item label="入职时间" prop="timeOfEntry">
        <el-date-picker
          v-model="form.timeOfEntry"
          type="date"
          placeholder="请选择入职时间"
        />
      </el-form-item>

      <!-- 聘用形式 -->
      <el-form-item label="聘用形式" prop="formOfEmployment">
        <el-select v-model="form.formOfEmployment" placeholder="请选择聘用形式">
          <el-option label="正式" value="1" />
          <el-option label="非正式" value="2" />
        </el-select>
      </el-form-item>

      <!-- 工号 -->
      <el-form-item label="工号" prop="workNumber">
        <el-input
          v-model="form.workNumber"
          class="input"
          placeholder="请输入工号"
        />
      </el-form-item>

      <!-- 部门 -->
      <el-form-item label="部门" prop="departmentName">
        <el-input
          v-model="form.departmentName"
          class="input"
          placeholder="请选择部门"
        />
      </el-form-item>

      <!-- 转正时间 -->
      <el-form-item label="转正时间">
        <el-date-picker
          v-model="form.correctionTime"
          type="date"
          placeholder="请选择转正时间"
        />
      </el-form-item>
    </el-form>

    <!-- 确定/取消按钮 -->
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="changeShow(1)">确 定</el-button>
      <el-button @click="changeShow(0)">取 消</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { addNewStaffInfo } from '@/api/employees.js'
import dayjs from 'dayjs'
export default {
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      dialogFormVisible: false,
      form: {
        username: '',
        mobile: '',
        formOfEmployment: '',
        workNumber: '',
        departmentName: '',
        timeOfEntry: '',
        correctionTime: ''
      },
      rules: {
        username: [
          { required: true, trigger: 'blur', message: '请输入姓名' },
          { min: 1, max: 4, trigger: 'blur', message: '请输入1-4个字符' }
        ],
        mobile: [
          { required: true, trigger: 'blur', message: '请输入手机号' },
          {
            pattern: /^1[3-9]\d{9}$/,
            trigger: 'blur',
            message: '请输入正确的手机号格式'
          }
        ],
        formOfEmployment: [
          { required: true, trigger: 'blur', message: '请选择聘用形式' }
        ],
        workNumber: [
          { required: true, trigger: 'blur', message: '请输入工号' }
        ],
        departmentName: [
          { required: true, trigger: 'blur', message: '请输入部门名称' }
        ],
        timeOfEntry: [
          { required: true, trigger: 'blur', message: '请输入入职时间' }
        ]
      }
    }
  },
  watch: {
    show() {
      this.dialogFormVisible = this.show
    }
  },
  methods: {
    // ^---判断是确定按钮还是取消按钮
    changeShow(bool) {
      if (bool) {
        this.$refs['formData'].validate(async(isOk) => {
          if (isOk) {
            this.editData(this.form) // TODO:form数据格式规范修正
            await addNewStaffInfo(this.form) // TODO:发送请求
            this.$emit('changeAddStaffShow', false)
            this.$message.success('员工新增成功')
          } else {
            return false
          }
        })
      } else {
        this.$emit('changeAddStaffShow', false)
      }
    },
    // ^---编译数据为请求规范格式数据
    editData(data) {
      // TODO:转换日期为'YYYY-MM-DD'格式
      data.correctionTime = dayjs(data.correctionTime).form(
        'YYYY-MM-DD'
      )
      data.timeOfEntry = dayjs(data.timeOfEntry).form('YYYY-MM-DD')
      // TODO:转换字符串为数字类型
      data.formOfEmployment = +data.formOfEmployment
      data.mobile = +data.mobile
      data.workNumber = +data.workNumber
    }
  }
}
</script>

<style lang="scss" scoped>
.input {
  width: 400px;
}
::v-deep .el-select .el-input__inner {
  width: 400px;
}
::v-deep .el-form-item__error {
  color: red !important;
}
</style>
