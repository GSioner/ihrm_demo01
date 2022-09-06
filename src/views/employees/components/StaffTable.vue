<template>
  <div id="staff">
    <el-card v-if="rander">
      <!-- 表格模块 -->
      <el-table :data="tableData" border style="width: 100%">
        <!-- 序号 -->
        <el-table-column
          align="center"
          type="index"
          label="序号"
          width="80"
          sortable
        />
        <el-table-column prop="username" label="姓名" width="160" sortable />

        <!-- 头像 -->
        <el-table-column align="center" label="头像" min-width>
          <template slot-scope="scope">
            <img
              v-if="scope.row.staffPhoto"
              v-imgerror="staffPhoto"
              :src="scope.row.staffPhoto"
              class="img"
            >
            <img v-else :src="staffPhoto" class="img">
          </template>
        </el-table-column>

        <el-table-column prop="mobile" label="手机号" min-width sortable />
        <el-table-column prop="workNumber" label="工号" min-width sortable />

        <!-- 聘用形式 -->
        <el-table-column
          prop="formOfEmployment"
          label="聘用形式"
          min-width
          sortable
          :formatter="formatFormOfEmployment"
        />

        <!-- 部门 -->
        <el-table-column
          prop="departmentName"
          label="部门"
          min-width
          sortable
        />

        <!-- 入职时间 -->
        <el-table-column
          prop="timeOfEntry"
          label="入职时间"
          min-width
          sortable
          :formatter="formatTimeOfEntry"
        />

        <!-- 状态 -->
        <el-table-column prop="enableState" label="状态" min-width sortable>
          <template slot-scope="scope">
            <el-switch v-model="scope.row.enableState" disabled />
          </template>
        </el-table-column>

        <!-- 操作面板 -->
        <el-table-column label="操作" width="280" fixed="right">
          <template slot-scope="scope">
            <el-button
              type="text"
              @click="handleClick(scope.row, 'check')"
            >查看</el-button>
            <el-button
              type="text"
              @click="handleClick(scope.row, 'regular')"
            >转正</el-button>
            <el-button
              type="text"
              @click="handleClick(scope.row, 'transfer')"
            >调岗</el-button>
            <el-button
              type="text"
              @click="handleClick(scope.row, 'leave')"
            >离职</el-button>
            <el-button
              type="text"
              @click="handleClick(scope.row, 'permission')"
            >角色</el-button>
            <el-button
              type="text"
              @click="handleClick(scope.row, 'delete')"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页模块 -->
      <div class="pageModel">
        <span class="demonstration">共 {{ page.total }} 条</span>
        <el-pagination
          layout="prev, pager, next"
          :total="page.total"
          :page-size="page.size"
          :current-page="page.page"
          @current-change="handleCurrentChange"
        />
      </div>
    </el-card>
  </div>
</template>

<script>
import enumeration from '@/api/employees/enumeration.js'
import { getStaffInfo, deleteStaffInfo } from '@/api/employees.js'
export default {
  data() {
    return {
      tableData: [],
      page: {
        page: +localStorage.getItem('page') || 1,
        size: 10,
        total: 10
      },
      staffPhoto: require('@/assets/common/head.jpg'),
      rander: true
    }
  },
  created() {
    this.getStaffInfo()
  },
  methods: {
    // ^--- 获取点击的操作类型数据
    async handleClick(row, type) {
      console.log(row, type)
      if (type === 'delete') {
        // TODO:删除数据
        try {
          await this.$confirm('确认删除该用户？')
          await deleteStaffInfo(row.id)
          this.$message.success('删除成功！')
          this.reRander()
        } catch (err) {
          this.$message.info('已取消删除')
        }
      }
    },
    // ^--- 获取员工数据列表
    async getStaffInfo() {
      const res = await getStaffInfo(this.page)
      this.page.total = res.total
      this.timeFormData(res.rows)
      this.tableData = res.rows
      const txt = `共 ${res.total} 条数据`
      this.$emit('update:txt', txt)
    },
    // ^--- 切换分页
    handleCurrentChange(num) {
      this.page.page = num
      this.getStaffInfo()
      localStorage.setItem('page', num)
    },
    // ^--- 数据格式转换
    timeFormData(arr) {
      arr.forEach((item) => {
        item.enableState = item.enableState === 1
      })
    },
    // ^---数据重渲染
    reRander() {
      this.rander = false
      setTimeout(() => (this.rander = true), 0)
    },
    // ^---聘请情况格式化
    formatFormOfEmployment(row, column, cellValue, index) {
      const data = enumeration.formOfEmployment.find(
        (item) => item.id === cellValue
      )
      return data ? data.name : '未知'
    },
    // ^---时间格式转换
    formatTimeOfEntry(row, column, cellValue, index) {
      return enumeration.timeOfEntry(cellValue)
    }
  }
}
</script>

<style lang="scss" scoped>
#staff {
  margin-top: 15px;
}

.pageModel {
  margin-top: 15px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

.img {
  width: 110px;
  height: 110px;
}
</style>
