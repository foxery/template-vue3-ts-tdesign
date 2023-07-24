<template>
  <div class="m-point flex flex-col">
    <div class="flex flex-col flex-1 card" v-if="type === 1">
      <div class="flex flex-1 flex-wrap">
        <template v-for="(item, index) in svgModuleList" :key="index">
          <div
            @click.stop="activeSvg(item, index)"
            :class="[
              'item-icon',
              {
                active: !!colorActive,
                activeIndex: index === activeIndex,
              },
            ]"
          >
            <div class="icon" v-html="item.value"></div>
            <!--            <component :is="item" class="icon" :id="`svg${index}`"/>-->
          </div>
        </template>
      </div>
    </div>
    <div class="color flex items-center" style="width: 200px">
      <t-color-picker v-model="value" :show-primary-color-preview="false" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, nextTick, onMounted, reactive, ref, shallowRef, watch } from 'vue';
import svgList from '@/assets/point/svg.js';

let props = defineProps({
  icon: {
    type: String,
    default: null,
  },
  type: {
    type: Number,
    default: 1,
  },
  modelValue: {
    type: [String, Number, Boolean, Array],
    default: '#0052d9',
  },
});

let colorActive = ref('');
let activeIndex = ref(0);

const svgModuleList = ref([]);
let iconInfo = reactive({
  icon: props.icon,
});

for (let attr in svgList) {
  let obj = {
    name: attr,
    value: svgList[attr],
  };
  svgModuleList.value.push(obj);
}

const emits = defineEmits<{
  (e: 'change', value: any): void;
  (e: 'update:modelValue', value: any): void;
}>();

watch(
  () => props.icon,
  (val) => {
    if (val) {
      activeIndex.value = svgModuleList.value.findIndex((item) => item.name === props.icon);
    } else {
      activeIndex.value = 0;
      if (svgModuleList.value.length) {
        iconInfo.icon = svgModuleList.value[0].name;
        emits('change', iconInfo);
      }
      console.log('iconInfo.icon', iconInfo.icon);
    }
  },
  {
    immediate: true,
  },
);

const value = computed({
  get() {
    return props?.modelValue;
  },
  set(value) {
    emits('update:modelValue', value);
    emits('change', value);
  },
});

const activeSvg = (item, index) => {
  iconInfo.icon = item.name;
  emits('change', iconInfo);
};
</script>

<style lang="less">
.m-point {
  width: 320px;

  .activeIndex {
    background: #ecf2fe;
  }

  .t-input--auto-width {
    width: 200px;
  }

  .card {
    border: 1px solid rgba(220, 220, 220, 1);
    background: #ffffff;
    border-radius: 3px;
  }

  .icon path {
    fill: currentColor;
    //fill-opacity: 1;
  }

  .active {
    //fill-opacity: 1;
  }

  .item-icon {
    padding: 8px;
    cursor: pointer;
  }

  .color {
    height: 40px;
    //background:#D4E3FC ;
    .round {
      width: 16px;
      height: 16px;
      margin: 0 8px;
    }
  }
}
</style>
