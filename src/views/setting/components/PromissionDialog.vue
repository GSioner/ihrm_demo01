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
        <el-button type="primary" @click="changeShow">确 定</el-button>
        <el-button @click="changeShow">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
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
      showDialog: true
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
    promissionShow() {
      this.randerData()
      console.log('showList', this.showList)
      console.log('perList', this.perList)
    }
  },
  methods: {
    changeShow() {
      this.$emit('changeShow', !this.show)
    },
    handleNodeClick(data) {
      console.log('data', data)
    },
    randerData() {
      this.perList = this.permissionList.base
      this.showList = this.permissionList.arr
    }
  }
}
</script>

<style></style>
