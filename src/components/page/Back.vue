<template>
  <div :class="settingStore.showBreadcrumb ? 'back-wrapper-absolute' : 'back-wrapper-space'">
    <t-button theme="primary" shape="round" variant="base" @click="onBack"
      ><template #icon><t-icon name="rollback"></t-icon></template>返回</t-button
    >
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { useSettingStore, useTabsRouterStore } from '@/store';

const router = useRouter();

const settingStore = useSettingStore();

// 返回上一页
const onBack = () => {
  router.back();
};
</script>

<style lang="less" scoped>
.back-wrapper {
  &-absolute {
    position: absolute;
    right: var(--td-comp-paddingLR-xxl);
    top: var(--td-comp-paddingTB-xxl);
  }
  &-space {
    text-align: right;
    margin-bottom: 4px;
  }
}
</style>
