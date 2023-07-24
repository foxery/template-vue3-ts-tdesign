<template>
  <div class="result-success">
    <t-icon class="result-success-icon" name="home" />
    <div class="result-success-title">欢迎，这里是后台管理</div>
    <div class="result-success-describe">点击左侧菜单进行操作</div>
  </div>
</template>
<script lang="ts">
export default {
  name: 'Welcome',
};
</script>
<style lang="less" scoped>
.result-success {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 75vh;

  &-icon {
    font-size: 64px;
    color: var(--td-success-color);
  }

  &-title {
    margin-top: 16px;
    font-size: 20px;
    color: var(--td-text-color-primary);
    text-align: center;
    line-height: 22px;
    font-weight: 500;
  }

  &-describe {
    margin: 8px 0 32px;
    font-size: 14px;
    color: var(--td-text-color-primary);
    line-height: 22px;
  }
}
</style>
