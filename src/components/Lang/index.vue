<template>
  <div>
    <el-dropdown @command="changeLanguage">
      <div>
        <svg-icon icon-class="language" style="color: #fff; font-size: 20px" />
      </div>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item
          command="zh"
          :class="{ highlight: type === 'zh' }"
          :disabled="type === 'zh'"
        >中文</el-dropdown-item>
        <el-dropdown-item
          command="en"
          :class="{ highlight: type === 'en' }"
          :disabled="type === 'en'"
        >English</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
import Cookie from 'js-cookie'
export default {
  data() {
    return {
      type: 'zh'
    }
  },
  methods: {
    changeLanguage(type) {
      Cookie.set('language', type)
      this.$i18n.locale = type
      this.type = type
      this.$message.success('语言切换成功!')
    }
  }
}
</script>

<style lang="scss" scoped>
.highlight {
  color: lightcoral;
}
</style>
