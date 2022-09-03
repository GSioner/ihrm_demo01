<template>
  <div class="company">
    <!-- 顶部提示栏 -->
    <div class="top">
      <el-alert :title="txt" type="info" show-icon />
    </div>

    <!-- 公司信息 -->
    <div class="text">
      <el-form ref="form" :model="form" label-width="120px">
        <el-form-item label="公司名称">
          <el-input v-model="form.name" :disabled="true" class="length" />
        </el-form-item>
        <el-form-item label="公司地址">
          <el-input v-model="form.companyAddress" :disabled="true" class="length" />
        </el-form-item>
        <el-form-item label="公司邮箱">
          <el-input v-model="form.mailbox" :disabled="true" class="length" />
        </el-form-item>
        <el-form-item label="备注">
          <el-input
            v-model="form.remarks"
            :disabled="true"
            class="length"
            type="textarea"
            maxlength="300"
            rows="4"
          />
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { getCompanyInfoSetting } from '@/api/setting.js'
export default {
  data() {
    return {
      txt: '对公司名称、公司地址、营业执照、公司地区的更新，将使得公司资料被重新审核，请谨慎修改',
      form: {
        name: '',
        companyAddress: '',
        mailbox: '',
        remarks: ''
      }
    }
  },
  created() {
    this.getCompanyInfo()
  },
  methods: {
    async getCompanyInfo() {
      const res = await getCompanyInfoSetting()
      this.form = res[0]
    }
  }
}
</script>

<style lang="scss" scoped>
.text {
  margin-top: 50px;
}
.length {
  width: 400px;
}
</style>
