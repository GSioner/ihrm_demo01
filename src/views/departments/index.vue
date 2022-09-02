<template>
  <div v-loading="loading" class="dashboard-container">
    <div class="app-container">
      <!-- ↓组织架构头部内容↓ -->
      <el-card style="padding: 30px 140px">
        <!-- 公司名称组件 -->
        <CompanyTree :data="company" />

        <!-- 部门树结构 -->
        <el-tree
          v-if="rander"
          :data="departsList"
          :props="defaultProps"
          :default-expand-all="true"
          :expand-on-click-node="false"
        >
          <company-tree
            slot-scope="{ data }"
            class="custom-tree-node"
            :data="data"
            @reRander="reRander"
          />
        </el-tree>
      </el-card>
      <!-- ↑组织架构头部内容↑ -->
    </div>
  </div>
</template>

<script>
import CompanyTree from './components/CompanyTree.vue'
import { getCompanyDeparts } from '@/api/company.js'
import getClone from '@/utils/deep-clone.js'
export default {
  components: {
    CompanyTree
  },
  data() {
    return {
      company: {},
      msg: '',
      rander: true,
      departsList: [],
      defaultProps: {
        label: 'name',
        children: 'children'
      },
      loading: false
    }
  },
  async created() {
    await this.getDepartsData()
  },
  methods: {
    // ^--- 编译组织树状结构
    async getDepartsData() {
      const res = await getCompanyDeparts()
      console.log('res: ', res)
      this.company = {
        name: res.companyName,
        manager: '负责人',
        isHost: true,
        icon: 'chart',
        pid: '',
        id: ''
      }
      this.departsList = getClone(res.depts, '')
    },
    // ^--- 重渲染
    async reRander() {
      console.log('数据刷新中')
      this.loading = true
      await this.getDepartsData()
      this.rander = false
      setTimeout(() => {
        this.rander = true
      }, 0)
      this.loading = false
    }
  }
}
</script>

<style lang="scss" scoped>
.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
}
</style>
