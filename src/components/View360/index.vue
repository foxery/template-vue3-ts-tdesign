<template>
  <t-dialog
    v-model:visible="visibleBody"
    class="view360"
    attach="body"
    :close-btn="null"
    :top="'64px'"
    destroy-on-close
    width="80%"
    :header="null"
    :cancel-btn="null"
    :confirm-btn="null"
    :on-confirm="() => (visibleBody = false)"
  >
    <template #header></template>
    <template #body>
      <t-swiper
        class="tdesign-demo-block--swiper"
        :current="current"
        :autoplay="false"
        :navigation="{ placement: 'inside', type: 'dots', showSlideBtn: 'never' }"
        :on-change="swiperChange"
      >
        <t-swiper-item v-for="(item, i) in imgs" :key="i">
          <view360 class="is-16by9" :projection="projectionF(item)" canvas-class="canvasStyle" />
        </t-swiper-item>
      </t-swiper>
      <!-- <div class="tdesign-demo-block-row">
        <t-button size="small" @click="current = current + 2 > 6 ? 0 : current + 1">
          跳转到第 {{ current + 2 >= 7 ? 1 : current + 2 }} 项
        </t-button>
      </div> -->
      <div class="btn_left" @click="prev"></div>
      <div class="btn_right" @click="next"></div>
      <div class="thumbnail">
        <div v-for="(item, i) in imgs" :key="i" :class="current === i ? 'box active' : 'box'" @click="current = i">
          <img :src="item" />
        </div>
      </div>
      <icon class="icon" name="close" @click="onIconClose" />
    </template>
  </t-dialog>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import { View360, EquirectProjection } from '@egjs/vue3-view360';
import { Icon } from 'tdesign-icons-vue-next';

const visibleBody = ref(false);
const current = ref(0);
const imgs = ref([]);
const open = (postId) => {
  // 在这获取数据
  console.log(postId);
  setTimeout(() => {
    imgs.value = ['https://iili.io/HGJXC5g.jpg', 'https://iili.io/HGJXR1I.jpg', 'https://iili.io/HGJRLa2.jpg'];
    visibleBody.value = true;
    current.value = 0;
  }, 500);
};
const projectionF = (item) => {
  return new EquirectProjection({
    src: item,
  });
};
const swiperChange = (index) => {
  current.value = index;
};
const prev = () => {
  if (current.value > 0) {
    current.value--;
  } else {
    current.value = imgs.value.length - 1;
  }
};
const next = () => {
  if (current.value < imgs.value.length - 1) {
    current.value++;
  } else {
    current.value = 0;
  }
};
const onIconClose = () => {
  visibleBody.value = false;
};
defineExpose({
  open,
});
</script>

<style lang="less" scoped>
.icon {
  font-size: 24px;
  position: absolute;
  top: 22px;
  right: 22px;
  z-index: 999;
  cursor: pointer;
}
.btn_left,
.btn_right {
  position: absolute;
  top: 50%;
  margin-top: -60px;
  width: 60px;
  height: 60px;
  z-index: 999;
  cursor: pointer;
}
.btn_left {
  left: 26px;
  background: url('@/assets/images/left.png') center center no-repeat;
}
.btn_right {
  right: 26px;
  background: url('@/assets/images/right.png') center center no-repeat;
}
.tdesign-demo-block--swiper {
  height: calc(100vh - 104px);
  background: #4b5b76;
  position: relative;
}
.thumbnail {
  position: absolute;
  width: 100%;
  height: 90px;
  padding: 0 2px;
  bottom: 0;

  background: rgba(0, 0, 0, 0.4);
  border-radius: 0 0 6px 6px;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
  box-sizing: content-box;
  .box {
    width: 80px;
    height: 60px;
    margin: 4px;
    opacity: 0.4;
    cursor: pointer;
    img {
      width: 100%;
      height: 100%;
    }
    &:hover {
      opacity: 1;
    }
  }
  .active {
    opacity: 1;
  }
}
</style>
