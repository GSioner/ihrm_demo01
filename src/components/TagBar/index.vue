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
      {{ $t('route.' + tag.name) }}
    </el-tag>
  </el-card>
</template>

<script>
import RouterMarkDown from './RouterMarkDown.js'
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
        if (i !== -1) this.tagName = this.tags[i].name
      }
    }
  },
  created() {
    this.tags = this.editData(this.$route.path)
    this.tags.forEach((item) => {
      if (item.path === this.$route.path) this.tagName = item.name
    })
  },
  methods: {
    // ^---编译数据,方便后续使用
    editData(path) {
      return RouterMarkDown.filter((item) => item.path === path)
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
::v-deep .el-tag {
  margin: 0 2px;
  border-radius: 0;
  border: 1px solid #d8dce5;
  background-color: #fff;
  color: #495060;
}
::v-deep .el-card__body {
  padding: 2px 10px;
}
::v-deep .el-tag--dark .el-tag__close {
  color: #495060;
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
