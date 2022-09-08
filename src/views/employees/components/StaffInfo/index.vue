<template>
  <div id="staffInfo">
    <el-card>
      <el-tabs v-model="activeName">
        <!-- 登陆账户设置 -->
        <el-tab-pane label="登陆账户设置" name="first">
          <el-form
            ref="ruleForm"
            :model="ruleForm"
            status-icon
            :rules="rules"
            label-width="100px"
            class="demo-ruleForm"
          >
            <el-form-item label="姓名" prop="username">
              <el-input v-model="ruleForm.username" type="info" />
            </el-form-item>
            <el-form-item label="密码" prop="password">
              <el-input v-model="ruleForm.password" type="password" />
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitForm">更新</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>

        <el-tab-pane label="个人详情" name="second">
          <PersonalInfo :staff-data="ruleForm" :personal-data="pesonalData" />
        </el-tab-pane>
        <el-tab-pane label="岗位信息" name="third">岗位信息</el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>
<script>
import PersonalInfo from './PersonalInfomation.vue'
import {
  getStaffInfomation,
  editStaffInfo,
  getStaffPersonalInfo
} from '@/api/employees'
export default {
  components: {
    PersonalInfo
  },
  data() {
    return {
      activeName: 'first',
      ruleForm: {
        username: '',
        password: ''
      },
      rules: {
        username: [
          { required: true, triggrt: 'blur', message: '请输入员工姓名' },
          { min: 1, max: 12, triggrt: 'blur', message: '请输入1-12个字符' }
        ],
        password: [
          { required: true, triggrt: 'blur', message: '请输入员工密码' },
          { min: 6, max: 36, triggrt: 'blur', message: '请输入6-36个字符' }
        ]
      },
      pesonalData: ''
    }
  },
  computed: {},
  watch: {},
  async created() {
    this.ruleForm = await getStaffInfomation(this.$route.params.id)
    this.pesonalData = await getStaffPersonalInfo(this.$route.params.id)
  },
  methods: {
    async submitForm() {
      try {
        await editStaffInfo(this.$route.params.id, this.ruleForm)
        this.$message.success('更新成功!')
      } catch (err) {
        this.$message.warning(err)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
#staffInfo {
  padding: 20px;
}
::v-deep .el-input__inner {
  width: 300px;
}
.demo-ruleForm {
  margin-top: 30px;
  margin-left: 120px;
}
::v-deep .el-form-item__error {
  color: red;
}
</style>
