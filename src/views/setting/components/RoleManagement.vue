<template>
  <div class="role">
    <!-- 新增角色按钮 -->
    <div class="addBtn">
      <el-button type="primary" size="small">新增角色</el-button>
    </div>

    <!-- 角色表格 -->
    <el-table
      :data="tableData"
      border
      style="width: 100%"
      :stripe="true"
      :highlight-current-row="true"
      class="montherTable"
    >
      <!-- 表格序号 -->
      <el-table-column
        label="序号"
        width="100px"
        align="center"
        type="index"
        :index="indexMethod"
      />

      <el-table-column prop="name" label="角色" width="200px" align="center" />
      <el-table-column
        prop="description"
        label="描述"
        min-width
        align="center"
      />

      <!-- 面板操作 -->
      <el-table-column label="操作" min-width align="center">
        <template slot-scope="scope">
          <el-button
            type="success"
            size="small"
            @click="promissionBtn(scope.$index, scope.row)"
          >分配权限</el-button>
          <el-button
            type="primary"
            size="small"
            @click="editBtn(scope.$index, scope.row)"
          >编辑</el-button>
          <el-button
            type="danger"
            size="small"
            @click="deleteBtn(scope.$index, scope.row)"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页模块 -->
    <div class="page">
      <el-pagination layout="prev, pager, next" :total="1" />
    </div>
  </div>
</template>

<script>
import { getRole, getPermission, getRoleInfo } from '@/api/setting.js'
import getClone from '@/utils/deep-clone.js'
export default {
  props: {
    show: {
      type: Boolean
    }
  },
  data() {
    return {
      tableData: [],
      page: 1,
      pagesize: 10
    }
  },
  computed: {
    promissionShow: {
      set() {},
      get() {
        return this.show
      }
    }
  },
  created() {
    this.getRoleInfo()
  },
  methods: {
    async promissionBtn(index, row) {
      console.log(index, row)
      // ^--- 将自定义函数返回Promise.resolve,防止返回数据变为[[Promise]]数据格式
      const data = await this.getRolePermission(row.id)
      this.$emit('changeShow', !this.show, row, data)
    },
    editBtn(index, row) {
      console.log(index, row)
    },
    deleteBtn(index, row) {
      console.log(index, row)
    },
    // ^--- 展示表格序号
    indexMethod(index) {
      return index + 1
    },
    // ^--- 请求员工信息数据
    async getRoleInfo() {
      const data = {
        page: this.page,
        pagesize: this.pagesize
      }
      const res = await getRole(data)
      this.tableData = res.rows
    },
    // ^--- 获取员工权限/权限列表
    async getRolePermission(id) {
      const arr = []
      // *--- 遍历原始数据，添加一个新的属性perid作为树状控件的默认展示属性
      const res = await getPermission()
      res.forEach((item, index) => {
        item.perid = index
      })
      // *--- 将扁平数据树状化
      const base = getClone(res, '0')
      // *--- 获取权限列表
      const { permIds: info } = await getRoleInfo(id)
      // *--- 遍历权限列表，将已存在的权限记录perid至展示权限列表
      res.forEach((outer) => {
        const i = info.findIndex((inner) => inner === outer.id)
        i !== -1 ? arr.push(outer.perid) : ''
      })
      return Promise.resolve({
        arr,
        base
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.role {
  height: 100vmin;
  width: 100%;

  .addBtn {
    height: 60px;

    button {
      padding: 9px 15px;
    }
  }

  .page {
    display: flex;
    justify-content: flex-end;
    height: 60px;
  }
}
</style>
