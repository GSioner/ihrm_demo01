<template>
  <el-card id="card" :body-style="{ height: '80px' }">
    <div id="card-main">
      <div>
        <slot name="title">
          <el-alert
            id="info"
            :title="txt"
            type="info"
            show-icon
            :closable="false"
          />
        </slot>
      </div>
      <div>
        <slot name="button">
          <el-button type="primary" size="mini">主要按钮</el-button>
        </slot>
      </div>
    </div>
  </el-card>
</template>

<script>
export default {
  props: {
    txt: {
      type: String,
      default: '消息提示'
    }
  }
}
</script>

<style lang="scss" scoped>
$info-border-color: #91d5ff;
$info-background-color: #e6f7ff;
$info-icon-color: #409eff;
$info-font-color: black;
$info-font-size: 16px;

#card-main {
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

#info ::v-deep {
  background-color: $info-background-color;
  border: 1px solid $info-border-color;
  color: $info-font-color;

  .el-alert__icon {
    color: $info-icon-color;
  }
  .el-alert__title {
    font-size: $info-font-size;
  }
}
</style>
