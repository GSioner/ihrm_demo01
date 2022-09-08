<template>
  <div class="dashboard-container">
    <div class="app-container">
      <!-- 顶部工具栏 -->
      <ToolsBar :txt="txt">
        <template #button>
          <el-button
            size="mini"
            type="danger"
            @click="jsonToExcel"
          >普通excel导出</el-button>
          <el-button size="mini" type="info">复杂表头excel导出</el-button>
          <el-button
            size="mini"
            type="success"
            @click="toImport"
          >excel导入</el-button>
          <el-button
            size="mini"
            type="primary"
            @click="addStaff"
          >新增员工</el-button>
        </template>
      </ToolsBar>
      <StaffTable :txt.sync="txt" :table-data.sync="tableData" />
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
      addStaffShow: false,
      tableData: []
    }
  },
  methods: {
    // ^---新增员工
    addStaff() {
      this.addStaffShow = true
    },
    // ^---新增员工显隐
    changeAddStaffShow(bool) {
      this.addStaffShow = bool
    },
    // ^---跳转至上传模块
    toImport() {
      this.$router.push('/import')
    },
    // ^---Excel导出
    jsonToExcel() {
      const staffInfo = {
        username: '姓名',
        id: '员工ID',
        mobile: '手机号',
        password: '密码',
        enableState: '账户状态',
        timeOfEntry: '入职日期',
        formOfEmployment: '聘用形式',
        workNumber: '工号',
        correctionTime: '转正日期',
        staffPhoto: '头像',
        departmentName: '部门'
      }
      const data = {} // 准备主数据变量
      data.filename = '员工信息表' // 导出文件名
      data.multiHeader = [['姓名', '主要信息', '', '', '', '', '', '', '', '', '部门']] // 复杂表头
      data.merges = ['A1:A2', 'B1:J1', 'K1:K2'] // 合并表头
      // TODO:转录英文表头为中文
      data.header = Object.values(staffInfo)
      // TODO:利用map将data数据转录为[[], []]的规定格式
      data.data = this.tableData.map((item) => {
        // TODO:转录账户状态为可读数据
        item['enableState'] = item['enableState'] ? '激活' : '未激活'
        // TODO:转录聘用形式为可读数据
        if (+item['formOfEmployment'] === 1) {
          item['formOfEmployment'] = '正式'
        } else if (+item['formOfEmployment'] === 2) {
          item['formOfEmployment'] = '非正式'
        }
        // TODO:获取data数据内的每一个员工数据
        return Object.keys(staffInfo).map((k) => item[k])
      })
      // TODO:导出Excel
      import('@/vendor/Export2Excel').then((excel) => excel.export_json_to_excel(data))
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
