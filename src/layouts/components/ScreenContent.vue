<template>
  <router-view v-if="!isRefreshing" v-slot="{ Component }">
    <component :is="Component" />
  </router-view>
  <frame-page />
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useTabsRouterStore } from '@/store';
import FramePage from '@/layouts/frame/index.vue';

const isRefreshing = computed(() => {
  const tabsRouterStore = useTabsRouterStore();
  const { refreshing } = tabsRouterStore;
  return refreshing;
});
</script>
<style lang="less" scoped>
.fade-leave-active,
.fade-enter-active {
  transition: opacity @anim-duration-slow @anim-time-fn-easing;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
