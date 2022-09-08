<template>
  <div id="personal">
    <!-- 打印机图标 -->
    <div class="printer">
      <a href="javascript:void(0);"><i class="el-icon-printer" /></a>
    </div>
    <!-- 基本信息 -->
    <el-form
      ref="ruleForm"
      :model="ruleForm"
      status-icon
      label-width="220px"
      class="demo-ruleForm"
    >
      <!-- 员工基本信息 -->
      <div class="infoBox">
        <!-- 左侧表单 -->
        <div class="infoForm">
          <el-form-item label="工号">
            <el-input v-model="ruleForm.workNumber" />
          </el-form-item>
          <el-form-item label="姓名">
            <el-input v-model="ruleForm.username" />
          </el-form-item>
          <el-form-item label="手机号">
            <el-input v-model="ruleForm.mobile" />
          </el-form-item>
        </div>
        <!-- 右侧表单 -->
        <div class="infoForm">
          <el-form-item label="入职时间">
            <el-date-picker
              v-model="ruleForm.timeOfEntry"
              type="date"
              placeholder="请选择日期"
            />
          </el-form-item>
          <el-form-item label="部门">
            <el-input v-model="ruleForm.departmentName" />
          </el-form-item>
          <el-form-item label="聘用形式">
            <el-select v-model="ruleForm.formOfEmployment" placeholder="请选择">
              <el-option label="正式" value="1" />
              <el-option label="非正式" value="2" />
            </el-select>
          </el-form-item>
        </div>
      </div>
      <!-- 员工头像 -->
      <div>
        <el-form-item label="员工头像">
          <el-avatar v-if="staffInfo.staffPhoto" :size="150" :src="staffInfo.staffPhoto" shape="square" />
          <el-avatar v-else :size="150" :src="staffImg" shape="square" />
        </el-form-item>
      </div>
      <!-- 确认/取消按钮 -->
      <div class="btnBox">
        <el-form-item label-width="0" class="btn">
          <el-button
            type="primary"
            @click="submitForm(staffData)"
          >保存更新</el-button>
          <el-button @click="goBack">返回</el-button>
        </el-form-item>
      </div>
    </el-form>
  </div>
</template>

<script>
import { editStaffInfo } from '@/api/employees'
export default {
  props: {
    staffData: {
      type: [String, Object],
      default() {
        return {}
      }
    },
    personalData: {
      type: [String, Object],
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      ruleForm: {},
      staffInfo: {},
      staffImg: ''
    }
  },
  watch: {
    staffData() {
      this.ruleForm = this.staffData
      this.staffImg = localStorage.getItem('staffImg')
    },
    personalData() {
      this.staffInfo = this.personalData
    }
  },
  methods: {
    goBack() {
      this.$router.back()
    },
    async submitForm(data) {
      try {
        await editStaffInfo(this.$route.params.id, data)
        this.$message.success('更新成功!')
      } catch (err) {
        this.$message.warning(err)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
#personal {
  .printer {
    display: flex;
    justify-content: flex-end;
  }
  .infoBox {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .infoForm {
      flex: 1;
    }
  }
  .btnBox {
    display: flex;
    height: 40px;
    justify-content: center;
    .btn {
      width: 800px;
    }
  }
}
</style>
