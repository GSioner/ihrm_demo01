<template>
  <div class="setting">
    <!-- 顶部标签栏 -->
    <div class="topBar">
      <el-tabs v-model="activeName">
        <el-tab-pane label="角色管理" name="first">
          <RoleManagement :show="promissionShow" @changeShow="changeShow" />
        </el-tab-pane>
        <el-tab-pane label="公司信息" name="second">
          <CompanyInfo />
        </el-tab-pane>
      </el-tabs>
    </div>

    <!-- 权限弹窗 -->
    <PromissionDialog
      :show="promissionShow"
      :row-data="rowData"
      :permission-list="permissionList"
      @changeShow="changeShow"
    />
  </div>
</template>
<script>
import RoleManagement from './components/RoleManagement.vue'
import CompanyInfo from './components/CompanyInfo.vue'
import PromissionDialog from './components/PromissionDialog.vue'
export default {
  components: {
    RoleManagement,
    CompanyInfo,
    PromissionDialog
  },
  data() {
    return {
      activeName: 'first',
      promissionShow: false,
      rowData: '',
      permissionList: []
    }
  },
  methods: {
    changeShow(bool, data, list) {
      this.promissionShow = bool
      data ? (this.rowData = data) : ''
      this.permissionList = list
    }
  }
}
</script>

<style lang="scss" scoped>
.setting {
  padding: 20px;
}
</style>
