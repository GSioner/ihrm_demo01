<template>
  <el-dialog title="收货地址" :visible.sync="dialogFormVisible">
    <el-form :model="form" label-width="120px">
      <!-- 姓名 -->
      <el-form-item label="姓名">
        <el-input
          v-model="form.username"
          class="input"
          placeholder="请输入姓名"
        />
      </el-form-item>

      <!-- 手机号 -->
      <el-form-item label="手机号">
        <el-input
          v-model="form.mobile"
          class="input"
          placeholder="请输入手机号"
        />
      </el-form-item>

      <!-- 入职时间 -->
      <el-form-item label="入职时间">
        <el-date-picker
          v-model="form.timeOfEntry"
          type="date"
          placeholder="请选择入职时间"
        />
      </el-form-item>

      <!-- 聘用形式 -->
      <el-form-item label="聘用形式">
        <el-select v-model="form.formOfEmployment" placeholder="请选择聘用形式">
          <el-option label="正式" value="1" />
          <el-option label="非正式" value="2" />
        </el-select>
      </el-form-item>

      <!-- 工号 -->
      <el-form-item label="工号">
        <el-input
          v-model="form.workNumber"
          class="input"
          placeholder="请输入工号"
        />
      </el-form-item>

      <!-- 部门 -->
      <el-form-item label="部门">
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
      <el-button type="primary" @click="changeShow">确 定</el-button>
      <el-button @click="changeShow">取 消</el-button>
    </div>
  </el-dialog>
</template>

<script>
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
      }
    }
  },
  watch: {
    show() {
      this.dialogFormVisible = this.show
    }
  },
  methods: {
    changeShow() {
      this.$emit('changeAddStaffShow', false)
    }
  }
}
</script>

<style lang="scss" scoped>
.input {
  width: 400px;
}
::v-deep .el-select .el-input__inner{
  width: 400px;
}
</style>
