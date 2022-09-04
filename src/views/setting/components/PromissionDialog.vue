<template>
  <div>
    <!-- 权限弹窗 -->
    <el-dialog title="分配权限" :visible.sync="promissionShow">
      <!-- 权限树 -->
      <el-tree
        :data="perList"
        show-checkbox
        node-key="perid"
        :props="defaultProps"
        :default-expand-all="true"
        :default-checked-keys="showList"
        @check-change="handleNodeClick"
      />

      <!-- 确认按钮 -->
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="changeShow(1)">确 定</el-button>
        <el-button @click="changeShow(0)">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { setRolePermission, getRoleInfo } from '@/api/setting.js'
export default {
  props: {
    show: {
      type: Boolean,
      default: false
    },
    permissionList: {
      type: [Array, Object],
      default() {
        return {}
      }
    },
    rowData: {
      type: [Object, String],
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      perList: [],
      defaultProps: {
        children: 'children',
        label: 'name'
      },
      showList: [],
      showDialog: true,
      id: '',
      realPermission: []
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
  watch: {
    // ^--- 监听dialog组件显隐触发数据铺设
    promissionShow() {
      this.randerData()
    }
  },
  methods: {
    // ^--- 切换dialog显隐
    changeShow(bool) {
      if (bool) {
        this.sendRolePermission()
      }
      this.$emit('changeShow', !this.show)
    },
    // ^--- 监听点击权限项
    async handleNodeClick({ id }) {
      // *--- 验证当前权限列表是否存在该id权限
      const i = this.realPermission.findIndex((item) => {
        return item === id
      })
      if (i === -1) {
        this.realPermission.push(id)
      } else {
        this.realPermission.splice(i, 1)
      }
    },
    // ^--- 权限数据铺设dialog模块
    async randerData() {
      this.perList = this.permissionList.base
      this.showList = this.permissionList.arr
      this.id = this.rowData.id
      const { permIds: info } = await getRoleInfo(this.id)
      this.realPermission = info
    },
    // ^--- 提交权限修改
    async sendRolePermission() {
      const data = {
        id: this.id,
        permIds: this.realPermission
      }
      await setRolePermission(data)
      this.$message.success('权限修改成功')
    },
    // ^---数据清理
    clearData(arr) {
      arr.forEach((item) => {
        const i = arr.findIndex((item) => typeof item === 'number')
        if (i !== -1) {
          arr.splice(i, 1)
        }
      })
    }
  }
}
</script>

<style></style>
