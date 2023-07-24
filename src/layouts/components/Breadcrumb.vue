<template>
  <t-breadcrumb :max-item-width="'150'">
    <t-breadcrumbItem v-for="item in crumbs" :key="item.path" :to="item.path" :router="router">
      {{ item.meta?.title ?? '当前' }}
    </t-breadcrumbItem>
  </t-breadcrumb>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import router from '@/router';

const crumbs = computed(() => {
  const route = useRoute();
  const pathArray = route.matched;

  const breadcrumbs = [];
  pathArray.map((path, idx) => {
    // 如果路由下有hiddenBreadcrumb则隐藏
    if (path.meta?.hiddenBreadcrumb) {
      return;
    }
    if (path.name === route.name) {
      path.path = route.fullPath;
    }
    breadcrumbs.push(path);
  });
  return breadcrumbs;
});
</script>
<style scoped></style>
