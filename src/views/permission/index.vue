<template>
  <div class="dashboard-container">
    <div class="app-container">
      <!-- 顶部工具栏 -->
      <ToolsBar :right-txt="'添加权限'" @rightClick="addPermission">
        <span slot="title" />
      </ToolsBar>

      <!-- 权限表格 -->
      <el-card style="margin-top: 10px">
        <el-table
          v-if="rander"
          :data="permisForm"
          style="width: 100%"
          highlight-current-row
          border
          row-key="id"
          :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
        >
          <el-table-column prop="name" label="名称" />
          <el-table-column align="center" prop="code" label="标识" />
          <el-table-column align="center" prop="description" label="描述" />
          <el-table-column align="center" label="操作" fixed="right">
            <template slot-scope="{ row }">
              <div v-if="row.pid === '0'">
                <OperationModel
                  v-for="(k, i) in btnName"
                  :key="i"
                  :data="row"
                  :btn-data="k"
                  @activeEdit="activeEdit"
                  @activeAdd="activeAdd"
                  @reRander="reRander"
                />
              </div>
              <div v-else>
                <OperationModel
                  v-for="(k, i) in btnNameNoAdd"
                  :key="i"
                  :data="row"
                  :btn-data="k"
                  @activeEdit="activeEdit"
                  @activeAdd="activeAdd"
                  @reRander="reRander"
                />
              </div>
            </template>
          </el-table-column>
        </el-table>
      </el-card>
    </div>

    <!-- 权限弹窗 -->
    <PermissionDialog
      :data="detailInfo"
      :type="type"
      :show.sync="show"
      :permission="permission"
      :pid="pid"
      @reRander="reRander"
    />
  </div>
</template>

<script>
import { getAllPermission, getPermissionInfo } from '@/api/permission'
import getClone from '@/utils/deep-clone'
import OperationModel from './components/OperationModel.vue'
import { operation, operationNoAdd } from './components/enumeration.js'
import PermissionDialog from './components/PermissionDialog.vue'
export default {
  components: {
    OperationModel,
    PermissionDialog
  },
  data() {
    return {
      permisForm: [],
      btnName: operation,
      btnNameNoAdd: operationNoAdd,
      detailInfo: {},
      type: '',
      show: false,
      permission: [],
      pid: '',
      rander: true
    }
  },
  created() {
    this.getAllPermission()
  },
  methods: {
    addPermission() {
      this.activeAdd()
      this.pid = '0'
    },
    // ^--- 获取权限点列表
    async getAllPermission() {
      const res = await getAllPermission()
      this.permisForm = getClone(res, '0')
    },
    // ^--- 执行编辑按钮
    async activeEdit(id) {
      this.detailInfo = await getPermissionInfo(id)
      this.permission = await getAllPermission()
      this.detailInfo.enVisible = !!this.detailInfo.enVisible
      this.show = true
      this.type = 'edit'
    },
    // ^--- 执行添加按钮
    async activeAdd(id) {
      if (id) {
        const res = await getPermissionInfo(id)
        this.pid = res.id
      }
      this.show = true
      this.type = 'add'
    },
    // ^--- 重渲染
    reRander() {
      this.rander = false
      this.getAllPermission()
      setTimeout(() => (this.rander = true), 0)
    }
  }
}
</script>

<style lang="sass" scoped></style>
