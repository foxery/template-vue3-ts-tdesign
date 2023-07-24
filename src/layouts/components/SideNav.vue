<template>
  <div :class="sideNavCls" class="my-sidenav">
    <t-menu :class="menuCls" :theme="theme" :value="active" :collapsed="collapsed" :default-expanded="defaultExpanded">
      <template #logo>
        <span v-if="showLogo" :class="`${prefix}-side-nav-logo-wrapper`" @click="handleRouter('/')">
          <component :is="getLogo()" :class="`${prefix}-side-nav-logo-${collapsed ? 't' : 'tdesign'}-logo`" />
        </span>
      </template>
      <menu-content :nav-data="menu" />
    </t-menu>
    <div :class="`${prefix}-side-nav-placeholder${collapsed ? '-hidden' : ''}`"></div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue';
import type { PropType } from 'vue';
import { useRouter } from 'vue-router';
import union from 'lodash/union';

import { useSettingStore } from '@/store';
import { prefix } from '@/config/global';
import pgk from '../../../package.json';
import type { MenuRoute } from '@/types/interface';
import { getActive, getRoutesExpanded } from '@/router';

import MenuContent from './MenuContent.vue';

import AssetLogoFull from '@/assets/assets-logo-full.svg?component';
import AssetLogo from '@/assets/assets-t-logo.svg?component';

const MIN_POINT = 992 - 1;

const props = defineProps({
  menu: {
    type: Array as PropType<MenuRoute[]>,
    default: () => [],
  },
  showLogo: {
    type: Boolean as PropType<boolean>,
    default: true,
  },
  isFixed: {
    type: Boolean as PropType<boolean>,
    default: true,
  },
  layout: {
    type: String as PropType<string>,
    default: '',
  },
  headerHeight: {
    type: String as PropType<string>,
    default: '64px',
  },
  theme: {
    type: String as PropType<'light' | 'dark'>,
    default: 'light',
  },
  isCompact: {
    type: Boolean as PropType<boolean>,
    default: false,
  },
});

const collapsed = computed(() => useSettingStore().isSidebarCompact);

const active = computed(() => getActive());

const defaultExpanded = computed(() => {
  const path = getActive();
  const parentPath = path.substring(0, path.lastIndexOf('/'));
  const expanded = getRoutesExpanded();
  return union(expanded, parentPath === '' ? [] : [parentPath]);
});

const sideNavCls = computed(() => {
  const { isCompact } = props;
  return [
    `${prefix}-sidebar-layout`,
    {
      [`${prefix}-sidebar-compact`]: isCompact,
    },
  ];
});

const menuCls = computed(() => {
  const { showLogo, isFixed, layout } = props;
  return [
    `${prefix}-side-nav`,
    {
      [`${prefix}-side-nav-no-logo`]: !showLogo,
      [`${prefix}-side-nav-no-fixed`]: !isFixed,
      [`${prefix}-side-nav-mix-fixed`]: layout === 'mix' && isFixed,
    },
  ];
});

const router = useRouter();
const settingStore = useSettingStore();

const autoCollapsed = () => {
  const isCompact = window.innerWidth <= MIN_POINT;
  settingStore.updateConfig({
    isSidebarCompact: isCompact,
  });
};

onMounted(() => {
  autoCollapsed();
  window.onresize = () => {
    autoCollapsed();
  };
});

const handleRouter = (url) => {
  router.push(url);
};

const getLogo = () => {
  if (collapsed.value) return AssetLogo;
  return AssetLogoFull;
};
</script>

<style lang="less" scoped>
.my-sidenav {
  :deep(.t-default-menu) {
    background-color: #242424;
    color: #fff;
    .t-default-menu__inner .t-menu__logo:not(:empty) {
      border-bottom-color: #383838;
    }
  }
  :deep(.t-menu__item) {
    color: rgba(255, 255, 255, 0.55);
    &.t-is-active,
    &:hover {
      color: rgba(255, 255, 255, 0.9) !important;
      background-color: transparent !important;
      .t-icon {
        color: inherit !important;
      }
    }
    &.t-is-opened {
      .t-icon {
        color: rgba(255, 255, 255, 0.55) !important;
      }
    }
    &.t-menu__item-spacer {
      &.t-is-active,
      &:hover {
        color: rgba(255, 255, 255, 0.9) !important;
        background-color: transparent !important;
        .t-icon {
          color: inherit !important;
        }
      }
    }
    &.t-submenu__item {
      &.t-is-active,
      &:hover {
        background-color: #0052d9 !important;
        color: #ffffff !important;
        &:not(.t-is-opened) {
          background-color: #0052d9;
          color: #ffffff;
        }
        .t-icon {
          color: inherit !important;
        }
      }
    }
  }
}
</style>
