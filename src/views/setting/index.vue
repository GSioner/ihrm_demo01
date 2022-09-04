<template>
  <div class="setting">
    <!-- 顶部标签栏 -->
    <div class="topBar">
      <el-tabs v-model="activeName">
        <el-tab-pane v-if="rander" label="角色管理" name="first">
          <RoleManagement
            :show="promissionShow"
            :role-show="roleShow"
            @changeShow="changeShow"
            @sendRoleInfo="sendRoleInfo"
            @reRander="reRander"
          />
        </el-tab-pane>
        <el-tab-pane label="公司信息" name="second">
          <CompanyInfo />
        </el-tab-pane>
      </el-tabs>
    </div>

    <!-- 权限分配弹窗 -->
    <PromissionDialog
      :show="promissionShow"
      :row-data="rowData"
      :permission-list="permissionList"
      @changeShow="changeShow"
    />

    <!-- 编辑角色弹窗 -->
    <EditRoleInfo
      :role-data="rowData"
      :show="roleShow"
      @changeRoleShow="changeRoleShow"
      @reRander="reRander"
    />
  </div>
</template>
<script>
import RoleManagement from './components/RoleManagement.vue'
import CompanyInfo from './components/CompanyInfo.vue'
import PromissionDialog from './components/PromissionDialog.vue'
import EditRoleInfo from './components/EditRoleInfo.vue'
export default {
  components: {
    RoleManagement,
    CompanyInfo,
    PromissionDialog,
    EditRoleInfo
  },
  data() {
    return {
      activeName: 'first',
      promissionShow: false,
      rowData: '',
      permissionList: [],
      roleShow: false,
      rander: true
    }
  },
  methods: {
    changeShow(bool, data, list) {
      this.promissionShow = bool
      data ? (this.rowData = data) : ''
      this.permissionList = list
    },
    sendRoleInfo(bool, data) {
      this.roleShow = bool
      this.rowData = data
    },
    changeRoleShow(bool) {
      this.roleShow = bool
    },
    reRander() {
      this.rander = false
      setTimeout(() => {
        this.rander = true
      }, 0)
    }
  }
}
</script>

<style lang="scss" scoped>
.setting {
  padding: 20px;
}
</style>
