<template>
  <div class="collapse-name">
    {{ name }}
    <div class="action" @click="toggle">
      {{ collapse ? '展开' : '收起' }}
      <icon-font name="chevron-down" class="action-icon" :style="{ transform: `rotateX(${collapse ? 180 : 0}deg)`}" />
    </div>
  </div>
  <div ref="content" class="collapse-content" :style="style">
    <slot />
  </div>
</template>
<script setup lang="ts">
import { IconFont } from 'tdesign-icons-vue-next'
import { defineProps, ref } from 'vue'
const props = defineProps({
  name: {
    type: String,
    default: ''
  },
  collapsed: {
    type: Boolean,
    default: true
  }
})
const collapse = ref(props.collapsed)
const content = ref<HTMLElement | null>(null)
const style = ref({ height: props.collapsed ? '0px' : 'auto' })
const timer = ref<NodeJS.Timeout | null>(null)
const toggle = () => {
  clearTimeout(timer.value) // 清除连击bug
  timer.value = null
  style.value.height = content.value.scrollHeight + 'px'
  if (collapse.value) {
    timer.value = setTimeout(() => {
      style.value.height = 'auto'
    }, 200)
  } else {
    timer.value = setTimeout(() => {
      style.value.height = '0px'
    }, 0);
  }
  collapse.value = !collapse.value
}
</script>
<style lang="less" scoped>
.collapse-name {
  font-size: 16px;
  line-height: 22px;
  color: #000;
  height: 70px;
  padding: 24px;
  border-radius: 4px;
  background-color: #F6F9FF;
  .action {
    float: right;
    cursor: pointer;
    color: #0052D9;
    user-select: none;
  }
  .action-icon {
    transition: all .1s ease-out;
  }
}
.collapse-content {
  overflow: hidden;
  transition: height .2s ease-out;
  will-change: height;
  margin-bottom: 20px;
}
</style>