<template>
  <el-card v-if="tags.length" id="tag">
    <el-tag
      v-for="tag in tags"
      :key="tag.name"
      closable
      :type="tag.type"
      size="small"
      effect="dark"
      :class="{ active: tag.name === tagName }"
      @click="handlerClick(tag)"
      @close="handleClose(tag)"
    >
      {{ tag.name }}
    </el-tag>
  </el-card>
</template>

<script>
export default {
  data() {
    return {
      tags: [],
      tagName: '',
      show: true,
      pathList: []
    }
  },
  computed: {
    path: {
      set() {},
      get() {
        return this.$route.path
      }
    }
  },
  watch: {
    // ^---切换路由更新数据
    path: {
      deep: true,
      immediate: true,
      handler() {
        const path = this.path
        let i = this.tags.findIndex((item) => item.path === path)
        if (i === -1) {
          this.tags = [...this.tags, ...this.editData(path)]
          i = this.tags.findIndex((item) => item.path === path)
        }
        this.tagName = this.tags[i].name
      }
    }
  },
  created() {
    this.tags = this.editData(this.$route.path)
    this.tags.forEach((item) => {
      if (item.path === this.path) this.tagName = item.name
    })
  },
  methods: {
    // ^---编译数据,方便后续使用
    editData(path) {
      const arr = []
      let name = null
      switch (path) {
        case '/dashboard':
          name = '首页'
          break
        case '/approvals':
          name = '审批'
          break
        case '/attendances':
          name = '考勤'
          break
        case '/departments':
          name = '组织架构'
          break
        case '/employees':
          name = '员工管理'
          break
        case '/permission':
          name = '权限管理'
          break
        case '/salarys':
          name = '工资'
          break
        case '/setting':
          name = '公司设置'
          break
        case '/social':
          name = '社保'
          break
      }
      arr.push({ name, path })
      return arr
    },
    // ^---获取点击tag数据
    handlerClick(data) {
      this.tagName = data.name
      this.$router.push(data.path)
    },
    // ^---关闭tag
    handleClose(tag) {
      this.tags.splice(this.tags.indexOf(tag), 1)
    }
  }
}
</script>

<style lang="scss" scoped>
$text-color: #495060;
$background-color: #fff;
$border-color: #d8dce5;

::v-deep .el-tag {
  margin: 0 2px;
  border-radius: 0;
  border: 1px solid $border-color;
  background-color: $background-color;
  color: $text-color;
}
::v-deep .el-card__body {
  padding: 2px 10px;
}
::v-deep .el-tag--dark .el-tag__close {
  color: $text-color;
}
.active {
  background-color: #409eff;
  color: #fff;

  &:before {
    content: '';
    display: inline-block;
    height: 8px;
    width: 8px;
    border-radius: 50%;
    background-color: #fff;
    position: realtive;
    margin-left: 2px;
  }
}
</style>
