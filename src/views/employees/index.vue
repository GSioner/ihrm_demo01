<template>
  <div class="dashboard-container">
    <div class="app-container">
      <!-- 顶部工具栏 -->
      <ToolsBar :txt="txt">
        <template #button>
          <el-button size="mini" type="danger">普通excel导出</el-button>
          <el-button size="mini" type="info">复杂表头excel导出</el-button>
          <el-button size="mini" type="success">excel导入</el-button>
          <el-button
            size="mini"
            type="primary"
            @click="addStaff"
          >新增员工</el-button>
        </template>
      </ToolsBar>
      <StaffTable :txt.sync="txt" />
    </div>

    <!-- 新增员工弹窗 -->
    <AddStaff :show="addStaffShow" @changeAddStaffShow="changeAddStaffShow" />
  </div>
</template>

<script>
import StaffTable from './components/StaffTable.vue'
import AddStaff from './components/AddStaff.vue'
export default {
  components: {
    StaffTable,
    AddStaff
  },
  data() {
    return {
      txt: '暂无数据',
      addStaffShow: false
    }
  },
  methods: {
    addStaff() {
      this.addStaffShow = true
    },
    changeAddStaffShow(bool) {
      this.addStaffShow = bool
    }
  }
}
</script>

<style lang="scss" scoped>
.el-button--mini,
.el-button--mini.is-round ::v-deep {
  padding: 9px 15px;
}
</style>
